const HISTORY_KEY = "search_history";

export function saveQuery(query) {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history = raw ? JSON.parse(raw) : [];

  history = [query, ...history.filter(k => k !== query)].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearSearchHistory() {
    localStorage.removeItem(HISTORY_KEY);
}

export function getSearchHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

export function removeFromHistory(query) {
  const raw = localStorage.getItem(HISTORY_KEY);
  let history = raw ? JSON.parse(raw) : [];

  history = history.filter(k => k !== query);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}
