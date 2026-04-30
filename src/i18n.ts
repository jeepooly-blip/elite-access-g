import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'العربية',   flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', label: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹', dir: 'ltr' },
  { code: 'ja', label: '日本語',     flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', label: '中文',       flag: '🇨🇳', dir: 'ltr' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
];

const resources = {
  en: { translation: {
    nav: { expertise: 'Expertise', portfolio: 'Portfolio', concierge: 'Concierge', destinations: 'Destinations', login: 'Member Entry' },
    hero: { discover: 'Discover Access', view_portfolio: 'View Portfolio' },
    events: { title: "The World's Most Coveted Events", subtitle: 'CURATED EXPERIENCES', search: 'Search events or locations', all: 'ALL', filter_f1: 'FORMULA 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'NIGHT RACE', view_package: 'View Package', access_type: 'Access Type', featured: 'Featured' },
    concierge: { title: 'Bespoke Concierge', subtitle: 'Our specialists are at your disposal for any request — from private aviation to exclusive event access, anywhere in the world.', name: 'Full Name', email: 'Email Address', phone: 'Phone Number', service: 'Service Required', message: 'Your Requirements', submit: 'Submit Enquiry', success: 'Enquiry received. Our acquisitions team will contact you within 24 hours.' },
    services: { title: 'Bespoke Solutions', subtitle: 'OUR EXPERTISE' },
    destinations: { title: 'Premier Destinations', subtitle: 'GLOBAL REACH', all: 'All Destinations' },
    footer: { rights: 'All Rights Reserved', tagline: 'The pinnacle of Formula 1 hospitality.' },
    admin: { login: 'Admin Login', password: 'Password', enter: 'Enter Dashboard' },
    common: { loading: 'Loading...', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', add: 'Add New', status: 'Status', actions: 'Actions' }
  }},
  ar: { translation: {
    nav: { expertise: 'الخبرة', portfolio: 'المحفظة', concierge: 'الكونسيرج', destinations: 'الوجهات', login: 'دخول الأعضاء' },
    hero: { discover: 'اكتشف الوصول', view_portfolio: 'عرض المحفظة' },
    events: { title: 'أكثر الفعاليات المرغوبة في العالم', subtitle: 'تجارب منتقاة', search: 'ابحث عن الفعاليات أو الوجهات', all: 'الكل', filter_f1: 'فورمولا 1', filter_paddock: 'نادي بادوك', filter_night: 'سباق الليل', view_package: 'عرض الباقة', access_type: 'نوع الوصول', featured: 'مميز' },
    concierge: { title: 'كونسيرج مخصص', subtitle: 'متخصصونا تحت تصرفكم لأي طلب — من الطيران الخاص إلى الوصول الحصري للفعاليات في أي مكان في العالم.', name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', service: 'الخدمة المطلوبة', message: 'متطلباتك', submit: 'إرسال الاستفسار', success: 'تم استلام استفساركم. سيتواصل معكم فريقنا خلال 24 ساعة.' },
    services: { title: 'حلول مخصصة', subtitle: 'خبرتنا' },
    destinations: { title: 'وجهات متميزة', subtitle: 'حضور عالمي', all: 'جميع الوجهات' },
    footer: { rights: 'جميع الحقوق محفوظة', tagline: 'قمة ضيافة الفورمولا 1.' },
    admin: { login: 'دخول المشرف', password: 'كلمة المرور', enter: 'دخول لوحة التحكم' },
    common: { loading: 'جاري التحميل...', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', add: 'إضافة جديد', status: 'الحالة', actions: 'الإجراءات' }
  }},
  fr: { translation: {
    nav: { expertise: 'Expertise', portfolio: 'Portfolio', concierge: 'Conciergerie', destinations: 'Destinations', login: 'Accès Membre' },
    hero: { discover: 'Découvrir l\'Accès', view_portfolio: 'Voir le Portfolio' },
    events: { title: 'Les Événements les Plus Convoités au Monde', subtitle: 'EXPÉRIENCES SÉLECTIONNÉES', search: 'Rechercher des événements ou destinations', all: 'TOUS', filter_f1: 'FORMULE 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'COURSE DE NUIT', view_package: 'Voir le Package', access_type: 'Type d\'Accès', featured: 'À la Une' },
    concierge: { title: 'Conciergerie Sur Mesure', subtitle: 'Nos spécialistes sont à votre disposition pour toute demande — de l\'aviation privée à l\'accès exclusif aux événements, partout dans le monde.', name: 'Nom Complet', email: 'Adresse Email', phone: 'Numéro de Téléphone', service: 'Service Requis', message: 'Vos Exigences', submit: 'Envoyer la Demande', success: 'Demande reçue. Notre équipe vous contactera sous 24 heures.' },
    services: { title: 'Solutions Sur Mesure', subtitle: 'NOTRE EXPERTISE' },
    destinations: { title: 'Destinations Prestigieuses', subtitle: 'PORTÉE MONDIALE', all: 'Toutes les Destinations' },
    footer: { rights: 'Tous Droits Réservés', tagline: 'Le summum de l\'hospitalité Formule 1.' },
    admin: { login: 'Connexion Admin', password: 'Mot de Passe', enter: 'Accéder au Tableau de Bord' },
    common: { loading: 'Chargement...', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', add: 'Ajouter', status: 'Statut', actions: 'Actions' }
  }},
  de: { translation: {
    nav: { expertise: 'Expertise', portfolio: 'Portfolio', concierge: 'Concierge', destinations: 'Reiseziele', login: 'Mitglieder-Zugang' },
    hero: { discover: 'Zugang Entdecken', view_portfolio: 'Portfolio Ansehen' },
    events: { title: 'Die Begehrtesten Events der Welt', subtitle: 'KURATIERTE ERLEBNISSE', search: 'Events oder Standorte suchen', all: 'ALLE', filter_f1: 'FORMEL 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'NACHTRENNEN', view_package: 'Paket Ansehen', access_type: 'Zugangsart', featured: 'Empfohlen' },
    concierge: { title: 'Maßgeschneiderter Concierge', subtitle: 'Unsere Spezialisten stehen Ihnen für jeden Wunsch zur Verfügung — von Privatflügen bis zu exklusivem Eventzugang, weltweit.', name: 'Vollständiger Name', email: 'E-Mail-Adresse', phone: 'Telefonnummer', service: 'Benötigter Service', message: 'Ihre Anforderungen', submit: 'Anfrage Senden', success: 'Anfrage erhalten. Unser Team wird Sie innerhalb von 24 Stunden kontaktieren.' },
    services: { title: 'Maßgeschneiderte Lösungen', subtitle: 'UNSERE EXPERTISE' },
    destinations: { title: 'Erstklassige Reiseziele', subtitle: 'GLOBALE REICHWEITE', all: 'Alle Reiseziele' },
    footer: { rights: 'Alle Rechte Vorbehalten', tagline: 'Das Nonplusultra der Formel-1-Gastfreundschaft.' },
    admin: { login: 'Admin-Anmeldung', password: 'Passwort', enter: 'Dashboard Betreten' },
    common: { loading: 'Laden...', save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten', add: 'Neu Hinzufügen', status: 'Status', actions: 'Aktionen' }
  }},
  es: { translation: {
    nav: { expertise: 'Experiencia', portfolio: 'Portafolio', concierge: 'Conserjería', destinations: 'Destinos', login: 'Acceso de Miembro' },
    hero: { discover: 'Descubrir Acceso', view_portfolio: 'Ver Portafolio' },
    events: { title: 'Los Eventos Más Codiciados del Mundo', subtitle: 'EXPERIENCIAS CURADAS', search: 'Buscar eventos o destinos', all: 'TODOS', filter_f1: 'FÓRMULA 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'CARRERA NOCTURNA', view_package: 'Ver Paquete', access_type: 'Tipo de Acceso', featured: 'Destacado' },
    concierge: { title: 'Conserjería a Medida', subtitle: 'Nuestros especialistas están a su disposición para cualquier solicitud — desde aviación privada hasta acceso exclusivo a eventos, en cualquier parte del mundo.', name: 'Nombre Completo', email: 'Correo Electrónico', phone: 'Número de Teléfono', service: 'Servicio Requerido', message: 'Sus Requisitos', submit: 'Enviar Consulta', success: 'Consulta recibida. Nuestro equipo le contactará en 24 horas.' },
    services: { title: 'Soluciones a Medida', subtitle: 'NUESTRA EXPERIENCIA' },
    destinations: { title: 'Destinos de Primera', subtitle: 'ALCANCE GLOBAL', all: 'Todos los Destinos' },
    footer: { rights: 'Todos los Derechos Reservados', tagline: 'La cúspide de la hospitalidad de Fórmula 1.' },
    admin: { login: 'Inicio de Sesión Admin', password: 'Contraseña', enter: 'Entrar al Panel' },
    common: { loading: 'Cargando...', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar', add: 'Agregar Nuevo', status: 'Estado', actions: 'Acciones' }
  }},
  it: { translation: {
    nav: { expertise: 'Expertise', portfolio: 'Portfolio', concierge: 'Concierge', destinations: 'Destinazioni', login: 'Accesso Membro' },
    hero: { discover: 'Scopri l\'Accesso', view_portfolio: 'Vedi il Portfolio' },
    events: { title: 'Gli Eventi Più Ambiti al Mondo', subtitle: 'ESPERIENZE CURATE', search: 'Cerca eventi o destinazioni', all: 'TUTTI', filter_f1: 'FORMULA 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'GARA NOTTURNA', view_package: 'Vedi il Pacchetto', access_type: 'Tipo di Accesso', featured: 'In Evidenza' },
    concierge: { title: 'Concierge Su Misura', subtitle: 'I nostri specialisti sono a vostra disposizione per qualsiasi richiesta — dall\'aviazione privata all\'accesso esclusivo agli eventi, ovunque nel mondo.', name: 'Nome Completo', email: 'Indirizzo Email', phone: 'Numero di Telefono', service: 'Servizio Richiesto', message: 'Le Vostre Esigenze', submit: 'Invia Richiesta', success: 'Richiesta ricevuta. Il nostro team vi contatterà entro 24 ore.' },
    services: { title: 'Soluzioni Su Misura', subtitle: 'LA NOSTRA EXPERTISE' },
    destinations: { title: 'Destinazioni d\'Élite', subtitle: 'PRESENZA GLOBALE', all: 'Tutte le Destinazioni' },
    footer: { rights: 'Tutti i Diritti Riservati', tagline: 'L\'apice dell\'ospitalità di Formula 1.' },
    admin: { login: 'Accesso Admin', password: 'Password', enter: 'Entra nella Dashboard' },
    common: { loading: 'Caricamento...', save: 'Salva', cancel: 'Annulla', delete: 'Elimina', edit: 'Modifica', add: 'Aggiungi Nuovo', status: 'Stato', actions: 'Azioni' }
  }},
  ja: { translation: {
    nav: { expertise: 'エキスパート', portfolio: 'ポートフォリオ', concierge: 'コンシェルジュ', destinations: '目的地', login: 'メンバーエントリー' },
    hero: { discover: 'アクセスを発見', view_portfolio: 'ポートフォリオを見る' },
    events: { title: '世界で最も人気のあるイベント', subtitle: '厳選された体験', search: 'イベントや場所を検索', all: 'すべて', filter_f1: 'フォーミュラ1', filter_paddock: 'パドッククラブ', filter_night: 'ナイトレース', view_package: 'パッケージを見る', access_type: 'アクセスタイプ', featured: '注目' },
    concierge: { title: 'ビスポーク・コンシェルジュ', subtitle: 'プライベート航空から独占的なイベントアクセスまで、世界中どこでもご要望にお応えします。', name: 'フルネーム', email: 'メールアドレス', phone: '電話番号', service: '必要なサービス', message: 'ご要望', submit: 'お問い合わせを送信', success: 'お問い合わせを受け付けました。24時間以内にご連絡いたします。' },
    services: { title: 'ビスポークソリューション', subtitle: '私たちの専門知識' },
    destinations: { title: '一流の目的地', subtitle: 'グローバルリーチ', all: 'すべての目的地' },
    footer: { rights: '全著作権所有', tagline: 'フォーミュラ1ホスピタリティの頂点。' },
    admin: { login: '管理者ログイン', password: 'パスワード', enter: 'ダッシュボードへ' },
    common: { loading: '読み込み中...', save: '保存', cancel: 'キャンセル', delete: '削除', edit: '編集', add: '新規追加', status: 'ステータス', actions: 'アクション' }
  }},
  zh: { translation: {
    nav: { expertise: '专业知识', portfolio: '作品集', concierge: '礼宾服务', destinations: '目的地', login: '会员入口' },
    hero: { discover: '探索通道', view_portfolio: '查看作品集' },
    events: { title: '全球最受追捧的赛事', subtitle: '精选体验', search: '搜索活动或目的地', all: '全部', filter_f1: '一级方程式', filter_paddock: '维修区俱乐部', filter_night: '夜间赛', view_package: '查看套餐', access_type: '访问类型', featured: '精选' },
    concierge: { title: '定制礼宾服务', subtitle: '我们的专家随时为您服务——从私人飞机到独家赛事通道，遍布全球。', name: '全名', email: '电子邮件地址', phone: '电话号码', service: '所需服务', message: '您的需求', submit: '提交查询', success: '查询已收到。我们的团队将在24小时内与您联系。' },
    services: { title: '定制解决方案', subtitle: '我们的专长' },
    destinations: { title: '顶级目的地', subtitle: '全球覆盖', all: '所有目的地' },
    footer: { rights: '版权所有', tagline: '一级方程式顶级款待服务。' },
    admin: { login: '管理员登录', password: '密码', enter: '进入仪表板' },
    common: { loading: '加载中...', save: '保存', cancel: '取消', delete: '删除', edit: '编辑', add: '添加新', status: '状态', actions: '操作' }
  }},
  pt: { translation: {
    nav: { expertise: 'Expertise', portfolio: 'Portfólio', concierge: 'Concierge', destinations: 'Destinos', login: 'Acesso de Membro' },
    hero: { discover: 'Descobrir Acesso', view_portfolio: 'Ver Portfólio' },
    events: { title: 'Os Eventos Mais Cobiçados do Mundo', subtitle: 'EXPERIÊNCIAS SELECIONADAS', search: 'Pesquisar eventos ou destinos', all: 'TODOS', filter_f1: 'FÓRMULA 1', filter_paddock: 'PADDOCK CLUB', filter_night: 'CORRIDA NOTURNA', view_package: 'Ver Pacote', access_type: 'Tipo de Acesso', featured: 'Destaque' },
    concierge: { title: 'Concierge Personalizado', subtitle: 'Nossos especialistas estão à sua disposição para qualquer solicitação — da aviação privada ao acesso exclusivo a eventos, em qualquer lugar do mundo.', name: 'Nome Completo', email: 'Endereço de Email', phone: 'Número de Telefone', service: 'Serviço Necessário', message: 'Seus Requisitos', submit: 'Enviar Consulta', success: 'Consulta recebida. Nossa equipe entrará em contato em 24 horas.' },
    services: { title: 'Soluções Personalizadas', subtitle: 'NOSSA EXPERTISE' },
    destinations: { title: 'Destinos de Primeira', subtitle: 'ALCANCE GLOBAL', all: 'Todos os Destinos' },
    footer: { rights: 'Todos os Direitos Reservados', tagline: 'O ápice da hospitalidade da Fórmula 1.' },
    admin: { login: 'Login Admin', password: 'Senha', enter: 'Entrar no Painel' },
    common: { loading: 'Carregando...', save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar', add: 'Adicionar Novo', status: 'Status', actions: 'Ações' }
  }},
  ru: { translation: {
    nav: { expertise: 'Экспертиза', portfolio: 'Портфолио', concierge: 'Консьерж', destinations: 'Направления', login: 'Вход для Членов' },
    hero: { discover: 'Открыть Доступ', view_portfolio: 'Просмотреть Портфолио' },
    events: { title: 'Самые Желанные События в Мире', subtitle: 'ОТОБРАННЫЕ ВПЕЧАТЛЕНИЯ', search: 'Поиск событий или мест', all: 'ВСЕ', filter_f1: 'ФОРМУЛА 1', filter_paddock: 'ПАДДОК-КЛУБ', filter_night: 'НОЧНАЯ ГОНКА', view_package: 'Просмотреть Пакет', access_type: 'Тип Доступа', featured: 'Рекомендуемое' },
    concierge: { title: 'Индивидуальный Консьерж', subtitle: 'Наши специалисты готовы выполнить любую просьбу — от частной авиации до эксклюзивного доступа к мероприятиям в любой точке мира.', name: 'Полное Имя', email: 'Адрес Электронной Почты', phone: 'Номер Телефона', service: 'Необходимая Услуга', message: 'Ваши Требования', submit: 'Отправить Запрос', success: 'Запрос получен. Наша команда свяжется с вами в течение 24 часов.' },
    services: { title: 'Индивидуальные Решения', subtitle: 'НАША ЭКСПЕРТИЗА' },
    destinations: { title: 'Премиальные Направления', subtitle: 'ГЛОБАЛЬНОЕ ПРИСУТСТВИЕ', all: 'Все Направления' },
    footer: { rights: 'Все Права Защищены', tagline: 'Вершина гостеприимства Формулы 1.' },
    admin: { login: 'Вход Администратора', password: 'Пароль', enter: 'Войти в Панель' },
    common: { loading: 'Загрузка...', save: 'Сохранить', cancel: 'Отмена', delete: 'Удалить', edit: 'Редактировать', add: 'Добавить Новый', status: 'Статус', actions: 'Действия' }
  }},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
