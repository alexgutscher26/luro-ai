"use client";

import React, { useCallback, useRef, useEffect, useMemo, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateLoopsContact } from '@/hooks/use-loops';
import { toast } from 'sonner';
import { SparklesIcon, ShieldCheckIcon, TrendingUpIcon, CheckIcon, MailIcon } from 'lucide-react';

type Variant = 'default' | 'hero' | 'minimal' | 'premium';

interface NewsletterSignupProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: Variant;
  showDescription?: boolean;
  showBenefits?: boolean;
  showSocialProof?: boolean;
  subscriberCount?: number;
}

type FormState = {
  email: string;
  isSuccess: boolean;
  showConfetti: boolean;
  emailError: string;
  isFocused: boolean;
};

type FormAction = 
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'SET_CONFETTI'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_FOCUS'; payload: boolean }
  | { type: 'RESET_FORM' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_EMAIL': return { ...state, email: action.payload };
    case 'SET_SUCCESS': return { ...state, isSuccess: action.payload };
    case 'SET_CONFETTI': return { ...state, showConfetti: action.payload };
    case 'SET_ERROR': return { ...state, emailError: action.payload };
    case 'SET_FOCUS': return { ...state, isFocused: action.payload };
    case 'RESET_FORM': return initialFormState;
    default: return state;
  }
};

const initialFormState: FormState = {
  email: '',
  isSuccess: false,
  showConfetti: false,
  emailError: '',
  isFocused: false,
};

const VARIANT_STYLES = {
  hero: {
    container: 'max-w-md mx-auto',
    form: 'flex flex-col sm:flex-row gap-3 p-4 bg-background/50 backdrop-blur-lg rounded-2xl border border-foreground/10 shadow-2xl',
    input: 'bg-background/80 border-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300',
    button: 'btn-primary rounded-xl',
  },
  minimal: {
    container: 'max-w-sm',
    form: 'flex gap-2',
    input: 'border-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200',
    button: 'bg-foreground hover:bg-foreground/80 text-background transition-colors duration-200',
  },
  premium: {
    container: 'max-w-xl',
    form: 'flex flex-col sm:flex-row gap-4 p-6 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-lg rounded-3xl border border-foreground/10 shadow-2xl',
    input: 'bg-background/60 border-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 text-lg py-3',
    button: 'btn-primary rounded-xl text-lg py-3',
  },
  default: {
    container: 'max-w-lg',
    form: 'flex flex-col sm:flex-row gap-3 p-4 bg-background/50 backdrop-blur-lg rounded-xl border border-foreground/10 shadow-lg',
    input: 'bg-background/80 border-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-lg transition-all duration-200',
    button: 'btn-primary rounded-lg',
  },
} as const;

const BENEFITS = [
  { icon: TrendingUpIcon, text: 'Weekly insights & trends' },
  { icon: SparklesIcon, text: 'Exclusive content & tips' },
  { icon: ShieldCheckIcon, text: 'No spam, unsubscribe anytime' },
] as const;

