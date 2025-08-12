import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useDynamicTitle } from './hooks/usePageTitle';
import { ThemeProvider } from './contexts/ThemeContext';
import { SWRProvider } from './contexts/SWRContext';

function App() {
  useDynamicTitle();

  return (
    <ThemeProvider>
      <SWRProvider>
        <Outlet />
        <Toaster richColors position='top-center' />
      </SWRProvider>
    </ThemeProvider>
  );
}

export default App;
