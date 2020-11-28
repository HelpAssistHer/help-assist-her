import React from 'react'

import Header from './Header'
import Questions from './QuestionsSection'
import HomePageBanner from './HomePageBanner'
import Footer from './Footer'
import UnitedStatesMap from './UnitedStatesMap'
import { ScrollToTop } from './ScrollToTop'

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
