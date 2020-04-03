import validator from 'validator'

const validateEmail = email => {
	return validator.isEmail(email)
}

const validateZipCode = zipCode => {
	return validator.isPostalCode(zipCode, 'US')
}

const validate = ({
	chcName,
	addressLine1,
	city,
	state,
	zipCode,
	phoneNumber,
	email,
	website,
}) => {
	const errors = {}

	if (!validateZipCode(zipCode)) {
		errors.zipCode = 'Please enter a valid zip code'
	}

	if (email && !validateEmail(email)) {
		errors.email = 'Please enter a valid email address'
	}

	if (!chcName) {
		errors.chcName = 'Required'
	}

	if (!addressLine1) {
		errors.addressLine1 = 'Required'
	}

	if (!city) {
		errors.city = 'Required'
	}

	if (!state) {
		errors.state = 'Required'
	}

	if (!zipCode) {
		errors.zipCode = 'Required'
	}

	if (!phoneNumber) {
		errors.phoneNumber = 'Required'
	}

	if (!website) {
		errors.website = 'Required'
	}

	return errors
}

export default validate
