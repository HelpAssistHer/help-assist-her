export const formatPhone = input => {
	if (!input) return ''

	const validNumber = input.replace(/\D/g, '').substring(0, 11)
	const size = validNumber.length
	const first3 = validNumber.substring(1, 4)
	const middle3 = validNumber.substring(4, 7)
	const last4 = validNumber.substring(7, 11)

	switch (size) {
		case size === 0:
			return validNumber
		case size < 4:
			return '+1 (' + validNumber
		case size < 7:
			return '+1 (' + first3 + ') ' + middle3
		case size <= 10:
			return '+1 (' + first3 + ') ' + middle3 + ' - ' + last4
		default:
			return size > 0
				? '+1 (' + first3 + ') ' + middle3 + ' - ' + last4
				: validNumber
	}
}

export const formatZipcode = input => {
	return input ? input.replace(/\D/g, '').substring(0, 5) : ''
}
