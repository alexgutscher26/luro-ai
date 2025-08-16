import { track } from '@vercel/analytics';

/**
 * Track custom events with Vercel Analytics
 */
export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    track(name, properties);
  } else {
    console.log(`[Analytics] ${name}:`, properties);
  }
};

/**
 * Track page views
 */
export const trackPageView = (page: string, properties?: Record<string, any>) => {
  trackEvent('page_view', {
    page,
    ...properties
  });
};

/**
 * Track user interactions
 */
export const trackInteraction = (action: string, element: string, properties?: Record<string, any>) => {
  trackEvent('user_interaction', {
    action,
    element,
    ...properties
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean, properties?: Record<string, any>) => {
  trackEvent('form_submission', {
    form_name: formName,
    success,
    ...properties
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, any>) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location,
    ...properties
  });
};

/**
 * Track feature usage
 */
export const trackFeatureUsage = (feature: string, action: string, properties?: Record<string, any>) => {
  trackEvent('feature_usage', {
    feature,
    action,
    ...properties
  });
};