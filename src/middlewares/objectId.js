const mongoose = require('mongoose');

const objectId = (value, helpers) => {
  // Mongoose بتفحص هل القيمة تنفع تكون ObjectId صحيحة لـ MongoDB ولا لأ
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('معرّف (ID) غير صالح'); // رسالة الخطأ اللي هترجع للـ Client
  }
  return value; // لو القيمة سليمة، مررها لـ Joi كقيمة صحيحة
};
module.exports = objectId