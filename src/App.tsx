import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle, theme } from '@/styles';
import { ThemeProvider } from '@emotion/react';
import { Header, Spinner } from '@/components';
import { ModalsProvider, WaffleCardsProvider } from '@/contexts';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Spinner loading />}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <ModalsProvider>
            <WaffleCardsProvider>
              <Router />
            </WaffleCardsProvider>
          </ModalsProvider>
        </ThemeProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
