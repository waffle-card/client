import React, { Suspense } from 'react';
import { Header } from '@components';
import { UserProvider, ModalsProvider } from '@contexts';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <UserProvider>
      <RecoilRoot>
        <ModalsProvider>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </ModalsProvider>
      </RecoilRoot>
    </UserProvider>
  );
}

export default App;
