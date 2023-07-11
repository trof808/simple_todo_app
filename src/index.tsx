import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { makeServer } from "./server"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
