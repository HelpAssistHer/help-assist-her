import React, { Component } from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Imgix from 'react-imgix'

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

		const notClickedStyle = classNames(
			classes.headshotSize,
			classes.headshotNotClicked,
		)
		const clickedStyle = classNames(
			classes.headshotSize,
			classes.headshotClicked,
		)

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
										<Imgix
											className={
												teamMemberId === teamMember.id
													? clickedStyle
													: notClickedStyle
											}
											src={teamMember.imageSource}
											alt={teamMember.name}
											width={240}
											height={240}
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
	headshotSize: {
		height: '240px',
		width: '240px',
	},
	headshotNotClicked: {
		border: '2px solid #FFFFFF',
		'&:hover': {
			border: '2px solid #24A894',
		},
	},
	headshotClicked: {
		border: '2px solid #24A894',
	},
	button: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		'background-color': '#FFFFFF', // for Safari
	},
}

export default injectSheet(styles)(Team)
