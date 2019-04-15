import React from 'react'
import injectSheet from 'react-jss'
import { Desktop } from '../components/breakpoints'

const AdditionalServiceCard = ({ classes, service }) => {
	const { title, description } = service

	return (
		<div>
			<Desktop>
				<div>
					<div className={classes.titleText}>{title}</div>
					<div className={classes.descriptionText}>{description}</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	titleText: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '28px',
	},
	descriptionText: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '16px',
		'line-height': '21px',
	},
}

export default injectSheet(styles)(AdditionalServiceCard)
