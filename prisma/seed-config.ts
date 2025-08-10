export const SEED_CONFIG = {
  // Environment settings
  environments: {
    development: {
      allowSeed: true,
      allowCleanup: true,
      userCount: 8
    },
    staging: {
      allowSeed: true,
      allowCleanup: false,
      userCount: 5
    },
    production: {
      allowSeed: false,
      allowCleanup: false,
      userCount: 0
    }
  },
  
  // Default avatars for different user types
  avatars: {
    admin: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    creator: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    marketer: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    agency: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    freelancer: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
};

export const getCurrentEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

export const canSeed = () => {
  const env = getCurrentEnvironment();
  return SEED_CONFIG.environments[env as keyof typeof SEED_CONFIG.environments]?.allowSeed || false;
};