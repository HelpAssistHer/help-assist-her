import React from 'react'
import Responsive from 'react-responsive'

const PHONE_MIN = 320
const PHONE_MAX = 767
const TABLET_MIN = 768
const TABLET_MAX = 1023
const DESKTOP_MIN = 1024

const Desktop = props => <Responsive {...props} minWidth={DESKTOP_MIN} />

const Tablet = props => (
	<Responsive {...props} minWidth={TABLET_MIN} maxWidth={TABLET_MAX} />
)

const Phone = props => (
	<Responsive {...props} minWidth={PHONE_MIN} maxWidth={PHONE_MAX} />
)

export { Desktop, Tablet, Phone }
