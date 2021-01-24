import { useEffect } from 'react'

export const ScrollToTop = () => {
	useEffect(() => {
		try {
			window.scroll({
				top: 0,
				left: 0,
			})
		} catch (error) {
			// Fallback for older browsers
			window.scrollTo(0, 0)
		}
	}, [])

	return null
}
