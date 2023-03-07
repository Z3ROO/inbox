export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? Partial<T[P]> : T[P];
};
