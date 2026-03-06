import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './app/layouts/RootLayout';
import { lazy } from 'react';

// Lazy imports
const Dashboard = lazy(() =>
  import('./app/pages/Dashboard').then(module => ({
    default: module.Dashboard,
  }))
);

const EventsPage = lazy(() =>
  import('./app/pages/EventsPage').then(module => ({
    default: module.EventsPage,
  }))
);

const AnnouncementsPage = lazy(() =>
  import('./app/pages/AnnouncementsPage').then(module => ({
    default: module.AnnouncementsPage,
  }))
);

const FAQPage = lazy(() =>
  import('./app/pages/FAQPage').then(module => ({
    default: module.FAQPage,
  }))
);

const DocumentsPage = lazy(() =>
  import('./app/pages/DocumentsPage').then(module => ({
    default: module.DocumentsPage,
  }))
);

const HRPage = lazy(() =>
  import('./app/pages/HRPage').then(module => ({
    default: module.HRPage,
  }))
);

const QuickLinksPage = lazy(() =>
  import('./app/pages/QuickLinksPage').then(module => ({
    default: module.QuickLinksPage,
  }))
);

const NotFoundPage = lazy(() =>
  import('./app/pages/NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  }))
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'events', Component: EventsPage },
      { path: 'announcements', Component: AnnouncementsPage },
      { path: 'quick-links', Component: QuickLinksPage },
      { path: 'faq', Component: FAQPage },
      { path: 'documents', Component: DocumentsPage },
      { path: 'hr', Component: HRPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);