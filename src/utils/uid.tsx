// src/utils/uid.ts
export function uid() {
  // Good-enough unique id for local usage
  return (
    "t_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 8)
  );
}
