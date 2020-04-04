import { useField } from 'formik'
import React from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'

const ToggleFormik = ({ classes, ...props }) => {
	// eslint-disable-next-line no-unused-vars
	const [field, meta, helpers] = useField({ ...props, type: 'checkbox' })
	const { setValue, setTouched } = helpers

	const buttonClasses = cx(
		classes.toggleButton,
		field.value && classes.toggleMove,
	)

	const activeClasses = cx(classes.toggle, field.value && classes.toggleActive)

	return (
		<div
			className={activeClasses}
			onClick={() => {
				setTouched(true)
				setValue(!field.value)
			}}
		>
			<input
				type="checkbox"
				className={classes.toggleSwitch}
				checked={field.value}
				{...field}
				{...props}
			/>
			<label>
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

export default injectSheet(styles)(ToggleFormik)
