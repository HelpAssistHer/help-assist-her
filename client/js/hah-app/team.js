import React, { Component } from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Imgix from 'react-imgix'

import Spacer from '../components/spacer'
import teamMemberInfo from './team-member-info'
import TeamMember from './team-member'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

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
		const settings = {
			slidesToShow: 5,
			infinite: true,
			centerMode: true,
			afterChange: idx => {
				this.setState({ teamMemberId: idx })
			},
			swipeToSlide: true,
			touchMove: true,
			swipe: true,
			focusOnSelect: true,
			draggable: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						centerPadding: '25px',
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '25px',
					},
				},
			],
		}
		return (
			<div>
				{/*  <div className={classes.scrollContainer}> */}
				{/* <div className={classes.teamMemberContainer}> */}
				<Slider {...settings}>
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
				</Slider>
				{/* </div> */}
				{/* </div> */}

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
		overflow: 'scroll',
	},
	teamMemberContainer: {
		display: 'flex',
	},
	imageAndButtonContainer: {
		display: 'flex !important',
		justifyContent: 'center !important',
	},
	headshotSize: {
		height: '240px',
		width: '240px',
	},
	headshotNotClicked: {
		border: '3px solid #FFFFFF',
		'&:hover': {
			border: '3px solid #3D65F9',
		},
	},
	headshotClicked: {
		border: '3px solid #3D65F9',
	},
	button: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		'background-color': '#FFFFFF', // for Safari
	},
}

export default injectSheet(styles)(Team)
