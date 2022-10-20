import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import find from 'lodash/find';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import acceptLanguage from 'accept-language';
import { create } from 'jss';
import jssRtl from 'jss-rtl';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { useRouter } from 'next/router';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import pages from 'docs/src/pages';
import initRedux from 'docs/src/modules/redux/initRedux';
import PageContext from 'docs/src/modules/components/PageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import loadScript from 'docs/src/modules/utils/loadScript';
import RtlContext from 'docs/src/modules/utils/RtlContext';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { pathnameToLanguage, getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, jssRtl()],
  insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

function useFirstRender() {
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}

acceptLanguage.languages(['en', 'zh', 'pt', 'ru']);

function LanguageNegotiation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userLanguage = useUserLanguage();

  React.useEffect(() => {
    const { userLanguage: userLanguageUrl, canonical } = pathnameToLanguage(router.asPath);
    const preferedLanguage =
      getCookie('userLanguage') !== 'noDefault' && userLanguage === 'en'
        ? acceptLanguage.get(navigator.language)
        : userLanguage;

    if (preferedLanguage !== userLanguage) {
      window.location = preferedLanguage === 'en' ? canonical : `/${preferedLanguage}${canonical}`;
    } else if (userLanguageUrl !== userLanguage) {
      dispatch({ type: ACTION_TYPES.OPTIONS_CHANGE, payload: { userLanguage: userLanguageUrl } });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

/**
 * Priority: on first render: navigated value, persisted value; otherwise initial value, 'JS'
 * @returns {string} - The persisted variant if the initial value is undefined
 */
function usePersistCodeVariant() {
  const dispatch = useDispatch();
  const { codeVariant: initialCodeVariant = CODE_VARIANTS.JS } = useSelector(
    (state) => state.options,
  );

  const isFirstRender = useFirstRender();

  const navigatedCodeVariant = React.useMemo(() => {
    const navigatedCodeVariantMatch =
      typeof window !== 'undefined' ? window.location.hash.match(/\.(js|tsx)$/) : null;

    if (navigatedCodeVariantMatch === null) {
      return undefined;
    }

    return navigatedCodeVariantMatch[1] === 'tsx' ? CODE_VARIANTS.TS : CODE_VARIANTS.JS;
  }, []);

  const persistedCodeVariant = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return getCookie('codeVariant');
  }, []);

  /**
   * we initialize from navigation or cookies. on subsequent renders the store is the
   * truth
   */
  const codeVariant =
    isFirstRender === true
      ? navigatedCodeVariant || persistedCodeVariant || initialCodeVariant
      : initialCodeVariant;

  React.useEffect(() => {
    if (codeVariant !== initialCodeVariant) {
      dispatch({ type: ACTION_TYPES.OPTIONS_CHANGE, payload: { codeVariant } });
    }
  });

  React.useEffect(() => {
    document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;
  }, [codeVariant]);

  return codeVariant;
}

/**
 * basically just a `useAnalytics` hook.
 * However, it needs the redux store which is created
 * in the same component this "hook" is used.
 */
function Analytics() {
  React.useEffect(() => {
    loadScript('https://www.google-analytics.com/analytics.js', document.querySelector('head'));
  }, []);

  const options = useSelector((state) => state.options);

  const codeVariant = usePersistCodeVariant();
  React.useEffect(() => {
    window.ga('set', 'dimension1', codeVariant);
  }, [codeVariant]);

  React.useEffect(() => {
    window.ga('set', 'dimension2', options.userLanguage);
  }, [options.userLanguage]);

  React.useEffect(() => {
    /**
     * @type {null | MediaQueryList}
     */
    let matchMedia = null;

    /**
     * Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Monitoring_screen_resolution_or_zoom_level_changes
     * Adjusted to track 3 or more different ratios
     */
    function trackDevicePixelRation() {
      window.ga('set', 'dimension3', Math.round(window.devicePixelRatio * 10) / 10);

      matchMedia = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      // Need to setup again.
      // Otherwise we track only changes from the initial ratio to another.
      // It would not track 3 or more different monitors/zoom stages
      matchMedia.addListener(trackDevicePixelRation);
    }

    trackDevicePixelRation();

    return () => {
      matchMedia = null;
    };
  }, []);

  return null;
}

// Inspired by
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
function forcePageReload(registration) {
  // console.log('already controlled?', Boolean(navigator.serviceWorker.controller));

  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled so it's a new service
    // worker that will activate immediately.
    return;
  }

  // console.log('registration waiting?', Boolean(registration.waiting));
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    registration.waiting.postMessage('skipWaiting');
    return;
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', (event) => {
      // console.log('statechange', event.target.state);
      if (event.target.state === 'installed' && registration.waiting) {
        // A new service worker is available, inform the user
        registration.waiting.postMessage('skipWaiting');
      } else if (event.target.state === 'activated') {
        // Force the control of the page by the activated service worker.
        window.location.reload();
      }
    });
  }

  if (registration.installing) {
    listenInstalledStateChange();
    return;
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

async function registerServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production' &&
    window.location.host.indexOf('material-ui.com') !== -1
  ) {
    // register() automatically attempts to refresh the sw.js.
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Force the page reload for users.
    forcePageReload(registration);
  }
}

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#material-icon-font'),
  );
}

