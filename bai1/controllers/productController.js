import { productModel } from "../models/Product.js";

const getProducts = (req, res) => {
  const products = productModel.getAll();

  return res.status(200).json({
    success: true,
    data: products,
  });
};

const createProduct = (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin: name, price, quantity",
    });
  }

  const newProduct = productModel.create({ name, price, quantity });
  return res.status(201).json({
    success: true,
    data: newProduct,
  });
};

export { getProducts, createProduct };
