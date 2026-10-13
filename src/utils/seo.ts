export interface RouteSEO {
  title: string;
  description: string;
  canonicalPath: string;
}

export const CANONICAL_DOMAIN = 'https://pro-tutor-virid.vercel.app';

export const PRIVATE_ROUTES = new Set([
  'login',
  'register',
  'dashboard',
  'student-dashboard',
  'parent-dashboard',
  'tutor-dashboard',
  'admin-dashboard',
  'student-register',
  'parent-register',
  'tutor-register',
  'not-found',
]);

export const ROUTE_SEO: Record<string, RouteSEO> = {
  home: {
    title: 'Pro Tutorial Service | Home & Online Tutors in Ethiopia',
    description:
      'Find qualified home and online private tutors for KG–Grade 12 across Addis Ababa and Ethiopia. Explore tutoring services, pricing, and national exam preparation.',
    canonicalPath: '/',
  },
  'find-tutor': {
    title: 'Find Qualified Home Tutors in Addis Ababa & Ethiopia | Pro Tutorial Service',
    description:
      'Browse vetted private tutors in Ethiopia and home tutors in Addis Ababa. Filter by subject, KG–Grade 12 level, in-home lessons, or online tutoring.',
    canonicalPath: '/find-tutor',
  },
  services: {
    title: 'KG–Grade 12 Tutoring Services in Ethiopia | Pro Tutorial Service',
    description:
      'Comprehensive in-home and online tutoring services in Ethiopia. KG–Grade 12 academic support, Grade 8 Ministry Exam, and Grade 12 University Entrance Exam prep.',
    canonicalPath: '/services',
  },
  pricing: {
    title: 'Affordable Tutoring Pricing & Packages in Ethiopia | Pro Tutorial Service',
    description:
      'Transparent tutoring fees for home tutors in Addis Ababa and online tutoring in Ethiopia. Compare hourly rates from 300 ETB, monthly packages, and calculators.',
    canonicalPath: '/pricing',
  },
  'how-it-works': {
    title: 'How It Works | Match with Home Tutors in Ethiopia | Pro Tutorial Service',
    description:
      'Learn how we connect Ethiopian families with vetted private tutors. Simple 4-step process from request submission and matching to scheduled lessons.',
    canonicalPath: '/how-it-works',
  },
  about: {
    title: 'About Us | Trusted Tutoring Network in Ethiopia | Pro Tutorial Service',
    description:
      'Pro Tutorial Service is an Ethiopian tutoring agency connecting students with vetted educators from AAU, AASTU, and licensed teachers across Ethiopia.',
    canonicalPath: '/about',
  },
  'become-tutor': {
    title: 'Become a Tutor in Ethiopia | Teach & Earn | Pro Tutorial Service',
    description:
      'Apply to join Pro Tutorial Service as a certified tutor in Addis Ababa and regional cities. Flexible hours, competitive pay, and verified students.',
    canonicalPath: '/become-tutor',
  },
  testimonials: {
    title: 'Parent & Student Reviews | Pro Tutorial Service Ethiopia',
    description:
      'Read authentic reviews from students and parents who improved their grades with verified home tutors in Addis Ababa and online tutors across Ethiopia.',
    canonicalPath: '/testimonials',
  },
  contact: {
    title: 'Contact Us | Pro Tutorial Service Addis Ababa, Ethiopia',
    description:
      'Get in touch with our tutoring coordinators in Addis Ababa. Request home tutors in Ethiopia, ask about packages, or reach us via Telegram and phone.',
    canonicalPath: '/contact',
  },
  blog: {
    title: 'Education & Tutoring Blog Ethiopia | Pro Tutorial Service',
    description:
      'Expert advice on the Ethiopian school curriculum, Grade 12 entrance exam tips, study methods, and educational guidance for KG–Grade 12 students.',
    canonicalPath: '/blog',
  },
  'learning-tips': {
    title: 'Study & Exam Preparation Tips for Ethiopian Students | Pro Tutorial Service',
    description:
      'Proven study techniques and exam preparation strategies from experienced private tutors in Ethiopia for Grade 8 regional and Grade 12 national exams.',
    canonicalPath: '/learning-tips',
  },
  faq: {
    title: 'Frequently Asked Questions | Pro Tutorial Service Ethiopia',
    description:
      'Answers to common questions about hiring home tutors in Addis Ababa, online tutoring Ethiopia, tutor screening, hourly rates, and trial lessons.',
    canonicalPath: '/faq',
  },
  careers: {
    title: 'Careers & Education Opportunities | Pro Tutorial Service Ethiopia',
    description:
      'Discover tutoring and academic coordination career opportunities at Pro Tutorial Service Ethiopia. Join our team delivering quality education.',
    canonicalPath: '/careers',
  },
  privacy: {
    title: 'Privacy Policy | Pro Tutorial Service Ethiopia',
    description:
      'Read how Pro Tutorial Service collects and protects personal and educational data for students, parents, and private tutors across Ethiopia.',
    canonicalPath: '/privacy',
  },
  terms: {
    title: 'Terms of Service | Pro Tutorial Service Ethiopia',
    description:
      'Review terms of service, session policies, tutor expectations, and platform guidelines for users of Pro Tutorial Service Ethiopia.',
    canonicalPath: '/terms',
  },
  refund: {
    title: 'Refund Policy & Satisfaction Guarantee | Pro Tutorial Service Ethiopia',
    description:
      'Understand our tutor replacement guarantee, dispute resolution, and refund policies for home tutoring and online tutoring services in Ethiopia.',
    canonicalPath: '/refund',
  },
  help: {
    title: 'Help & Support Center | Pro Tutorial Service Ethiopia',
    description:
      'Need assistance with tutor matching or account questions? Access support guides, contact info, and fast assistance from Pro Tutorial Service.',
    canonicalPath: '/help',
  },
  login: {
    title: 'Portal Login | Pro Tutorial Service Ethiopia',
    description:
      'Sign in to your student, parent, tutor, or admin account on Pro Tutorial Service Ethiopia to manage sessions, requests, and schedules.',
    canonicalPath: '/login',
  },
  register: {
    title: 'Account Registration | Pro Tutorial Service Ethiopia',
    description:
      'Register for Pro Tutorial Service in Ethiopia as a student, parent, or tutor to connect with verified home and online educators.',
    canonicalPath: '/register',
  },
  'student-register': {
    title: 'Student Registration | Find Private Tutors | Pro Tutorial Service',
    description:
      'Register as a student to match with experienced home tutors in Addis Ababa and online tutors across Ethiopia for KG–Grade 12 academic subjects.',
    canonicalPath: '/student-register',
  },
  'parent-register': {
    title: 'Parent Registration | Hire Qualified Home Tutors | Pro Tutorial Service',
    description:
      'Register as a parent to request vetted home tutors in Addis Ababa for your children. Personalized one-on-one KG–Grade 12 academic tutoring.',
    canonicalPath: '/parent-register',
  },
  'tutor-register': {
    title: 'Tutor Registration | Join Private Tutors in Ethiopia | Pro Tutorial Service',
    description:
      'Apply to join Pro Tutorial Service as a certified tutor in Addis Ababa and Ethiopian regional cities. Share your expertise and earn competitive income.',
    canonicalPath: '/tutor-register',
  },
  dashboard: {
    title: 'User Dashboard | Pro Tutorial Service Ethiopia',
    description:
      'Access your personal dashboard to view tutoring requests, match status, learning schedules, and direct tutor communication.',
    canonicalPath: '/dashboard',
  },
  'student-dashboard': {
    title: 'Student Dashboard | Pro Tutorial Service Ethiopia',
    description: 'Track tutoring sessions, goals, and academic progress on Pro Tutorial Service.',
    canonicalPath: '/student-dashboard',
  },
  'parent-dashboard': {
    title: 'Parent Portal & Child Progress | Pro Tutorial Service Ethiopia',
    description: 'Manage children tutoring schedules, requests, and verified educator proposals.',
    canonicalPath: '/parent-dashboard',
  },
  'tutor-dashboard': {
    title: 'Tutor Educator Portal | Pro Tutorial Service Ethiopia',
    description: 'Manage tutoring requests, scheduled sessions, and student feedback on Pro Tutorial Service.',
    canonicalPath: '/tutor-dashboard',
  },
  'admin-dashboard': {
    title: 'Admin Management Console | Pro Tutorial Service Ethiopia',
    description:
      'Administrative dashboard for tutor verification, student matching, pricing management, and platform analytics at Pro Tutorial Service.',
    canonicalPath: '/admin-dashboard',
  },
  'not-found': {
    title: 'Page Not Found (404) | Pro Tutorial Service',
    description: 'The requested page could not be found on Pro Tutorial Service Ethiopia.',
    canonicalPath: '/404',
  },
};

