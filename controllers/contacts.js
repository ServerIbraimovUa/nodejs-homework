const { HttpError, ctrlWrapper } = require('../helpers');
const Contact = require('../models/contact');

//  get all contacts

const getAll = async (req, res) => {
  const contactList = await Contact.find({}, '-createdAt -updatedAt');

  res.json(contactList);
};

// get contact by id

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  // const contactById = await Contact.findOne({_id: contactId});
  const contactById = await Contact.findById(contactId);

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

//  Delete a contact

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removeContactById = await Contact.findOneAndDelete(contactId);
  //  Not found
  if (removeContactById === null) {
    throw HttpError(404, 'Not Found');
  }

  res.json({ message: 'contact deleted' });
};

// Update contact

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContactById = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updateContactById) {
    throw HttpError(404, 'Not Found');
  }
  res.json(updateContactById);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updateContactById = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
