import { useApiMutation } from './use-api';

interface CreateContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  userGroup?: string;
  source?: string;
}

interface SendTransactionalData {
  email: string;
  transactionalId: string;
  dataVariables?: Record<string, any>;
}

interface TrackEventData {
  email: string;
  eventName: string;
  eventProperties?: Record<string, any>;
}

export const useCreateLoopsContact = () => {
  return useApiMutation<any, CreateContactData>({
    endpoint: '/loops/contact',
    method: 'POST',
    showSuccessToast: true,  // Changed from false to true
    showErrorToast: true,
    successMessage: 'Successfully subscribed to newsletter!',  // Added custom message
    onSuccess: () => {
      console.log('Contact created in Loops successfully');
    },
  });
};

export const useSendTransactionalEmail = () => {
  return useApiMutation<any, SendTransactionalData>({
    endpoint: '/loops/send-transactional',
    method: 'POST',
    showSuccessToast: false,
    showErrorToast: true,
  });
};

export const useTrackLoopsEvent = () => {
  return useApiMutation<any, TrackEventData>({
    endpoint: '/loops/events',
    method: 'POST',
    showSuccessToast: false,
    showErrorToast: true,
  });
};