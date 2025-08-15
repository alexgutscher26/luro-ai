'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UmamiUtils } from './umami-analytics';

interface PrivacyNoticeProps {
  /**
   * Whether to show the privacy notice
   * @default true
   */
  enabled?: boolean;
  /**
   * Custom privacy policy URL
   */
  privacyPolicyUrl?: string;
}

/**
 * Manages the display of a privacy notice component based on user consent and configuration settings.
 *
 * The function initializes a state to control the visibility of the notice and uses an effect to determine
 * whether the notice should be shown. It checks if analytics consent is stored in localStorage or if the
 * user has opted out through UmamiUtils. If neither condition is met, the notice is displayed. Users can
 * accept or decline the notice, which updates their consent status and hides the notice.
 */
export function PrivacyNotice({ 
  enabled = true, 
  privacyPolicyUrl = '/privacy' 
}: PrivacyNoticeProps = {}) {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if user has already made a choice
    const consent = localStorage.getItem('analytics-consent');
    const hasOptedOut = UmamiUtils.hasOptedOut();
    
    if (consent === null && !hasOptedOut) {
      setShowNotice(true);
    }
  }, [enabled]);

  /**
   * Sets analytics consent to true, opts in with Umami, and hides the notice.
   */
  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    UmamiUtils.optIn();
    setShowNotice(false);
  };

  /**
   * Handles the user's decline of analytics consent by setting localStorage and opting out of analytics.
   */
  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'false');
    UmamiUtils.optOut();
    setShowNotice(false);
  };

  if (!enabled || !showNotice) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Privacy & Analytics
          </CardTitle>
          <CardDescription className="text-xs">
            We use privacy-friendly analytics to improve our service. No personal data is collected or stored.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-xs text-muted-foreground">
            Our analytics respect your privacy and comply with GDPR. You can opt out at any time.
            {privacyPolicyUrl && (
              <>
                {' '}
                <a 
                  href={privacyPolicyUrl} 
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </>
            )}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 pt-0">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleDecline}
            className="flex-1 text-xs"
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
            className="flex-1 text-xs"
          >
            Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}