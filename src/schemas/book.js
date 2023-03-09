const joi = require('joi');

module.exports = {
  bodySchemaForPatchLikeBook: joi.object({
    isLike: joi.boolean().required(),
  }),
};
