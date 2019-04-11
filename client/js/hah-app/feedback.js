import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import LogoAndNavigation from '../mini-app/logo-and-navigation'
import Footer from '../mini-app/components/footer'

const Feedback = () => (
	<div>
		<LogoAndNavigation />
		<ReactTypeformEmbed
			url="https://helpassisther.typeform.com/to/pUhArd"
			style={{ position: 'unset', height: '500px' }}
		/>
		<Footer />
	</div>
)

export default Feedback