/**
 * Updates document title, meta description, canonical link, OpenGraph/Twitter tags,
 * and robots indexing directives dynamically for client-side navigation.
 */
export function updatePageSEO(route: string): void {
  if (typeof document === 'undefined') return;

  const seo = ROUTE_SEO[route] || ROUTE_SEO.home;
  const isPrivate = PRIVATE_ROUTES.has(route);

  // 1. Title
  document.title = seo.title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  // 3. Meta Description
  setMeta('description', seo.description);

  // 4. Robots Directives (Public routes indexable, private portals noindex)
  setMeta('robots', isPrivate ? 'noindex, nofollow' : 'index, follow');
  setMeta(
    'googlebot',
    isPrivate
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  );

  // 5. OpenGraph
  setMeta('og:title', seo.title, true);
  setMeta('og:description', seo.description, true);
  const fullUrl = `${CANONICAL_DOMAIN}${seo.canonicalPath === '/' ? '/' : seo.canonicalPath}`;
  setMeta('og:url', fullUrl, true);
  setMeta('og:site_name', 'Pro Tutorial Service', true);
  setMeta('og:image', `${CANONICAL_DOMAIN}/og-image.jpg`, true);

  // 6. Twitter
  setMeta('twitter:title', seo.title);
  setMeta('twitter:description', seo.description);
  setMeta('twitter:image', `${CANONICAL_DOMAIN}/og-image.jpg`);

  // 7. Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);
}
