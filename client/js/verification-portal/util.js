export const formatPhoneNumber = digits => {
	if (!digits) {
		return ''
	}

	const phoneNumber = digits.substr(2, 10)
	const areaCode = phoneNumber.substring(0, 3)
	const prefix = phoneNumber.substring(3, 6)
	const lineNumber = phoneNumber.substring(6, 10)

	if (phoneNumber.length === 0) {
		return ''
	}

	if (phoneNumber.length < 3) {
		return phoneNumber
	}

	if (phoneNumber.length < 4) {
		return `(${areaCode})`
	}

	if (phoneNumber.length < 7) {
		return `(${areaCode})-${prefix}`
	}

	if (phoneNumber.length <= 10) {
		return `(${areaCode})-${prefix}-${lineNumber}`
	}

	throw new Error('Invalid Phone Number')
}

export const parsePhoneNumber = phoneNumber => {
	if (phoneNumber === '') {
		return ''
	}

	//replaces every part of phone number that's not a digit with an empty string
	return '+1' + phoneNumber.replace(/([\D])/g, '').substr(0, 10)
}

export const formatZipcode = input => {
	return input ? input.replace(/\D/g, '').substring(0, 5) : ''
}
