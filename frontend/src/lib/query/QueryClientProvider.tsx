import { ReactNode } from "react";
import {  
    QueryClient, 
    QueryClientProvider as OriginalQueryClientProvider
} from "react-query";
export const queryClient = new QueryClient();


/**
 * ### Query Client Provider
 * Creates a context to manage state of queries and mutations.
 * @param props.children - ReactNode
 * @returns 
 */

export function QueryClientProvider(props: {children: ReactNode}) {
    return (
        <OriginalQueryClientProvider {...props} client={queryClient} />
    )
}