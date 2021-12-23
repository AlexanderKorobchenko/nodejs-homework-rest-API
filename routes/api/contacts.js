const express = require('express');
const Joi = require('joi'); // библиотека для валидации
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model');

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json(contact);
  } catch (error) {
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
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await removeContact(contactId);

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
    const updateItem = await updateContact(contactId, req.body);

    if (!updateItem) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json(updateItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
