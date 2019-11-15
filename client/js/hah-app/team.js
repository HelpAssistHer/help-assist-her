import React, { Component } from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import teamMemberInfo from './team-member-info'
import TeamMember from './team-member'

class Team extends Component {
	constructor(props) {
		super(props)
		this.state = {
			teamMemberId: 0,
		}
	}

	render() {
		const { classes } = this.props
		const { teamMemberId } = this.state
		const { name, title, bio } = teamMemberInfo[teamMemberId]

		return (
			<div>
				<div className={classes.scrollContainer}>
					<div className={classes.teamMemberContainer}>
						{teamMemberInfo.map(teamMember => {
							return (
								<div
									key={teamMember.id}
									className={classes.imageAndButtonContainer}
								>
									<button
										className={classes.button}
										onClick={() => {
											this.handleClick(teamMember.id)
										}}
									>
										<img
											className={classes.headshot}
											src={teamMember.imageSource}
											alt={teamMember.name}
										/>
										<Spacer width="16px" />
									</button>
								</div>
							)
						})}
					</div>
				</div>

				<TeamMember name={name} title={title} bio={bio} />
			</div>
		)
	}

	handleClick(teamMemberId) {
		this.setState({
			teamMemberId,
		})
	}
}

const styles = {
	scrollContainer: {
		overflow: 'auto',
	},
	teamMemberContainer: {
		display: 'flex',
	},
	imageAndButtonContainer: {
		display: 'flex',
		'justify-content': 'center',
	},
	headshot: {
		height: '240px',
		width: '240px',
		border: '2px solid #FFFFFF',
		'&:hover': {
			border: '2px solid #24A894',
		},
	},
	button: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		'background-color': '#FFFFFF', // for Safari
		// '-webkit-tap-highlight-color': 'transparent', // for Safari
	},
}

export default injectSheet(styles)(Team)
