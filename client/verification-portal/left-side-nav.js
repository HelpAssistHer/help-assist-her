import React from 'react'
import injectSheet from 'react-jss'

import LogoutButton from './authentication/logout-button'
import GetResourceToVerifyButton from './components/get-resource-to-verify-button'

const LeftSideNav = ({ classes, changeFieldValue }) => {
	return (
		<div className={classes.leftSideNav}>
			<div className={classes.header}>
				<div className={classes.informationDatabase}>Information Database</div>
			</div>
			<div className={classes.profile}>
				<div className={classes.getResourceToVerifyButton}>
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
				</div>
			</div>
			<div className={classes.footer}>
				<LogoutButton />
			</div>
		</div>
	)
}

const styles = {
	leftSideNav: {
		height: '1023.52px',
		display: 'flex',
		'flex-direction': 'column',
	},
	header: {
		height: '244.52px',
		'background-color': '#000000',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
	informationDatabase: {
		color: '#FFFFFF',
		'background-color': 'black',
		'font-size': '42px',
		'font-weight': 'bold',
		'font-family': 'sans-serif',
		'letter-spacing': '1.57px',
		'line-height': '47px',
		'padding-top': '109px',
		'padding-left': '35.1px',
	},
	profile: {
		height: '698px',
		'background-color': '#FFFFFF',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
	getResourceToVerifyButton: {
		'padding-top': '533.68px',
		'padding-left': '30px',
	},
	footer: {
		height: '81.45px',
		'background-color': '#000000',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
}

export default injectSheet(styles)(LeftSideNav)
