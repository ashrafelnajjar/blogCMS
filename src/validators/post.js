const Joi = require("joi");
const objectId = require("../middlewares/objectId");

const createPostSchema = {
  body: Joi.object().keys({
    title: Joi.string().trim().required().max(100).min(3),
    content: Joi.string().trim().required().min(5),
  }),
};

const updatePostSchema = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim().min(3).max(100),
      content: Joi.string().trim().min(10),
    })
    .min(1),
};
const deleteORgetORtoggleLikePostSchema = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
module.exports = {
  createPostSchema,
  deleteORgetORtoggleLikePostSchema,
  updatePostSchema,
};
