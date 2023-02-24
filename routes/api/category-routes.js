const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getAll = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(getAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getOneCategory = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!getOneCategory) {
      res.status(404).json({ message: 'catergory found' });
      return;
    }
    res.status(200).json(getOneCategory);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    console.log(req.body)
    const createCategory = await Category.create(req.body);
    res.status(201).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'Category ID not found!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'Category ID not found!' });
      return;
    } res.status(200).json(deleteCategory);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
