import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { contentStyle, wrapperStyle } from 'app/page.style';
import './globals.css';
import AppFooter from 'components/AppFooter';
import AppHeader from 'components/AppHeader';

export const metadata: Metadata = {
  title: 'Fit',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="uk">
      <body>
        <SessionProvider>
          <ToastContainer theme="colored" />
          <div style={ wrapperStyle }>
            <AppHeader />
            <main style={ contentStyle }>
              { children }
            </main>
            <AppFooter />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
