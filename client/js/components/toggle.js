import React from 'react'
import injectSheet from 'react-jss'
// import classNames from 'classnames/bind'
import cx from 'classnames'

const Toggle = ({ classes, toggle, onClick }) => {
	const buttonClasses = cx(classes.toggleButton, toggle && classes.toggleMove)
	const activeClasses = cx(classes.toggle, toggle && classes.toggleActive)

	return (
		<div className={activeClasses} onClick={onClick}>
			<input type="checkbox" className={classes.toggleSwitch} value={toggle} />
			<label className={classes.toggleLabel}>
				<span className={buttonClasses} />
			</label>
		</div>
	)
}

const styles = {
	toggleSwitch: {
		height: 0,
		width: 0,
		visibility: 'hidden',
	},
	toggle: {
		cursor: 'pointer',
		display: 'inline-block',
		height: '24px',
		width: '39px',
		color: '#D8D8D8',
		backgroundColor: 'currentColor',
		borderRadius: '100px',
		position: 'relative',
	},
	toggleButton: {
		position: 'absolute',
		top: '1px',
		left: '1px',
		boxSizing: 'border-box',
		width: '22px',
		height: '22px',
		backgroundColor: '#fff',
		border: '2px solid #fff',
		borderRadius: '100px',
		transition: 'all .3s',
	},
	toggleMove: {
		transform: 'translateX(70%)',
	},
	toggleActive: {
		color: '#F48271',
	},
}

export default injectSheet(styles)(Toggle)
