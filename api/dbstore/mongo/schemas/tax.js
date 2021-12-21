'use strict'

const mongoose = require('mongoose')
const { COLLECTIONS } = require('../../../../constants')

const taxSchema = new mongoose.Schema({
  name: String,
  type: Number, // 0 for Percent , 1 for fixed
  rate: Number,
  description : String
}, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    versionKey: false,
    strict: true,
    collection: COLLECTIONS.TAX
  })

//   taxSchema.post('find',(result,next)=>{
// console.log("------------------",result)
//     next();
//   });


module.exports = {
  schema: mongoose.model(COLLECTIONS.TAX, taxSchema)
}
