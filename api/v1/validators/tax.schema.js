const { Joi } = require("celebrate");
const saveTaxSchema = Joi.object().keys({
    id: Joi.string().allow('').optional(),
    name: Joi.string().when('id', { is: null || '', then: Joi.string().required() , otherwise: Joi.string().allow('').optional()}),
    type: Joi.string().when('id', { is: null || '', then: Joi.string().required() , otherwise: Joi.string().allow('').optional()}),
    rate: Joi.string().when('id', { is: null || '', then: Joi.string().required() , otherwise: Joi.string().allow('').optional()}),
    description: Joi.string().when('id', { is: null || '', then: Joi.string().required() , otherwise: Joi.string().allow('').optional()}),
  })

  module.exports = {
    saveTaxSchema
  }
