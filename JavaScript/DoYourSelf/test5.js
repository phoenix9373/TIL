function sortByPriceAscending(jsonString) {
  // Your code goes here
  const stringValue = JSON.parse(jsonString);
  stringValue.sort(function (a, b) {
    if (a["price"] !== b["price"]) {
      return a["price"] - b["price"];
    } else {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
  });
  return JSON.stringify(stringValue);
}

console.log(
  sortByPriceAscending(
    '[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]'
  )
);
