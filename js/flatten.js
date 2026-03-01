// Implemente uma função que nivele um array aninhado de profundidade arbitária sem usar Array.prototype.flat()
//
function flatten(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flattenRecursive(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenRecursive(val) : val),
    [],
  );
}

function flattenDeep(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      stack.push(...current);
    } else {
      result.push(current);
    }
  }
  return result;
}

console.log(flatten([1, [2, [3, [4, [5]]]]]));
console.log(flattenRecursive([1, [2, [3, [4, [5]]]]]));
console.log(flattenDeep([1, [2, [3, [4, [5]]]]]));
