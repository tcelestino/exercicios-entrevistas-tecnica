//Implemente uma função que verifique se uma string é um palíndromo

function isPalindrome(str) {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return cleanedStr === cleanedStr.split("").reverse().join("");
}
console.log(isPalindrome("A man, a plan, a canal, Panama!"));

// Conceito: santiza a string removendo espaços/pontuação e fazendo a comparação com o reverso
