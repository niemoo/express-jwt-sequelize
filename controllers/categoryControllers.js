const response = require('../config/response');
const { Category } = require('../models');

const categories = {
  getAllCategoriesData: async (req, res) => {
    try {
      const categories = await Category.findAll();

      response(200, categories, 'Success Get All Categories Data', res);
    } catch (err) {
      response(400, err, err.message, res);
    }
  },

  getDetailCategoriesData: async (req, res) => {
    try {
      const { id } = req.params;

      const categories = await Category.findByPk(id);

      response(200, categories, 'Success get Detail Categories Data', res);
    } catch (err) {
      response(400, err, err.message, res);
    }
  },

  addCategoriesData: async (req, res) => {
    try {
      let { name, description } = req.body;

      const categories = await Category.create({
        name,
        description,
      });

      response(200, categories, 'Success Add Categories Data', res);
    } catch (err) {
      response(400, err, err.message, res);
    }
  },

  updateCategoriesData: async (req, res) => {
    try {
      let { name, description } = req.body;
    } catch (err) {
      response(400, err, err.message, res);
    }
  },
};

module.exports = categories;
