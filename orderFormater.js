exports.formatOrder = function (order) {
  const { products } = order;

  const productList = products.map(product =>
    `${product.name} x${product.quantity}`
  ).join('\n    ');

  const finalOrder = `
  Customer info:
    Name: ${order.customerName}
    Address: ${order.customerAddress}
    City: ${order.customerCity}
    Postal code: ${order.customerPostalCode}
    Province: ${order.customerProvince}
    Country: ${order.customerCountry}
    Email: ${order.customerEmail}

  Products ordered:
    ${productList}
  Total price: ${order.total}`;

  return finalOrder;
}
