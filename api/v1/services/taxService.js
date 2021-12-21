'use strict'

const dbStoreHandler = require('../../dbstore/mongo')

const saveTax = async (data) => {
    const { result, hasError } = await dbStoreHandler.saveTax(data)
    if (hasError) {
      return { status: "ERROR_FOUND" }
    }
    return { result, status: "TAX_SAVED" }
  }

  const taxService = {
    saveTax
  }
  
  module.exports = taxService
  