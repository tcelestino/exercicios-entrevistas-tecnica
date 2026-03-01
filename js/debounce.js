// Implementa debounce
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce((q) => console.log("Buscar", q), 300);
debouncedSearch("Hola");

//Conceito: executa apenas após o usuário parar de chamar
