export async function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json() as Promise<T>;
    })
    .then((data): T => {
      return data;
    });
}
