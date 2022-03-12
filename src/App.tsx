import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '@/styles';
import { Header, Spinner } from '@/components';
import { ModalsProvider, WaffleCardsProvider } from '@/contexts';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Spinner loading />}>
        <GlobalStyle />
        <Header />
        <ModalsProvider>
          <WaffleCardsProvider>
            <Router />
          </WaffleCardsProvider>
        </ModalsProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
