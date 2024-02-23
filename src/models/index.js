const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
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