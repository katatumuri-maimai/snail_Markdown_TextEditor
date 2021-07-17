import React from 'react';
import { ContextProvider } from './common/context';
import Main from './components/Main';

export default function App() {
  return (
    <ContextProvider>
      <Main/>
    </ContextProvider>
  );
}




