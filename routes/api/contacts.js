const express = require('express');
const { joiSchema } = require('../../model/contact');
const { Contact } = require('../../model/index');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, '_id name email phone favorite');
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json(contact);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404;
    }
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId);

    if (!deletedContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'missing fields',
    });
  }

  try {
    const updateItem = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!updateItem) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json(updateItem);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404;
    }
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (req.body.favorite.toString().length === 0) {
      return res.status(400).json({
        message: 'missing field favorite',
      });
    }

    const updateItem = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    );

    if (!updateItem) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json(updateItem);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404;
    }
    next(error);
  }
});

module.exports = router;
