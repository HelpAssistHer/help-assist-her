import React from 'react'
import Responsive from 'react-responsive'

const PHONE_MIN = 320
const PHONE_MAX = 439
const BIG_PHONE_MIN = 440
const BIG_PHONE_MAX = 699
const TABLET_MIN = 700
const TABLET_MAX = 1099
const DESKTOP_MIN = 1100

const Desktop = props => <Responsive {...props} minWidth={DESKTOP_MIN} />

const Tablet = props => (
	<Responsive {...props} minWidth={TABLET_MIN} maxWidth={TABLET_MAX} />
)

const BigPhone = props => (
	<Responsive {...props} minWidth={BIG_PHONE_MIN} maxWidth={BIG_PHONE_MAX} />
)

const Phone = props => (
	<Responsive {...props} minWidth={PHONE_MIN} maxWidth={PHONE_MAX} />
)

export { Desktop, Tablet, BigPhone, Phone }
