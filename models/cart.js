'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'carts',
    timestamps: false
  });

  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'cart_items',
    timestamps: false
  });

  Cart.associate = (models) => {
    Cart.belongsToMany(models.Product, { through: CartItem });
  };

  return { Cart, CartItem };
};
