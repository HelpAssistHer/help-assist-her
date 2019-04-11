import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import teamMemberInfo from './team-member-info'
import TeamMember from './team-member'

const Team = ({ classes }) => (
	<div>
		{teamMemberInfo.map(teamMember => {
			return (
				<TeamMember
					key={teamMember.name}
					name={teamMember.name}
					title={teamMember.title}
				/>
			)
		})}
	</div>
)

const styles = {}

export default injectSheet(styles)(Team)
