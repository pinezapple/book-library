const joi = require('joi');

module.exports = {
  bodySchemaForPatchLikeBook: joi.object({
    isLike: joi.boolean().required(),
  }),
  paramSchemaForBookById: joi.object({
    id: joi.number().integer().positive().optional(),
  }),
  queryParamSchemaForAuthor: joi.object({
    author: joi.string().optional(),
  }),
};
