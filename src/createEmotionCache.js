import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// On the client side, this function looks for an existing meta tag named
// `emotion-insertion-point` at the top of the <head> and uses it as the
// insertion point. This assures that MUI styles are loaded first and allows
// developers to easily override them with other styling solutions, like CSS
// modules.
export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}