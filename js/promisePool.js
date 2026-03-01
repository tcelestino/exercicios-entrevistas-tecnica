// Implementa uma fila de promise com concorrencia limitada
async function promisePool(tasks, concurrency) {
  const results = [];
  const exec = new Set();

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());

    results.push(p);

    const tracked = p.finally(() => exec.delete(tracked));
    exec.add(tracked);

    if (exec.size >= concurrency) {
      await Promise.race(exec).catch(() => {});
    }
  }

  return Promise.all(results);
}

const getData = async (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return console.log(await response.json());
};

const tasks = [
  async () =>
    await fetch("https://jsonplaceholder.typicode.com/todos/1").then(getData),
  async () =>
    await fetch("https://jsonplaceholder.typicode.com/todos/2").then(getData),
  async () =>
    await fetch("https://jsonplaceholder.typicode.com/todos/3").then(getData),
  async () =>
    await fetch("https://jsonplaceholder.typicode.com/todos/4").then(getData),
];

await promisePool(tasks, 4);

//Conceito: essencial para evitar sobrecarga em API's externas. usa Promise.race para liberar slot quando uma promise resolve.
