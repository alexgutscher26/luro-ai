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

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    UmamiUtils.optIn();
    setShowNotice(false);
  };

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