const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {
  addSchema,
  updateFavoriteSchema,
  updateSchema,
} = require('../../schemas/contactSchema');

//          GET

router.get('/', authenticate, ctrl.getAll);

//          GET ID

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

//         POST
router.post('/', authenticate, validateBody(addSchema), ctrl.add);

// DELETE

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

//             PUT

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateContact
);

//             PATCH

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
