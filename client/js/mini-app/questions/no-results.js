import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import Button from '../components/button'
import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'

const noResultsMessage = 'No results match your search.'
const buttonText = 'Return to Search'

const NoResults = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.noResultsPhone}>
				{noResultsMessage}
				<Spacer height="20px" />
				<Link to="/mini-app">
					<Button buttonText={buttonText} />
				</Link>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.noResultsPhone}>
				{noResultsMessage}
				<Spacer height="20px" />
				<Link to="/mini-app">
					<Button buttonText={buttonText} />
				</Link>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.noResultsDesktop}>
				{noResultsMessage}
				<Link to="/mini-app">
					<Button buttonText={buttonText} />
				</Link>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.noResultsDesktop}>
				{noResultsMessage}
				<Link to="/mini-app">
					<Button buttonText={buttonText} />
				</Link>
			</div>
		</Desktop>
	</div>
)

const styles = {
	noResultsPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '23px',
		'letter-spacing': '0.25px',
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		padding: '24px',
	},
	noResultsDesktop: {
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '33px',
		'line-height': '34px',
		border: '3px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		padding: '41px 80px 41px 80px',
	},
}

export default injectSheet(styles)(NoResults)