// Simple wrapper components to replace missing ones
const Container: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Simple confetti placeholder (you'll need to install react-confetti or similar for full effect)
const Realistic: React.FC<{ autorun: { speed: number; duration: number }; style: React.CSSProperties }> = ({ style }) => {
  return <div style={style} className="pointer-events-none" />;
};

export const NewsletterSignup = React.memo<NewsletterSignupProps>(({
  className = '',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  variant = 'default',
  showDescription = true,
  showBenefits = false,
  showSocialProof = false,
  subscriberCount = 0,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const inputRef = useRef<HTMLInputElement>(null);
  const createContact = useCreateLoopsContact({
    onSuccess: () => {},
    onError: () => {}
  });

  const styles = useMemo(() => VARIANT_STYLES[variant], [variant]);

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  useEffect(() => {
    if (state.email && !validateEmail(state.email)) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid email address' });
    } else {
      dispatch({ type: 'SET_ERROR', payload: '' });
    }
  }, [state.email, validateEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email || !validateEmail(state.email)) {
      toast.error('Please enter a valid email address');
      inputRef.current?.focus();
      return;
    }

    try {
      await createContact.mutateAsync({
        email: state.email,
        userGroup: 'newsletter',
        source: 'newsletter-signup',
      });
      
      dispatch({ type: 'SET_SUCCESS', payload: true });
      dispatch({ type: 'SET_CONFETTI', payload: true });
      
      toast.success('🎉 Welcome aboard! Check your inbox for a confirmation email.');
      
      setTimeout(() => {
        dispatch({ type: 'SET_CONFETTI', payload: false });
        setTimeout(() => dispatch({ type: 'RESET_FORM' }), 2000);
      }, 3000);
      
    } catch (error: any) {
      if (error.response?.status === 409 || error.response?.data?.error === 'already_subscribed') {
        toast.info('📧 You\'re already subscribed!', {
          description: 'Check your inbox for our latest newsletters.',
          duration: 4000,
        });
        dispatch({ type: 'SET_EMAIL', payload: '' });
      }
      inputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${styles.container} ${className}`}
      >
        {state.showConfetti && (
          <Realistic
            autorun={{ speed: 3, duration: 3000 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        )}

        {state.isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${styles.form} border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5`}
          >
            <div className="flex items-center justify-center gap-3 py-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full backdrop-blur-sm"
              >
                <CheckIcon className="w-6 h-6 text-green-400" />
              </motion.div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-green-400 text-lg">You're all set!</p>
                <p className="text-sm text-green-300/80">Welcome to our newsletter family 🎉</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {showDescription && variant !== 'minimal' && (
              <Container delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <SparklesIcon className="w-6 h-6 text-primary" />
                    <h3 className={`font-bold heading ${variant === 'premium' ? 'text-2xl' : 'text-lg'}`}>
                      Stay in the loop
                    </h3>
                  </div>
                  <p className={`text-accent-foreground/60 ${variant === 'premium' ? 'text-base' : 'text-sm'}`}>
                    Get the latest updates, insights, and exclusive content delivered straight to your inbox.
                  </p>
                  
                  {showSocialProof && subscriberCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 flex items-center justify-center gap-2 text-sm text-accent-foreground/50"
                    >
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full border-2 border-background ${
                              ['bg-primary/80', 'bg-green-500/80', 'bg-purple-500/80'][i]
                            }`}
                          />
                        ))}
                      </div>
                      <span>Join {subscriberCount.toLocaleString()}+ subscribers</span>
                    </motion.div>
                  )}
                </motion.div>
              </Container>
            )}

            {showBenefits && variant !== 'minimal' && (
              <Container delay={0.2}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {BENEFITS.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-accent-foreground/60">
                      <benefit.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </motion.div>
              </Container>
            )}

            <Container delay={0.3}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="flex-1 relative group">
                  <Input
                    ref={inputRef}
                    type="email"
                    placeholder={placeholder}
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    onFocus={() => dispatch({ type: 'SET_FOCUS', payload: true })}
                    onBlur={() => dispatch({ type: 'SET_FOCUS', payload: false })}
                    required
                    className={`w-full ${styles.input} ${state.emailError ? 'border-red-500/50' : ''}`}
                    disabled={createContact.isPending}
                    aria-invalid={!!state.emailError}
                    aria-describedby={state.emailError ? 'email-error' : undefined}
                  />
                  
                  {state.emailError && state.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="absolute -bottom-5 left-0 text-xs text-red-400"
                    >
                      {state.emailError}
                    </motion.p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={createContact.isPending || !state.email || !!state.emailError}
                  className={`${styles.button} relative overflow-hidden group min-w-fit px-6`}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: createContact.isPending ? 0.95 : 1 }}
                    className="flex items-center gap-2 relative z-10"
                  >
                    {createContact.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <MailIcon className="w-4 h-4" />
                        <span>{buttonText}</span>
                      </>
                    )}
                  </motion.div>
                </Button>
              </form>
            </Container>

            {variant !== 'minimal' && (
              <Container delay={0.4}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xs text-accent-foreground/50">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </motion.div>
              </Container>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

NewsletterSignup.displayName = 'NewsletterSignup';