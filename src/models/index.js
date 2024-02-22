const Category = require("./Category");
const Product = require("./Product");
const user = require("./User");

Product.belongsTo(Category) // product -> categoryId
Category.hasMany(Product)

