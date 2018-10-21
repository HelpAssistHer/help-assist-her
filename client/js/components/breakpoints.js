import React from 'react'
import MediaQuery from 'react-responsive'

const breakpoints = {
	desktop: '(min-width: 1025px)',
	tablet: '(min-width: 768px) and (max-width: 1024px)',
	phone: '(max-width: 767px)',
}

const Breakpoint = props => {
	const breakpoint = breakpoints[props.name] || breakpoints.phone
	console.log('BREAKPOINT PROP', breakpoint)

	return (
		<MediaQuery {...props} minWidth={700}>
			{props.children}
		</MediaQuery>
	)
}

export function DesktopBreakpoint(props) {
	console.log('DESKTOP BREAKPOINT')
	return <Breakpoint name="desktop">{props.children}</Breakpoint>
}
//
// import Responsive from 'react-responsive';
//
// const Desktop = props => <Responsive {...props} minWidth={992} />;
// const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
// const Mobile = props => <Responsive {...props} maxWidth={767} />;
// const Default = props => <Responsive {...props} minWidth={768} />;
//
// const Example = () => (
// 	<div>
// 		<Desktop>Desktop or laptop</Desktop>
// 		<Tablet>Tablet</Tablet>
// 		<Mobile>Mobile</Mobile>
// 		<Default>Not mobile (desktop or laptop or tablet)</Default>
// 	</div>
// );
//
// export default Example;
