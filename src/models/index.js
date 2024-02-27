const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");
const user = require("./User");

Product.belongsTo(Category) // product -> categoryId
Category.hasMany(Product)

// cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

// cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

// Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

// Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)


ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)