import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import TeamMember from './team-member'

const Team = ({ classes }) => (
	<div>
		<TeamMember />
	</div>
)

const styles = {}

export default injectSheet(styles)(Team)
