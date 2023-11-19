const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../schemas/schemas');

//          GET

router.get('/', ctrl.getAll);

//          GET ID

router.get('/:contactId', isValidId, ctrl.getContactById);

//         POST
router.post('/', validateBody(addSchema), ctrl.add);

// DELETE

router.delete('/:contactId', isValidId, ctrl.deleteContact);

//             PUT

router.put(
  '/:contactId',
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);

//             PATCH

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
