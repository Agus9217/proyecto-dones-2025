import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';
import { Provider } from './components/ui/provider';
import { dark } from '@clerk/themes'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl={'/'}
        signInForceRedirectUrl={'/dashboard'}
      >
        <RouterProvider router={appRoutes} />
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
