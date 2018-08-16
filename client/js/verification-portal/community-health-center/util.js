export const normalizePhone = input => {
	const validNumber = input.replace(/\D/g, '').substring(0, 10)
	const size = validNumber.length
	switch (size) {
		case size == 0:
			return validNumber
		case size < 4:
			return '(' + validNumber
		case size < 7:
			return (
				'(' + validNumber.substring(0, 3) + ') ' + validNumber.substring(3, 6)
			)
		case size <= 10:
			return (
				'(' +
				validNumber.substring(0, 3) +
				') ' +
				validNumber.substring(3, 6) +
				' - ' +
				validNumber.substring(6, 10)
			)
		default:
			return size > 0
				? '(' +
						validNumber.substring(0, 3) +
						') ' +
						validNumber.substring(3, 6) +
						' - ' +
						validNumber.substring(6, 10)
				: validNumber
	}
	return validNumber
}

export const normalizeZipcode = input => {
	return input.replace(/\D/g, '').substring(0, 5)
}
