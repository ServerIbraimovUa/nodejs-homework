const { HttpError, ctrlWrapper } = require('../helpers');
const Contact = require('../models/contact');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string()
    .min(6)
    .email()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .required()
    .min(6)
    .messages({ 'any.required': 'missing required phone field' }),
});

//  get all contacts

const getAll = async (req, res) => {
  const contactList = await Contact.find();

  res.json(contactList);
};

// get contact by id

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await Contact.findOne(contactId);

  //  Not found
  if (contactById === null) {
    throw HttpError(404, 'Not Found');
  }

  res.json(contactById).status(200);
};

// add a new contact

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

// //  Delete a contact

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const removeContactById = await Contact.findOneAndDelete(contactId);
  //  Not found
  if (removeContactById === null) {
    throw HttpError(404, 'Not Found');
  }

  res.json({ message: 'contact deleted' });
};

// // Update contact

const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const updateContactById = await Contact.findByIdAndUpdate(
    contactId,
    req.body
  );
  if (!updateContactById) {
    throw HttpError(404, 'Not Found');
  }
  res.json(updateContactById);
};

module.exports = {
  getAll: ctrlWrapper(getAll),

  add: ctrlWrapper(add),
  getContactById: ctrlWrapper(getContactById),

  deleteContact: ctrlWrapper(deleteContact),

  updateContact: ctrlWrapper(updateContact),
};
