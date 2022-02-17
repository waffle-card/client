import React, { Suspense } from 'react';
import { Header, Spinner } from '@/components';
import { ModalsProvider, WaffleCardsProvider } from '@/contexts';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Spinner loading />}>
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
