const { Cart, CartItem, Product } = require('../models/cart');

const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ where: { userId: userId } });
    const product = await Product.findByPk(productId);
    const totalPrice = product.preco * quantity;

    let cartItem = await CartItem.findOne({
      where: {
        CartId: cart.id,
        ProductId: product.id
      }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalPrice += totalPrice;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        CartId: cart.id,
        ProductId: product.id,
        quantity: quantity,
        totalPrice: totalPrice
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ where: { userId: userId } });

    const cartItem = await CartItem.findOne({
      where: {
        CartId: cart.id,
        ProductId: productId
      }
    });

    if (cartItem) {
      await cartItem.destroy();
      res.status(204).json({ message: 'Product removed from cart' });
    } else {
      throw new Error('Product not found in cart');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({
      where: { userId: userId },
      include: [
        {
          model: Product,
          through: {
            attributes: ['quantity', 'totalPrice']
          }
        }
      ]
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  getCartItems
};
