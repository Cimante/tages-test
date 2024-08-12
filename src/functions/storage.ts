export function storageSet<T>(payload: T, key: string) {
  localStorage.setItem(key, JSON.stringify(payload));
}

export function storageGet<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
