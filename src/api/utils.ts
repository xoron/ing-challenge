export const fetchStories = (endpoint) => fetch(endpoint).then(response => response.json())
export const fetchItem = (endpoint) => fetch(endpoint).then(response => response.json())