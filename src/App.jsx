import React, { Suspense } from 'react';
import { Header } from '@components';
import { UserProvider, ModalsProvider } from '@contexts';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <UserProvider>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <ModalsProvider>
            <Header />

            <Router />
          </ModalsProvider>
        </Suspense>
      </RecoilRoot>
    </UserProvider>
  );
}

export default App;
