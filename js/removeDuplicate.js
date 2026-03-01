// remove chaves duplicadas em um array de objetos
function removeDuplicate(arr) {
  const map = new Map();

  arr.forEach((item) => {
    map.set(item.name, item);
  });

  return Array.from(map.values());
}

function removeDuplicateByFilter(arr) {
  return arr.filter((item, index, self) => {
    return self.findIndex((i) => i.name === item.name) === index;
  });
}

function removeDuplicateByReduce(arr) {
  return arr.reduce((acc, item) => {
    if (!acc.some((i) => i.name === item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

const list = [
  {
    name: "Jon",
  },
  {
    name: "maria",
  },
  {
    name: "maria",
  },
];
console.log(removeDuplicate(list));
console.log(removeDuplicateByFilter(list));
console.log(removeDuplicateByReduce(list));
