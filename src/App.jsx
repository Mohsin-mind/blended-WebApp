import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useDynamicTitle } from './hooks/usePageTitle';
import { ThemeProvider } from './contexts/ThemeContext';
import { SWRProvider } from './contexts/SWRContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  useDynamicTitle();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <SWRProvider>
          <Outlet />
          <Toaster richColors position='top-center' />
        </SWRProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
