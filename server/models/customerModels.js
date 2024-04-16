const express =require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

   phone_no:{
        type: String,
        required: true
    },

    comments:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now()
    },

    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('customerModel', customerSchema);