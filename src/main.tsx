import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { RewardsProvider } from './contexts/RewardsContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <RewardsProvider>
            <App />
          </RewardsProvider>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);