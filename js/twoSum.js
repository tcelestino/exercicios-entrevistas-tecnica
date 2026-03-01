// Dado um array inteiro, encontre dois números que somados sejam igual a um valor alvo. Retorne os índices dos dois números.
function twoSum(nums, target) {
  const map = new Map(); // valor -> indice
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([7, 2, 1, 3], 10));
// Conceito: uso do hashmap como lookup table para armazenar os valores já visitados e seus índices. Usa O(n) ao invés do O(n2) para solução de força bruta
