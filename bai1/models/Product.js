let products = [
  { id: 1, name: "Bàn phím", price: 120000, quantity: 15 },
  { id: 2, name: "Chuột", price: 150000, quantity: 20 },
  { id: 3, name: "Quần áo", price: 200000, quantity: 30 },
];

const length = products.length;

export const productModel = {
  getAll: () => {
    return products;
  },

  create: (data) => {
    const currentId = length + 1;

    const newProduct = {
      id: currentId,
      name: data.name,
      price: +data.price,
      quantity: +data.quantity,
    };

    products.push(newProduct);
    return newProduct;
  },

  findById: (id) => {
    return products.find((product) => product.id === +id);
  },
};
