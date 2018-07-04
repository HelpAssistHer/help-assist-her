import React from 'react'
import injectSheet from 'react-jss'
import ReactTooltip from 'react-tooltip'

import Spacer from '../../components/spacer'

const Tooltip = ({ classes, text, tooltipHeading, tooltipText }) => {
	return (
		<div>
			<a data-tip="Some text here">{text}</a>
			<ReactTooltip place="bottom" type="dark" effect="solid">
				<div className={classes.heading}>{tooltipHeading}</div>
				<Spacer height="8px" />
				<div className={classes.text}>{tooltipText}</div>
			</ReactTooltip>
		</div>
	)
}

const styles = {
	heading: {
		'font-family': 'sans-serif',
		'font-size': '16px',
		'line-height': '15px',
		'letter-spacing': '1px',
	},
	text: {
		'font-family': 'sans-serif',
		'font-size': '12px',
		'line-height': '15px',
		'font-weight': 'lighter',
		'letter-spacing': '1px',
	},
}

export default injectSheet(styles)(Tooltip)
