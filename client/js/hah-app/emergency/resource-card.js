import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import { Phone, Desktop } from '../../components/breakpoints'

const ResourceCard = ({ classes }) => (
	<div className={classes.background}>Card</div>
)

const styles = {
	background: {
		'background-color': 'rgba(93,93,93,0.08)',
	},
}

export default injectSheet(styles)(ResourceCard)
