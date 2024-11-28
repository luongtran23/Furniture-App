const Product = require('../models/Products')


module.exports = {

  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate(
        [
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Fail to search for products"+ error.message);
    }
  },
     createProduct: async(req, res) => {
        const newProduct = new Product(req.body);
        try {
             await newProduct.save();
             res.status(200).json("Product created successfully")
        } catch (error) {
            res.status(500).json("fail to create the product")
        }
     },

     getAllProduct: async(req, res) => {
        try {
            const products = await Product.find().sort({createAt: -1})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json("fail to create the product")
        }
     },

     getProduct: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("fail to create the product")
        }
     },

}