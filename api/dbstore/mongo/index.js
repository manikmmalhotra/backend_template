'use strict'

const mongoose = require('mongoose')
const uuidv4 = require('uuid').v4;
const appSettings = require('../../../config')
const {
  Tax
} = require('./schemas')
const log = console.log;
const mongoDB = appSettings.mongoDb

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const saveTax = async (body) => {
  let hasError = false;
  body.updatedAt = +(new Date())
  
  const result = await Tax.schema.findOneAndUpdate({id:body.id || uuidv4()}, { $set: body }, { upsert: true }, (error, doc) => {
    if (error) {
      hasError = error
    }
  });
  
  return {result:result.toJSON(), hasError }
}



const dbStoreHandler = {
  saveTax
}

module.exports = dbStoreHandler