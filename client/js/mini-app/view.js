import React from 'react'

import Header from './header'
import Questions from './questions'
import HomePageBanner from './home-page-banner'
import Footer from './components/footer'
import UnitedStatesMap from './united-states-map'

const MiniApp = () => (
	<div>
		<Header />
		<Questions />
		<HomePageBanner />
		<UnitedStatesMap />
		<Footer />
	</div>
)

export default MiniApp
