import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ./ 경로가 없는 것은 대부분 설치한 라이브러리임
import { Provider } from 'react-redux';
import store from './store.js';
import { QueryClient, QueryClientProvider } from 'react-query';

// 실시간 데이터를 다루기 위한 react-query 사용법
// npm install react-query 설치 후 index.js 에 첫번째 세팅
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

// react-query 를 사용하기 위해 세팅 작업 2
<QueryClientProvider client={queryClient}>
  <Provider store={store}> {/** Redux 를 사용하기 위해 세팅작업 store.js 설명 참고 */}
    {/* npm install react-router-dom@6 라이브러리 설치 후 BrowserRouter*/}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
</QueryClientProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
