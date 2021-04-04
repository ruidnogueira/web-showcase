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

worker.start({
  waitUntilReady: true,
  serviceWorker: { url: `${process.env.PUBLIC_URL}/mockServiceWorker.js` },
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
