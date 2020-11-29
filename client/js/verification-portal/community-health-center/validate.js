import validator from 'validator'
import googlePhoneNumber from 'google-libphonenumber'

const validateEmail = (email) => {
	return validator.isEmail(email)
}

const validateZipCode = (zipCode) => {
	return validator.isPostalCode(zipCode, 'US')
}

const validatePhoneNumber = (phoneNumber) => {
	try {
		const phoneUtil = googlePhoneNumber.PhoneNumberUtil.getInstance()
		const parsedPhoneNumber = phoneUtil.parse(phoneNumber, 'US')
		return phoneUtil.isValidNumber(parsedPhoneNumber)
	} catch (error) {
		return false
	}
}

const validateWebsite = (website) => {
	return validator.isURL(website, { require_protocol: true })
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
	chcNameVerified,
	addressVerified,
	phoneVerified,
	emailVerified,
	websiteVerified,
}) => {
	const errors = {}

	if (!validateZipCode(zipCode)) {
		errors.zipCode = 'Please enter a valid zip code'
	}

	if (!validatePhoneNumber(phoneNumber)) {
		errors.phoneNumber = 'Please enter a valid phone number'
	}

	if (email && !validateEmail(email)) {
		errors.email = 'Please enter a valid email address'
	}

	if (emailVerified && !email) {
		errors.email = 'Cannot verify a blank email address'
	}

	if (!validateWebsite(website)) {
		errors.website = 'Please enter a valid website'
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

	if (!chcNameVerified) {
		errors.chcNameVerified = 'Required'
	}

	if (!addressVerified) {
		errors.addressVerified = 'Required'
	}

	if (!phoneVerified) {
		errors.phoneVerified = 'Required'
	}

	if (!websiteVerified) {
		errors.websiteVerified = 'Required'
	}

	return errors
}

export default validate
