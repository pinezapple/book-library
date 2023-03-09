const router = require('express').Router();
const { handleGet, handlePatchBookLike, handleGetBookByID } = require('../../controllers');
const { generateValidationMiddleware } = require('../../middlewares/validation');
const { bodySchemaForPatchLikeBook } = require('../../schemas/book');

router.get(
  '/',
  handleGet,
);

router.get(
  '/:id',
  handleGetBookByID,
);

router.patch(
  '/:id',
  generateValidationMiddleware(bodySchemaForPatchLikeBook),
  handlePatchBookLike,
);

module.exports = router;
