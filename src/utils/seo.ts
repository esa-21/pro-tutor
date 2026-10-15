export interface RouteSEO {
  title: string;
  description: string;
  canonicalPath: string;
}

export const CANONICAL_DOMAIN = 'https://prohometutor.vercel.app';

export const PRIVATE_ROUTES = new Set([
  'dashboard',
  'student-dashboard',
  'parent-dashboard',
  'tutor-dashboard',
  'admin-dashboard',
  'not-found',
]);

export const ROUTE_SEO: Record<string, RouteSEO> = {
  home: {
    title: 'Pro Home Tutor Ethiopia | Home Tutor in Addis Ababa & Online Tutoring',
    description:
      'Find verified home tutors in Addis Ababa and online private tutors across Ethiopia for KG to Grade 12. Book top university graduates for in-home & one-on-one lessons.',
    canonicalPath: '/',
  },
  'find-tutor': {
    title: 'Find a Home Tutor Near Me | Private Tutors in Addis Ababa & Ethiopia',
    description:
      'Browse vetted private tutors in Ethiopia and home tutors in Addis Ababa. Filter by subject, KG to Grade 12 level, in-home lessons, or online tutoring.',
    canonicalPath: '/find-tutor',
  },
  services: {
    title: 'KG to Grade 12 Tutoring Services in Ethiopia | Pro Home Tutor',
    description:
      'Comprehensive in-home and online tutoring services in Ethiopia. KG to Grade 12 academic support, Grade 8 Ministry Exam, and Grade 12 University Entrance Exam prep.',
    canonicalPath: '/services',
  },
  pricing: {
    title: 'Tutoring Fees & Pricing in Ethiopia | Home Tutors in Addis Ababa',
    description:
      'Transparent tutoring fees for home tutors in Addis Ababa and online tutoring in Ethiopia. Flexible hourly rates from 300 ETB, monthly packages, and rate calculators.',
    canonicalPath: '/pricing',
  },
  'how-it-works': {
    title: 'How to Hire a Home Tutor in Ethiopia | Simple 4-Step Process',
    description:
      'Learn how Pro Home Tutor connects Ethiopian families with vetted private tutors. Submit your request, get matched with an educator, and start personalized home lessons.',
    canonicalPath: '/how-it-works',
  },
  'become-tutor': {
    title: 'Become a Tutor in Ethiopia | Apply for Home & Online Tutoring Jobs',
    description:
      'Join Pro Home Tutor Ethiopia as a verified private tutor in Addis Ababa and regional cities. Teach KG to Grade 12 students with flexible hours and competitive pay.',
    canonicalPath: '/become-tutor',
  },
  register: {
    title: 'Register with Pro Home Tutor Ethiopia | Students, Parents & Tutors',
    description:
      'Join Pro Home Tutor Ethiopia. Register as a student, parent, or certified tutor to access personalized in-home and online tutoring services.',
    canonicalPath: '/register',
  },
  'student-register': {
    title: 'Student Registration | Find a Home Tutor in Ethiopia | Pro Home Tutor',
    description:
      'Register as a student to match with qualified home tutors in Addis Ababa and online tutors across Ethiopia for KG to Grade 12 academic subjects.',
    canonicalPath: '/student-register',
  },
  'parent-register': {
    title: 'Parent Registration | Hire a Private Tutor in Addis Ababa & Ethiopia',
    description:
      'Register as a parent to request vetted home tutors for your children in Addis Ababa. Personalized one-on-one KG to Grade 12 tutoring tailored to your schedule.',
    canonicalPath: '/parent-register',
  },
  'tutor-register': {
    title: 'Tutor Registration Form | Join Pro Home Tutor in Ethiopia',
    description:
      'Submit your tutor application to join our educational network in Addis Ababa and Ethiopia. Share your education and teaching experience to start receiving tutoring assignments.',
    canonicalPath: '/tutor-register',
  },
  testimonials: {
    title: 'Parent & Student Reviews | Pro Home Tutor Ethiopia Testimonials',
    description:
      'Read authentic reviews from parents and students who achieved academic success with private home tutors in Addis Ababa and online tutors across Ethiopia.',
    canonicalPath: '/testimonials',
  },
  about: {
    title: 'About Pro Home Tutor Ethiopia | Trusted Private Tutoring Network',
    description:
      'Pro Home Tutor connects students across Addis Ababa and Ethiopia with vetted educators and graduates from AAU, AASTU, and certified school teachers.',
    canonicalPath: '/about',
  },
  contact: {
    title: 'Contact Pro Home Tutor | Addis Ababa Tutoring Coordinators',
    description:
      'Get in touch with Pro Home Tutor coordinators in Addis Ababa. Request a private tutor in Ethiopia, inquire about fees, or reach us directly on Telegram.',
    canonicalPath: '/contact',
  },
  blog: {
    title: 'Education & Study Blog Ethiopia | Pro Home Tutor Guides',
    description:
      'Practical study tips, Ethiopian curriculum guidance, Grade 8 and Grade 12 exam preparation advice from experienced private tutors in Ethiopia.',
    canonicalPath: '/blog',
  },
  'learning-tips': {
    title: 'Study & Exam Preparation Tips for Ethiopian Students | Pro Home Tutor',
    description:
      'Effective study strategies, time management, and test preparation techniques for Ethiopian students preparing for school tests and national entrance exams.',
    canonicalPath: '/learning-tips',
  },
  faq: {
    title: 'FAQ: Home & Online Tutoring in Addis Ababa, Ethiopia | Pro Home Tutor',
    description:
      'Answers to frequent questions about hiring a home tutor in Addis Ababa, online tutoring rates in Ethiopia, tutor screening, subjects, and lesson scheduling.',
    canonicalPath: '/faq',
  },
  careers: {
    title: 'Tutoring Careers & Educator Recruitment in Ethiopia | Pro Home Tutor',
    description:
      'Discover tutoring and academic coordination career opportunities at Pro Home Tutor Ethiopia. Join our team delivering quality education in Addis Ababa and beyond.',
    canonicalPath: '/careers',
  },
  privacy: {
    title: 'Privacy Policy | Pro Home Tutor Ethiopia',
    description:
      'Read how Pro Home Tutor collects and protects personal and educational data for students, parents, and private tutors across Ethiopia.',
    canonicalPath: '/privacy',
  },
  terms: {
    title: 'Terms of Service | Pro Home Tutor Ethiopia',
    description:
      'Review terms of service, session policies, tutor expectations, and platform guidelines for users of Pro Home Tutor Ethiopia.',
    canonicalPath: '/terms',
  },
  refund: {
    title: 'Refund Policy & Satisfaction Guarantee | Pro Home Tutor Ethiopia',
    description:
      'Understand our tutor replacement guarantee, dispute resolution, and refund policies for home tutoring and online tutoring services in Ethiopia.',
    canonicalPath: '/refund',
  },
  help: {
    title: 'Help & Support Center | Pro Home Tutor Ethiopia',
    description:
      'Need assistance with tutor matching or account questions? Access support guides, contact info, and fast assistance from Pro Home Tutor.',
    canonicalPath: '/help',
  },
  login: {
    title: 'Portal Login | Pro Home Tutor Ethiopia',
    description:
      'Sign in to your student, parent, tutor, or admin account on Pro Home Tutor Ethiopia to manage sessions, requests, and schedules.',
    canonicalPath: '/login',
  },
  dashboard: {
    title: 'User Dashboard | Pro Home Tutor Ethiopia',
    description:
      'Access your personal dashboard to view tutoring requests, match status, learning schedules, and direct tutor communication.',
    canonicalPath: '/dashboard',
  },
  'student-dashboard': {
    title: 'Student Dashboard | Pro Home Tutor Ethiopia',
    description: 'Track tutoring sessions, goals, and academic progress on Pro Home Tutor Ethiopia.',
    canonicalPath: '/student-dashboard',
  },
  'parent-dashboard': {
    title: 'Parent Portal & Child Progress | Pro Home Tutor Ethiopia',
    description: 'Manage children tutoring schedules, requests, and verified educator proposals on Pro Home Tutor.',
    canonicalPath: '/parent-dashboard',
  },
  'tutor-dashboard': {
    title: 'Tutor Educator Portal | Pro Home Tutor Ethiopia',
    description: 'Manage tutoring requests, scheduled sessions, and student feedback on Pro Home Tutor Ethiopia.',
    canonicalPath: '/tutor-dashboard',
  },
  'admin-dashboard': {
    title: 'Admin Management Console | Pro Home Tutor Ethiopia',
    description:
      'Administrative dashboard for tutor verification, student matching, pricing management, and platform analytics at Pro Home Tutor.',
    canonicalPath: '/admin-dashboard',
  },
  'not-found': {
    title: 'Page Not Found (404) | Pro Home Tutor Ethiopia',
    description: 'The requested page could not be found on Pro Home Tutor Ethiopia.',
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
  setMeta('og:site_name', 'Pro Home Tutor Ethiopia', true);
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
