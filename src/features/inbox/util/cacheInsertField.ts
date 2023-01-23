const INSERT_FIELD_CACHE_ID = 'InboxInsertInputField'

export function cacheInsertInputField(value: string) {
  localStorage.setItem(INSERT_FIELD_CACHE_ID, value)
}

export function getCachedInsertInputField() {
  let cache = localStorage.getItem(INSERT_FIELD_CACHE_ID);
  if (!cache)
    cache = '';

  return cache
}