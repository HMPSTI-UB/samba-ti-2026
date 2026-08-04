let justLoggedIn = false;

export function markJustLoggedIn() {
  justLoggedIn = true;
}

export function consumeJustLoggedIn(): boolean {
  const value = justLoggedIn;
  justLoggedIn = false;
  return value;
}
