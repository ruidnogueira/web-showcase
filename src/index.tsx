import { Profiler, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import { App } from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { I18nProvider } from 'app/core/i18n/I18nProvider';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'app/core/providers/ThemeProvider';
import { HasServiceWorkerUpdateMessage } from 'app/core/providers/ServiceWorkerUpdateProvider';
import { SetupWorkerApi } from 'msw';

let registerMockServiceWorker: (() => Promise<void>) | undefined;

if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_E2E) {
  // cannot be inside a function otherwise it will not be treeshaken
  registerMockServiceWorker = async () => {
    const { worker }: { worker: SetupWorkerApi } = require('mocks/server/browser.mock');

    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
      },
    });
  };
}

start();

async function start() {
  redirectRoot();

  await registerMockServiceWorker?.();

  render();

  registerServiceWorker();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

/**
 * https://github.com/w3c/ServiceWorker/issues/1468
 * due to a problem with service worker implementation when served from subdirectories,
 * setting react homepage property in package.json causes service workers to fail when not using trailing slash
 *
 * does't work -> http://localhost:3000/example
 *
 * works -> http://localhost:3000/example/
 */
function redirectRoot() {
  if (window.location.pathname === process.env.PUBLIC_URL) {
    //
    window.location.pathname = process.env.PUBLIC_URL + '/';
  }
}

function registerServiceWorker() {
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      const waitingRegistration = registration.waiting;

      if (waitingRegistration) {
        window.addEventListener('message', (message) => {
          if (message.data?.type === 'UPDATE_SERVICE_WORKER') {
            waitingRegistration.addEventListener('statechange', () => {
              if (waitingRegistration.state === 'activated') {
                window.location.reload();
              }
            });

            waitingRegistration.postMessage({ type: 'SKIP_WAITING' });
          }
        });

        const message: HasServiceWorkerUpdateMessage = { type: 'HAS_SERVICE_WORKER_UPDATE' };
        window.postMessage(message);
      }
    },
  });
}

function render() {
  ReactDOM.render(
    <StrictMode>
      <Profiler id="App" onRender={() => {}}>
        <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
          <HelmetProvider>
            <ConfigProvider>
              <I18nProvider>
                <ThemeProvider>
                  <GlobalProviders>
                    <Suspense fallback={<div>Loading...</div>}>
                      <App />
                    </Suspense>
                  </GlobalProviders>
                </ThemeProvider>
              </I18nProvider>
            </ConfigProvider>
          </HelmetProvider>
        </BrowserRouter>
      </Profiler>
    </StrictMode>,
    document.getElementById('root')
  );
}
