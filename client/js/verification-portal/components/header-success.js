import React, { Component } from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'
import { connect } from 'react-redux'
import {
	hasSubmitSucceeded,
	hasSubmitFailed,
	getFormValues,
	isSubmitting,
} from 'redux-form'

class HeaderSuccess extends Component {
	constructor(props) {
		super(props)
		this.state = {
			closed: false,
		}
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.id != this.props.id && this.state.closed) {
			this.setState({
				closed: false,
			})
		}
		console.log('prevprops', prevProps)
		console.log('currprops', this.props)
	}

	handleClick(e) {
		e.preventDefault()
		this.setState({
			closed: true,
		})
	}

	render() {
		let header
		const { classes, submitSucceeded, submitFailed } = this.props
		const modalClasses = cx(
			classes.root,
			submitFailed && classes.error,
			this.state.closed && classes.closed,
		)

		if (submitSucceeded) {
			header = (
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
		} else if (submitFailed) {
			header = (
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
		} else {
			header = null
		}

		return <div>{header}</div>
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
	},
	error: {
		background: 'black',
	},
	button: {
		padding: '10px',
		'align-self': 'flex-start',
	},
	closed: {
		height: '0px',
	},
	'@keyframes closing-animation': {
		from: { height: '246px' },
		to: { height: '0px' },
	},
}

const HeaderConnected = connect(state => ({
	submitSucceeded: hasSubmitSucceeded('verificationPortal')(state),
	submitFailed: hasSubmitFailed('verificationPortal')(state),
	id: state.resource._id,
}))(HeaderSuccess)

export default injectSheet(styles)(HeaderConnected)
