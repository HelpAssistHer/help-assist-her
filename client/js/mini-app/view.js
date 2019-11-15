import React from 'react'

import Header from './header'
import Questions from './questions'
import HomePageBanner from './home-page-banner'
import Footer from './components/footer'
import UnitedStatesMap from './united-states-map'
import { ScrollToTop } from '../components/scroll-to-top'

const MiniApp = () => (
	<div>
		<ScrollToTop />
		<Header />
		<Questions />
		<HomePageBanner />
		<UnitedStatesMap />
		<Footer />
	</div>
)

export default MiniApp
