// Implemente uma função que agrupe objetos de um array por uma propriedade
function groupBy(arr, prop) {
  return arr.reduce((acc, item) => {
    const key = item[prop];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

const category = [
  { id: 1, type: "A" },
  { id: 2, type: "B" },
  { id: 3, type: "A" },
  { id: 4, type: "C" },
];
const objectGroup = Object.groupBy(category, ({ type }) => type);
console.log("Usando reduce", groupBy(category, "type"));
console.log("Usando Object.groupBy", objectGroup);
