
const router = require('express').Router()
const { celebrate, Joi } = require("celebrate");
const { UNKNOWN_SERVER_ERROR } = require('./../../../constants/http-codes');
const ErrorHandler = require('../../utils/errorHandler')
const taxService = require('./../services/taxService')
const { MESSAGES } = require('../../../constants')
const { saveTaxSchema } = require('../validators/tax.schema')
const httpCode = require('http-status-codes');

const saveTax = async (req, res) => {
    try {
      const { status, result } = await taxService.saveTax(req.body)
      if (status === "TAX_SAVED") {
        res.sendSuccess(result, MESSAGES.api.SUCCESS, httpCode.OK)
      } else {
        res.sendError(UNKNOWN_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG)
      }
    } catch (ex) {
      ErrorHandler.extractError(ex)
      res.sendError(httpCode.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG)
    }
  }



  // Define all the user route here
router.put('/save', celebrate({
  body: saveTaxSchema
}), saveTax)

module.exports = router
