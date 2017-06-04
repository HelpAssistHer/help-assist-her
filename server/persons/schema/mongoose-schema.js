'use strict'

const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
})

PersonSchema.methods.getDisplayName = () => {
	return `${this.firstName} ${this.lastName}`
}

const PersonModel = mongoose.model('Persons', PersonSchema)

module.exports = PersonModel
