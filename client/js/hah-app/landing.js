import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import LoginButton from '../authentication/login-button'

class Landing extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.landing}>
				<Link to="/verification">Verification Portal</Link>
				<LoginButton />
			</div>
		)
	}
}
const styles = {
	landing: {
		margin: '0',
		height: '100%',
		width: '100%',
		'background-image': 'url("./img/background.png")',
		'background-position': 'center',
		'background-repeat': 'no-repeat',
		'background-size': 'cover',
	},
}
const LandingWithStyle = injectSheet(styles)(Landing)

export default connect()(LandingWithStyle)
