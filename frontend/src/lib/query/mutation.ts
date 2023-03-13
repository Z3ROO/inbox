import * as ReactQuery from "react-query";

export type MutationRequest<TData, TVariables> = (args:TVariables) => Promise<TData>
export type MutationOptions<TData, TVariables> = Omit<ReactQuery.UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationKey' | 'mutationFn'>
export type MutateFunction<TData, TVariables> = (args: TVariables, options?: ReactQuery.MutateOptions<TData, unknown, TVariables, unknown> |undefined) => void
export interface Mutation<TData, TVariables> extends MutateFunction<TData, TVariables> {
  isLoading: boolean
  isError: boolean
}

export function useMutation<TData = unknown, TVariables = unknown>(request: MutationRequest<TData, TVariables>, options?: MutationOptions<TData, TVariables> ) {
  const mutation = ReactQuery.useMutation(request, {
    ...options
  });

  return mutationWrapper(mutation);
 }

function mutationWrapper<TData, TVars>(mutation: ReactQuery.UseMutationResult<TData, unknown, TVars, unknown>) {
  const mutationFn: Mutation<TData, TVars> = function (arg: TVars, options?: MutationOptions<TData, TVars>) {
    return mutation.mutate(arg, options)
  }

  mutationFn.isLoading = mutation.isLoading; 
  mutationFn.isError = mutation.isError; 
  
  return mutationFn; 
}

