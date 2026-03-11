import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './app/contexts/AuthContext';
import { router } from './routes';
import { Toaster } from './app/components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-4">Carregando Portal IPAJM...</div>}>
        <RouterProvider router={router} />
      </Suspense>

      <Toaster />
    </AuthProvider>
  );
}