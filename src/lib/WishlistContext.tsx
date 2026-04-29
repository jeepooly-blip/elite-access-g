import React, { createContext, useContext, useState, useEffect } from 'react';

interface Event {
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  description?: string;
  details?: any;
}

interface WishlistContextType {
  wishlist: Event[];
  toggleWishlist: (event: Event) => void;
  isInWishlist: (title: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Event[]>(() => {
    const saved = localStorage.getItem('luxury_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luxury_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (event: Event) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.title === event.title);
      if (exists) {
        return prev.filter(item => item.title !== event.title);
      }
      return [...prev, event];
    });
  };

  const isInWishlist = (title: string) => {
    return wishlist.some(item => item.title === title);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
