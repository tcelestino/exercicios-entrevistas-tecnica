// Implementa uma função que reteorne o N-ésimo número de fibonacci de forma eficeiente (sem recursão ingenua)
function fibonacci(n) {
  if (n <= 1) return n;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

function fibonacciMemoized(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10));
console.log(fibonacciMemoized(10));

// Conceito: faz uso de uma tabela de memoização para evitar cálculos repetidos
