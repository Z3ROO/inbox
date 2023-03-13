import { QueryKey, UseQueryOptions } from "react-query";

export type QueryOptions<T, K extends QueryKey = QueryKey> = Omit<UseQueryOptions<T, unknown, T, K>, 'queryKey' | 'queryFn'>

