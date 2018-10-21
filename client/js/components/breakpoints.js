import React from 'react'
import MediaQuery from 'react-responsive'

const breakpoints = {
	desktop: '(min-width: 1025px)',
	tablet: '(min-width: 768px) and (max-width: 1024px)',
	phone: '(max-width: 767px)',
}

const Breakpoint = props => {
	return (
		<div>
			<div>Device Test!</div>
			<MediaQuery minDeviceWidth={1224}>
				<div>You are a desktop or laptop</div>
			</MediaQuery>
			<MediaQuery maxWidth={1224}>
				<div>You are sized like a tablet or mobile phone though</div>
			</MediaQuery>
			<MediaQuery minDeviceWidth={1824}>
				<div>You also have a huge screen</div>
			</MediaQuery>
			<MediaQuery maxDeviceWidth={1224}>
				<div>You are a tablet or mobile phone</div>
			</MediaQuery>
			<MediaQuery orientation="portrait">
				<div>You are portrait</div>
			</MediaQuery>
			<MediaQuery orientation="landscape">
				<div>You are landscape</div>
			</MediaQuery>
			<MediaQuery minResolution="2dppx">
				<div>You are retina</div>
			</MediaQuery>
		</div>
	)
}

export default Breakpoint

// export function DesktopBreakpoint(props) {
// 	console.log('DESKTOP BREAKPOINT')
// 	return <Breakpoint name="desktop">{props.children}</Breakpoint>
// }
