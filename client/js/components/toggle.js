import React from 'react'
import injectSheet from 'react-jss'

const Toggle = ({ classes, toggle, onClick }) => (
	<div
		className={classes.toggle}
		onClick={onClick}
		style={{ color: toggle ? '#F48271' : '#D8D8D8' }}
	>
		<input type="checkbox" className={classes.toggleSwitch} value={toggle} />
		<label className={classes.toggleLabel}>
			<span
				className={classes.toggleButton}
				style={{ transform: toggle ? 'translateX(70%)' : '' }}
			/>
		</label>
	</div>
)

const styles = {
	toggle: props => ({
		display: 'flex',
		flex: '0 0 100%',
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'all .3s',
	}),
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
}

export default injectSheet(styles)(Toggle)
