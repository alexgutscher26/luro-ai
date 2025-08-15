import Icons from "./global/icons";
import Images from "./global/images";
import Wrapper from "./global/wrapper";
import Container from "./global/container";
import Background from "./global/background";
import Providers from "./global/providers";
import ErrorBoundary from "./global/error-boundary";
import GlobalErrorBoundary from "./global/global-error-boundary";

import SignInForm from "./auth/signin-form";
import SignUpForm from "./auth/signup-form";

import Hero from "./marketing/hero";
import Navbar from "./marketing/navbar";
import Companies from "./marketing/companies";
import Features from "./marketing/features";
import Connect from "./marketing/connect";
import Perks from "./marketing/perks";
import Pricing from "./marketing/pricing";
import Reviews from "./marketing/reviews";
import CTA from "./marketing/cta";
import Footer from "./marketing/footer";
import { NewsletterSignup } from "./marketing/newsletter-signup";
export * from "./onboarding";

export {
    Icons,
    Images,
    Wrapper,
    Container,
    Background,
    Hero,
    Navbar,
    Companies,
    Features,
    Connect,
    Perks,
    Pricing,
    Reviews,
    CTA,
    Footer,
    NewsletterSignup,
    SignInForm,
    SignUpForm,
    Providers,
    ErrorBoundary,
    GlobalErrorBoundary,
};

// Analytics
export {
    UmamiAnalytics,
    useUmamiTracking,
    UmamiUtils,
} from "./global/umami-analytics";
export { PrivacyNotice } from "./global/privacy-notice";