if (process.browser && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(
    `%c

███╗   ███╗ █████╗ ████████╗███████╗██████╗ ██╗ █████╗ ██╗      ██╗   ██╗██╗
████╗ ████║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██║      ██║   ██║██║
██╔████╔██║███████║   ██║   █████╗  ██████╔╝██║███████║██║█████╗██║   ██║██║
██║╚██╔╝██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║██║╚════╝██║   ██║██║
██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██║  ██║██║██║  ██║███████╗ ╚██████╔╝██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝ ╚═╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
    'font-family:monospace;color:#1976d2;font-size:12px;',
  );
}

function findActivePage(currentPages, pathname) {
  const activePage = find(currentPages, (page) => {
    if (page.children) {
      if (pathname.indexOf(`${page.pathname}/`) === 0) {
        // Check if one of the children matches (for /components)
        return findActivePage(page.children, pathname);
      }
    }

    // Should be an exact match if no children
    return pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== pathname) {
    return findActivePage(activePage.children, pathname);
  }

  return activePage;
}

// Cache for the ltr version of the styles
export const cacheLtr = createCache();
cacheLtr.compat = true;

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  stylisPlugins: [rtlPlugin],
});
cacheRtl.compat = true;

function AppWrapper(props) {
  const { children, pageProps } = props;

  const router = useRouter();
  const [redux] = React.useState(() =>
    initRedux({ options: { userLanguage: pageProps.userLanguage } }),
  );

  const [rtl, setRtl] = React.useState(false);
  const rtlContextValue = { rtl, setRtl };

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const activePage = findActivePage(pages, router.pathname);

  let fonts = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700&display=swap',
  ];
  if (router.pathname.match(/onepirate/)) {
    fonts = [
      'https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Work+Sans:300,400&display=swap',
    ];
  }

  return (
    <React.Fragment>
      <NextHead>
        {fonts.map((font) => (
          <link rel="stylesheet" href={font} key={font} />
        ))}
      </NextHead>
      <ReduxProvider store={redux}>
        <RtlContext.Provider value={rtlContextValue}>
          <PageContext.Provider value={{ activePage, pages, versions: pageProps.versions }}>
            <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
              <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
                <StylesProvider jss={jss}>
                  <ThemeProvider>{children}</ThemeProvider>
                </StylesProvider>
              </CacheProvider>
            </StyleSheetManager>
          </PageContext.Provider>
        </RtlContext.Provider>
        <LanguageNegotiation />
        <Analytics />
      </ReduxProvider>
      <GoogleAnalytics key={router.route} />
    </React.Fragment>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <AppWrapper pageProps={pageProps}>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      userLanguage: ctx.query.userLanguage || 'en',
      ...pageProps,
    },
  };
};

// Track fraction of actual events to prevent exceeding event quota.
// Filter sessions instead of individual events so that we can track multiple metrics per device.
const disableWebVitalsReporting = Math.random() > 0.0001;
export function reportWebVitals({ id, name, label, value }) {
  if (disableWebVitalsReporting) {
    return;
  }

  window.ga('send', 'event', {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}
