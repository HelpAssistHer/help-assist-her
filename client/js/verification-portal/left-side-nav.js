import React from 'react'
import injectSheet from 'react-jss'

import LogoutButton from '../../authentication/logout-button'
import GetResourceToVerifyButton from './get-resource-to-verify-button'

class LeftSideNav extends React.Component {
	render() {
		const { classes, changeFieldValue } = this.props

		return (
			<div className={classes.leftHandSideNav}>
				<div className={classes.topSideBar}>
					<div className={classes.informationDatabase}>
						Information Database
					</div>
				</div>
				<div className={classes.middleSideBar}>
					Admin Profile Info
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
				</div>
				<div className={classes.bottomSideBar}>
					<LogoutButton />
				</div>
			</div>
		)
	}
}

const styles = {
	leftHandSideNav: {
		height: '1023.52px',
		display: 'flex',
		'flex-direction': 'column',
	},
	topSideBar: {
		height: '244.52px',
		width: '339px',
		'background-color': '#000000',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
	informationDatabase: {
		color: '#FFFFFF',
		'background-color': 'black',
		'font-size': '42px',
		'font-weight': 'bold',
		'letter-spacing': '1.57px',
		'line-height': '47px',
		'padding-top': '109px',
		'padding-left': '35.1px',
	},
	middleSideBar: {
		height: '698px',
		'background-color': '#FFFFFF',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
	bottomSideBar: {
		height: '81.45px',
		'background-color': '#000000',
		'box-shadow': '0 3px 6px 0 rgba(0,0,0,0.5)',
	},
}

export default injectSheet(styles)(LeftSideNav)
