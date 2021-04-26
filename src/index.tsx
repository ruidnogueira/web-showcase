import { Profiler, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import { App } from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { I18nProvider } from 'app/core/i18n/I18nProvider';
import { worker } from 'mocks/server/browser.mock';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';

if (window.location.pathname === process.env.PUBLIC_URL) {
  // https://github.com/w3c/ServiceWorker/issues/1468
  // due to a problem with service worker implementation when served from subdirectories,
  // setting react homepage property in package.json causes service workers to fail when not using trailing slash
  // does't work -> http://localhost:3000/example
  // works -> http://localhost:3000/example/
  window.location.pathname = process.env.PUBLIC_URL + '/';
}

worker.start({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

ReactDOM.render(
  <StrictMode>
    <Profiler id="App" onRender={() => {}}>
      <BrowserRouter>
        <ConfigProvider>
          <I18nProvider>
            <GlobalProviders>
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            </GlobalProviders>
          </I18nProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Profiler>
  </StrictMode>,
  document.getElementById('root')
);

// TODO ADD service worker check for updates
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
