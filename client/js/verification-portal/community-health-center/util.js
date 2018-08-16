export const normalizePhone = input => {
	input = input.replace(/\D/g, '')
	input = input.substring(0, 10)
	let size = input.length
	switch (size) {
		case size == 0:
			return input
		case size < 4:
			return (input = '(' + input)
		case size < 7:
			return (input =
				'(' + input.substring(0, 3) + ') ' + input.substring(3, 6))
		case size <= 10:
			return (input =
				'(' +
				input.substring(0, 3) +
				') ' +
				input.substring(3, 6) +
				' - ' +
				input.substring(6, 10))
		default:
			return size > 0
				? '(' +
						input.substring(0, 3) +
						') ' +
						input.substring(3, 6) +
						' - ' +
						input.substring(6, 10)
				: input
	}
	return input
}
