import React from 'react'
import Responsive from 'react-responsive'

const PHONE_MAX = 767
const TABLET_MIN = 768
const TABLET_MAX = 991
const DESKTOP_MIN = 992

const Desktop = props => <Responsive {...props} minWidth={DESKTOP_MIN} />
const Tablet = props => (
	<Responsive {...props} minWidth={TABLET_MIN} maxWidth={TABLET_MAX} />
)
const Phone = props => <Responsive {...props} maxWidth={PHONE_MAX} />

export { Desktop, Tablet, Phone }
