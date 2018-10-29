import React from 'react'

export default function GlobeIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={100}
			height={100}
			viewBox="0 0 100 100"
			{...props}
		>
			<g>
				<g
					transform="translate(50 50) scale(0.69 0.69) rotate(0) translate(-50 -50)"
					style={{ fill: '#000000' }}
				>
					<svg
						fill="#000000"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						version="1.1"
						x="0px"
						y="0px"
						viewBox="0 0 52 52"
						style={{ enableBackground: 'new 0 0 52 52' }}
						xmlSpace="preserve"
					>
						<style
							type="text/css"
							dangerouslySetInnerHTML={{
								__html:
									'\n\t.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st1{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st2{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}\n\t.st3{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:10.6982,5.3491;}\n\t.st4{fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}\n\t.st5{fill:none;stroke:#000000;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}\n',
							}}
						/>
						<g>
							<circle className="st0" cx={26} cy={26} r={23} />
							<ellipse className="st0" cx={26} cy={26} rx={12} ry={23} />
							<line className="st0" x1={26} y1={3} x2={26} y2={49} />
							<line className="st0" x1="45.6" y1={14} x2="6.4" y2={14} />
							<line className="st0" x1={49} y1={26} x2={3} y2={26} />
							<line className="st0" x1="45.6" y1={38} x2="6.4" y2={38} />
						</g>
					</svg>
				</g>
			</g>
		</svg>
	)
}
