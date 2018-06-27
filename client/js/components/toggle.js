import React from 'react'
import injectSheet from 'react-jss'

const Toggle = ({ classes, toggle, onClick }) => (
	<div className={classes.toggle} onClick={onClick}>
		<input type="checkbox" className={classes.toggleSwitch} value={toggle} />
		<label className={classes.toggleLabel}>
			<span className={classes.toggleButton} />
		</label>
	</div>
)

const styles = {
	toggle: ({ toggle }) => ({
		display: 'flex',
		flex: '0 0 100%',
		justifyContent: 'center',
		alignItems: 'center',
		color: toggle ? '#F48271' : '#D8D8D8',
		transition: 'all .3s',
	}),
	toggleSwitch: {
		height: 0,
		width: 0,
		visibility: 'hidden',
	},
	toggleLabel: {
		cursor: 'pointer',
		display: 'inline-block',
		height: '24px',
		width: '39px',
		backgroundColor: 'currentColor',
		borderRadius: '100px',
		position: 'relative',
	},
	toggleButton: ({ toggle }) => ({
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
		transform: toggle ? 'translateX(70%)' : '',
	}),
}

export default injectSheet(styles)(Toggle)
