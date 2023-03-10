const router = require('express').Router();
const { handleGet, handlePatchBookLike, handleGetBookByID } = require('../../controllers');
const { generateValidationMiddleware } = require('../../middlewares/validation');
const { bodySchemaForPatchLikeBook, paramSchemaForBookById, queryParamSchemaForAuthor } = require('../../schemas/book');

router.get(
  '/',
  generateValidationMiddleware(queryParamSchemaForAuthor, 'query'),
  handleGet,
);

router.get(
  '/:id',
  generateValidationMiddleware(paramSchemaForBookById, 'params'),
  handleGetBookByID,
);

router.patch(
  '/:id',
  generateValidationMiddleware(paramSchemaForBookById, 'params'),
  generateValidationMiddleware(bodySchemaForPatchLikeBook, 'body'),
  handlePatchBookLike,
);

module.exports = router;
