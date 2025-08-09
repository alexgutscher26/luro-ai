import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseOptimisticUpdateOptions<TData, TVariables> {
  queryKey: (string | number)[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  updateFn: (oldData: TData[] | undefined, variables: TVariables) => TData[];
  successMessage?: string;
  errorMessage?: string;
}

export const useOptimisticUpdate = <TData, TVariables>({
  queryKey,
  mutationFn,
  updateFn,
  successMessage = 'Updated successfully',
  errorMessage = 'Update failed',
}: UseOptimisticUpdateOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<TData[]>(queryKey);

      // Optimistically update
      queryClient.setQueryData<TData[]>(queryKey, (oldData) => 
        updateFn(oldData, variables)
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success(successMessage);
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey });
    },
  });
};