import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import teamMemberInfo from './team-member-info'

const TeamHeadshots = ({ classes }) => (
	<div className={classes.flex}>
		{teamMemberInfo.map(teamMember => {
			return (
				<div key={teamMember.name} className={classes.flex}>
					<img
						className={classes.headshot}
						src={teamMember.imageSource}
						alt={teamMember.name}
					/>
					<Spacer width="16px" />
				</div>
			)
		})}
	</div>
)

const styles = {
	flex: {
		display: 'flex',
		'justify-content': 'center',
	},
	headshot: {
		height: '240px',
		width: '240px',
	},
}

export default injectSheet(styles)(TeamHeadshots)
