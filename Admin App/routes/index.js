var controllers = require('../controllers');

module.exports = function (app) {
  app.post('/create/item', controllers.createRecipe);
  app.get('/item/:id',controllers.getRecipeById);
  app.get('/item/:category/all',controllers.getRecipeByCategory);
  app.delete('/item/:id',controllers.deleteRecipeById);
  app.put('/item/update/:id',controllers.updateRecipeById);
};
