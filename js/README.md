# Algoritmos e Padrões JavaScript para Entrevistas Técnicas

Coleção de exercícios JavaScript que cobre os algoritmos e padrões de programação mais cobrados em entrevistas técnicas. Cada arquivo é independente e pode ser executado diretamente com Node.js ou Deno.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v22 ou superior
- [Deno.js](https://deno.com/) v2.0 ou superior

## Como executar

```bash
node js/fibonacci.js
node js/flatten.js
node js/twoSum.js
node js/debounce.js
node js/throttle.js
node js/groupBy.js
node js/isPalindrome.js
node js/deepClone.js
node js/removeDuplicate.js
```

---

## Exercícios

### `twoSum.js` — Two Sum com HashMap

**Problema:** dado um array de inteiros e um valor alvo, encontre os índices de dois números que somados resultam no alvo.

**Conceito central:** HashMap como lookup table.

Em vez de comparar todos os pares possíveis (O(n²)), percorremos o array uma única vez. Para cada elemento, calculamos o complemento (`alvo - elemento`) e verificamos se ele já foi visto antes.

```
nums = [2, 7, 11, 15], target = 9

i=0: elemento=2, complemento=7 → não está no map → guarda {2: 0}
i=1: elemento=7, complemento=2 → está no map! → retorna [0, 1]
```

| Abordagem | Complexidade de tempo | Complexidade de espaço |
|---|---|---|
| Força bruta (dois loops) | O(n²) | O(1) |
| HashMap (este arquivo) | O(n) | O(n) |

---

### `fibonacci.js` — Fibonacci Iterativo e com Memoização

**Problema:** retornar o N-ésimo número da sequência de Fibonacci de forma eficiente.

A sequência é: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...

**Conceito central:** evitar trabalho repetido.

A solução recursiva ingênua recalcula os mesmos valores diversas vezes, resultando em complexidade O(2ⁿ). Este arquivo mostra duas abordagens eficientes:

- **Iterativa:** usa dois ponteiros (`prev` e `curr`) para calcular em O(n) com O(1) de memória.
- **Memoização:** recursão com cache (`memo`) para armazenar resultados já calculados — O(n) de tempo e espaço.

---

### `flatten.js` — Flatten de Array Aninhado

**Problema:** nivelar um array de profundidade arbitrária sem usar `Array.prototype.flat()`.

**Conceito central:** recursão e pilha iterativa.

O arquivo mostra três abordagens para o mesmo problema:

1. **Recursão simples com spread:** percorre o array, e quando encontra um subarray chama a si mesma.
2. **Recursão com `reduce`:** variação mais funcional usando `reduce` + `concat`.
3. **Pilha iterativa:** simula a recursão manualmente com uma pilha (`stack`), útil quando o nível de aninhamento é muito profundo e existe risco de estouro de pilha (`stack overflow`).

---

### `groupBy.js` — Agrupar por Propriedade

**Problema:** agrupar os objetos de um array com base em uma propriedade.

**Conceito central:** `reduce` para acumulação em objeto.

O arquivo mostra duas formas:

- **Implementação manual com `reduce`:** compatível com qualquer ambiente.
- **`Object.groupBy` nativo:** disponível a partir do Node.js 21 e em navegadores modernos (2024+).

---

### `isPalindrome.js` — Verificar Palíndromo

**Problema:** verificar se uma string é um palíndromo, ignorando espaços, pontuação e maiúsculas.

**Conceito central:** sanitização de string com regex e comparação com o reverso.

Passos da solução:
1. Remove tudo que não é letra ou número com `/[^a-zA-Z0-9]/g`
2. Converte para minúsculas
3. Compara a string com ela mesma invertida

---

### `debounce.js` — Debounce

**Problema:** implementar uma função que só executa após o usuário parar de chamar ela por um determinado tempo.

**Conceito central:** controle de frequência por atraso.

Cada vez que a função retornada é chamada, o timer anterior é cancelado e um novo é criado. A função original só é executada quando o timer completa sem ser interrompido.

**Uso real:** campo de busca que só dispara a requisição quando o usuário para de digitar.

```
chamada → reinicia timer (300ms)
chamada → reinicia timer (300ms)
chamada → reinicia timer (300ms)
... silêncio por 300ms ...
→ função executa (só uma vez)
```

---

### `throttle.js` — Throttle

**Problema:** implementar uma função que executa no máximo uma vez a cada intervalo de tempo, independente de quantas vezes for chamada.

**Conceito central:** controle de frequência por limite.

Diferente do debounce, o throttle garante que a função execute imediatamente na primeira chamada, e depois ignora chamadas subsequentes até o intervalo expirar.

**Uso real:** evento de scroll ou resize que não deve disparar centenas de vezes por segundo.

```
chamada → executa  ─┐
chamada → ignorada  │ (dentro de 500ms)
chamada → ignorada  │
chamada → executa  ─┘ (após 500ms)
```

**Debounce vs Throttle:**

| | Debounce | Throttle |
|---|---|---|
| Executa quando? | Após parar de chamar | Em intervalos regulares |
| Ideal para | Campo de busca, validação de form | Scroll, resize, drag |

---

### `deepClone.js` — Clonagem Profunda

**Problema:** clonar um objeto de forma profunda sem usar `JSON.stringify/parse`.

**Conceito central:** recursão e tratamento de casos especiais.

`JSON.stringify` tem limitações: não preserva `Date`, `RegExp`, `undefined`, funções, e não lida com referências circulares.

A implementação neste arquivo:
- Trata `null` e primitivos como caso base
- Preserva `Date` e `RegExp`
- Usa `WeakMap` para detectar e lidar com referências circulares
- Funciona com objetos e arrays aninhados

---

### `removeDuplicate.js` — Remover Duplicatas de Array de Objetos

**Problema:** remover objetos duplicados de um array com base em uma propriedade.

**Conceito central:** múltiplas abordagens para o mesmo problema.

O arquivo apresenta três implementações:

1. **`Map`:** a mais eficiente (O(n)). Itera uma vez e usa o valor da propriedade como chave — duplicatas sobrescrevem a entrada anterior.
2. **`filter` + `findIndex`:** mais legível, mas O(n²) pois usa `findIndex` dentro do `filter`.
3. **`reduce`:** acumula em um array verificando se o item já existe com `some`.

---

### `promisePool.js` — Pool de Promises com Concorrência Limitada

**Problema:** executar um conjunto de tarefas assíncronas com um limite máximo de execuções simultâneas.

**Conceito central:** controle de concorrência com `Promise.race`.

Executar todas as promises de uma vez pode sobrecarregar uma API ou esgotar recursos. O pool mantém um conjunto (`Set`) de promises em andamento e usa `Promise.race` para aguardar a primeira que terminar antes de adicionar uma nova.

```
Tarefas: [A, B, C, D, E], concorrência: 2

Início: [A, B] em execução
B termina → [A, C] em execução
A termina → [C, D] em execução
...
```

---

## Conceitos fundamentais

### Complexidade de tempo (Big O)

Indica como o tempo de execução cresce conforme o tamanho da entrada aumenta.

| Notação | Nome | Exemplo |
|---|---|---|
| O(1) | Constante | Acesso a elemento de array por índice |
| O(log n) | Logarítmica | Busca binária |
| O(n) | Linear | Percorrer um array |
| O(n²) | Quadrática | Dois loops aninhados |
| O(2ⁿ) | Exponencial | Fibonacci recursivo ingênuo |

### HashMap / Map

Estrutura de dados que armazena pares chave-valor com acesso em O(1). Em JavaScript, use `Map` para chaves de qualquer tipo ou objetos literais `{}` para chaves string.

### Recursão

Função que chama a si mesma com uma entrada menor até atingir um caso base. Requer sempre um caso de parada para evitar loop infinito.

### Closures

Funções que "capturam" variáveis do escopo onde foram criadas. Base para debounce e throttle: a função retornada mantém acesso ao `timeoutId` ou `lastCall` mesmo após a função externa ter retornado.

---
