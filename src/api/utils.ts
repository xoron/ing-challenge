export const fetchStories = (endpoint: string) =>
  fetch(endpoint).then((response: { json: () => any }) => response.json());
export const fetchItem = (endpoint: string) =>
  fetch(endpoint).then((response: { json: () => any }) => response.json());
