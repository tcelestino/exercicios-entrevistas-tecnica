//Implementa uma função de deep clone (clonagem profunda) sem JSON.stringify

function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (seen.has(obj)) return seen.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}
const original = { a: 1, b: { c: [1, 2, 3] }, d: new Date() };
const cloned = deepClone(original);
cloned.b.c.push(99);
console.log(original); // não afetado
console.log(cloned); // adicionado 99
