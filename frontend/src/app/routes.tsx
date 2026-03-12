import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { Dashboard } from './pages/Dashboard';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { FAQPage } from './pages/FAQPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { HRPage } from './pages/HRPage';
import { QuickLinksPage } from './pages/QuickLinksPage';
import { NotFoundPage } from './pages/NotFoundPage';

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