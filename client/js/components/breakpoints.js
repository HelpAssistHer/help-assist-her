import React from 'react'
import Responsive from 'react-responsive'

const PHONE_MIN_BREAKPOINT = 320
const PHONE_MAX_BREAKPOINT = 439
const BIG_PHONE_MIN_BREAKPOINT = 440
const BIG_PHONE_MAX_BREAKPOINT = 699
const TABLET_MIN_BREAKPOINT = 700
const TABLET_MAX_BREAKPOINT = 1099
const DESKTOP_MIN_BREAKPOINT = 1100

const Desktop = props => (
	<Responsive {...props} minWidth={DESKTOP_MIN_BREAKPOINT} />
)

const Tablet = props => (
	<Responsive
		{...props}
		minWidth={TABLET_MIN_BREAKPOINT}
		maxWidth={TABLET_MAX_BREAKPOINT}
	/>
)

const BigPhone = props => (
	<Responsive
		{...props}
		minWidth={BIG_PHONE_MIN_BREAKPOINT}
		maxWidth={BIG_PHONE_MAX_BREAKPOINT}
	/>
)

const Phone = props => (
	<Responsive
		{...props}
		minWidth={PHONE_MIN_BREAKPOINT}
		maxWidth={PHONE_MAX_BREAKPOINT}
	/>
)

export {
	Desktop,
	Tablet,
	BigPhone,
	Phone,
	DESKTOP_MIN_BREAKPOINT,
	TABLET_MIN_BREAKPOINT,
	BIG_PHONE_MIN_BREAKPOINT,
	PHONE_MIN_BREAKPOINT,
}
