const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'userId, productId, and quantity are required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ cartItem: productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ cartItem: productId, quantity });
      }
    }

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const cart = await Cart.findOne({ userId }).populate('products.cartItem', 'title supplier imageUrl price');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId and productId are required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Lọc ra các sản phẩm không có productId trong mảng
    cart.products = cart.products.filter(
      (product) => product.cartItem.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const calculateTotalAmount = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const cart = await Cart.findOne({ userId });
    await cart.populate('products.cartItem', 'price quantity');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Calculate total amount
    const totalAmount = cart.products.reduce((sum, product) => {
      return sum + product.cartItem.price * product.quantity;
    }, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Do some cleanup or logging here if needed
  }
};

module.exports = { addToCart, viewCart, removeFromCart, calculateTotalAmount };
