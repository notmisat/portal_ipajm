import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Dashboard } from './app/pages/Dashboard';
import { EventsPage } from './app/pages/EventsPage';
import { AnnouncementsPage } from './app/pages/AnnouncementsPage';
import { FAQPage } from './app/pages/FAQPage';
import { DocumentsPage } from './app/pages/DocumentsPage';
import { HRPage } from './app/pages/HRPage';
import { QuickLinksPage } from './app/pages/QuickLinksPage';
import { NotFoundPage } from './app/pages/NotFoundPage';

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