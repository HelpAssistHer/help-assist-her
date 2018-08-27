export const normalizePhone = input => {
	const validNumber = input.replace(/\D/g, '').substring(0, 10)
	const size = validNumber.length
	const first3 = validNumber.substring(0, 3)
	const middle3 = validNumber.substring(3, 6)
	const last4 = validNumber.substring(6, 10)

	switch (size) {
		case size === 0:
			return validNumber
		case size < 4:
			return '(' + validNumber
		case size < 7:
			return '(' + first3 + ') ' + middle3
		case size <= 10:
			return '(' + first3 + ') ' + middle3 + ' - ' + last4
		default:
			return size > 0
				? '(' + first3 + ') ' + middle3 + ' - ' + last4
				: validNumber
	}
}

export const normalizeZipcode = input => {
	return input.replace(/\D/g, '').substring(0, 5)
}
