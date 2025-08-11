"use client";

import Image, { ImageProps } from "next/image";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/functions";

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  fallback?: string;
  enableBlur?: boolean;
  lazyLoad?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  fallback = "/images/placeholder.png",
  enableBlur = true,
  lazyLoad = true,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazyLoad || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazyLoad || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad, priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Determine loading strategy based on priority and lazyLoad
  const getLoadingProps = () => {
    if (priority) {
      return { priority: true };
    }
    if (lazyLoad) {
      return { loading: "lazy" as const };
    }
    return {};
  };

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {isInView && (
        <Image
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoading && enableBlur ? "blur-sm" : "blur-0",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...getLoadingProps()}
          {...props}
        />
      )}
      {isLoading && isInView && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
};