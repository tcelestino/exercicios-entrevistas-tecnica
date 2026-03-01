// Implementa throttle

function throttle(func, limit) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

const throttleFn = throttle(() => console.log("Scroll"), 500);

throttleFn();

//Conceito: executa no máximo 1x por intervalo. Limita frequencia máxima
