import React, { Suspense } from 'react';
import { Header } from '@components';
import { ModalsProvider } from '@contexts';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <ModalsProvider>
          <Header />
          <Router />
        </ModalsProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
