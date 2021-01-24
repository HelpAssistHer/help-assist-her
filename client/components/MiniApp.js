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
		{process.env.ENABLE_APP && <Questions />}
		<HomePageBanner />
		<UnitedStatesMap />
		<Footer />
	</div>
)

export default MiniApp
