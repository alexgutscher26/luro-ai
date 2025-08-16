import { track } from '@vercel/analytics';

/**
 * Tracks a custom event using Vercel Analytics or logs it in development.
 */
export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    track(name, properties);
  } else {
    console.log(`[Analytics] ${name}:`, properties);
  }
};

/**
 * Tracks a page view event with optional properties.
 */
export const trackPageView = (page: string, properties?: Record<string, any>) => {
  trackEvent('page_view', {
    page,
    ...properties
  });
};

/**
 * Tracks a user interaction with specified action and element.
 */
export const trackInteraction = (action: string, element: string, properties?: Record<string, any>) => {
  trackEvent('user_interaction', {
    action,
    element,
    ...properties
  });
};

/**
 * Tracks a form submission with its name, success status, and optional properties.
 */
export const trackFormSubmission = (formName: string, success: boolean, properties?: Record<string, any>) => {
  trackEvent('form_submission', {
    form_name: formName,
    success,
    ...properties
  });
};

/**
 * Tracks a button click event with optional additional properties.
 */
export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, any>) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location,
    ...properties
  });
};

/**
 * Tracks the usage of a specific feature with an associated action and optional properties.
 */
export const trackFeatureUsage = (feature: string, action: string, properties?: Record<string, any>) => {
  trackEvent('feature_usage', {
    feature,
    action,
    ...properties
  });
};