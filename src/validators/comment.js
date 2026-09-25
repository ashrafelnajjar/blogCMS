const Joi = require("joi");
const objectId = require("../middlewares/objectId");



const addCommentSchema = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().trim().min(10),
  }),
};
const deleteCommentSchema = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
const updateCommentSchema = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().trim().min(10),
  }),
};

module.exports = { addCommentSchema, deleteCommentSchema, updateCommentSchema };
