import { createBrowserRouter } from 'react-router-dom';
import { AnnouncementsPage } from './app/pages/AnnouncementsPage';
import { Dashboard } from './app/pages/Dashboard';
import { DocumentsPage } from './app/pages/DocumentsPage';
import { EventsPage } from './app/pages/EventsPage';
import { FAQPage } from './app/pages/FAQPage';
import { HRPage } from './app/pages/HRPage';
import { RootLayout } from './app/layouts/RootLayout';
import { NotFoundPage } from './app/pages/NotFoundPage';
import { QuickLinksPage } from './app/pages/QuickLinksPage';

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