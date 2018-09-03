import React, { Component } from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'
import { connect } from 'react-redux'

class HeaderSuccess extends Component {
	constructor(props) {
		super(props)
		this.state = {
			closed: false,
		}
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidUpdate() {
		if (this.props.submitStatus == 'Pending' && this.state.closed) {
			this.setState({
				closed: false,
			})
		}
	}

	handleClick(e) {
		e.preventDefault()
		this.setState({
			closed: true,
		})
	}

	render() {
		const { classes, submitStatus } = this.props
		const modalClasses = cx(
			classes.root,
			submitStatus == 'Failed' && classes.error,
			this.state.closed && classes.closed,
		)

		if (submitStatus == 'Success') {
			return (
				<div className={modalClasses}>
					<div>
						<h2>Information Submitted Successfully</h2>
						<p>
							Thanks for helping us bring better healthcare to women's
							fingertips!
						</p>
					</div>
					<div className={classes.button} onClick={this.handleClick}>
						&times;
					</div>
				</div>
			)
		}
		if (submitStatus == 'Failed') {
			return (
				<div className={modalClasses}>
					<div>
						<h2>Whoops!</h2>
						<p>An error occurred and the HAH staff has been notified.</p>
					</div>
					<div className={classes.button} onClick={this.handleClick}>
						&times;
					</div>
				</div>
			)
		}
		return null
	}
}

const styles = {
	root: {
		height: '246px',
		color: '#FFFFFF',
		display: 'flex',
		background: '#ee6298',
		'text-align': 'left',
		'justify-content': 'center',
		'align-items': 'center',
		'font-size': '30px',
		'font-weight': 'bold',
		'letter-spacing': '1.18px',
		'line-height': '27px',
		'font-family': 'Century Gothic, sans-serif !important',
		'padding-left': '10px',
		transition: ['height'],
		transitionDuration: '2s',
		'animation-name': 'closing-animation',
		'animation-duration': '2s',
		'animation-fill-mode': 'forwards',
		'animation-delay': '10s',
		'animation-play-state': 'running',
	},
	error: {
		background: 'black',
	},
	button: {
		padding: '10px',
		'align-self': 'flex-start',
	},
	'@keyframes closing-animation': {
		from: { height: '246px' },
		to: { height: '0px' },
	},
	closed: {
		height: '0px',
		'animation-name': 'closing-animation',
		'animation-play-state': 'paused',
	},
}

const HeaderConnected = connect(state => ({
	id: state.resource._id,
	submitStatus: state.localState.form_status,
}))(HeaderSuccess)

export default injectSheet(styles)(HeaderConnected)
