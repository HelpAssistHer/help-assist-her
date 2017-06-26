import React from 'react'
import injectSheet from 'react-jss'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'


import LoginButton from '../authentication/facebook-login-button/view'

const Header = ({ classes }) => (
	<div className={classes.header}>
		{/*<ul>*/}
			{/*<li><Link to="/">Home</Link></li>*/}
			{/*<li><Link to="/verification">Verification Portal</Link></li>*/}
		{/*</ul>*/}
		<div className={classes.authenticationButtonDiv}>

			<LoginButton />
		</div>
		<img className={classes.logo} src='img/logo-white.png' />
	</div>
)



const styles = {
	header: {
		'background-image': 'linear-gradient(-90deg, #F0649A 0%, #FCC582 100%)',
		height: '200px',
		position: 'relative',
	},
	logo: {
		'max-height': '100%',
		'max-width': '100%',
		width: 'auto',
		height: 'auto',
		position: 'absolute',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		margin: 'auto',
	},
	authenticationButtonDiv: {
		padding: '10px',
		position: 'absolute',
		top: '30px',
		right: '30px'
	},
}

export default injectSheet(styles)(Header)
