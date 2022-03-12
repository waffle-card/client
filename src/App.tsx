import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '@/styles';
import { Header, Spinner } from '@/components';
import {
  ModalsProvider,
  WaffleCardsProvider,
  LoadingProvider,
} from '@/contexts';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Spinner loading />}>
        <GlobalStyle />
        <Header />
        <LoadingProvider>
          <ModalsProvider>
            <WaffleCardsProvider>
              <Router />
            </WaffleCardsProvider>
          </ModalsProvider>
        </LoadingProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
