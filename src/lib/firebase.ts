import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  const errorString = JSON.stringify(errInfo);
  console.error('Firestore Error: ', errorString);
  throw new Error(errorString);
}

export const submitConciergeRequest = async (data: any) => {
  const path = 'requests';
  try {
    const payload: any = {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      service: data.service || '',
      message: data.message || '',
      status: 'PENDING',
      createdAt: serverTimestamp()
    };

    if (auth.currentUser) {
      payload.userId = auth.currentUser.uid;
    }

    const docRef = await addDoc(collection(db, path), payload);
    return docRef;
  } catch (error: any) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getUserProfile = async (userId: string) => {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error: any) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

export const updateUserProfile = async (userId: string, preferences: any) => {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      userId,
      preferences,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error: any) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUserInquiries = async (userId: string) => {
  const path = 'requests';
  try {
    const q = query(
      collection(db, path), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};
