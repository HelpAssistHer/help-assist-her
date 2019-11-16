import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const TeamMember = ({ classes, name, title, bio }) => (
	<div>
		<Phone>
			<div>
				<Spacer height="28px" />
				<div className={classes.gridContainerPhone}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextPhone}>
							{`${name} | ${title}`}
						</div>
						<Spacer height="14px" />
						<div className={classes.lineBreakPhone} />
						<Spacer height="14px" />
						<div className={classes.bioTextPhone}>{bio}</div>
					</div>
				</div>
			</div>
		</Phone>

		<BigPhone>
			<div>
				<Spacer height="28px" />
				<div className={classes.gridContainerPhone}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextPhone}>
							{`${name} | ${title}`}
						</div>
						<Spacer height="14px" />
						<div className={classes.lineBreakPhone} />
						<Spacer height="14px" />
						<div className={classes.bioTextPhone}>{bio}</div>
					</div>
				</div>
			</div>
		</BigPhone>

		<Tablet>
			<div>
				<Spacer height="89px" />
				<div className={classes.gridContainerDesktop}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextDesktop}>
							{`${name} | ${title}`}
						</div>
						<Spacer height="16px" />
						<div className={classes.lineBreakDesktop} />
						<Spacer height="16px" />
						<div className={classes.bioTextDesktop}>{bio}</div>
					</div>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div>
				<Spacer height="89px" />
				<div className={classes.gridContainerDesktop}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextDesktop}>
							{`${name} | ${title}`}
						</div>
						<Spacer height="16px" />
						<div className={classes.lineBreakDesktop} />
						<Spacer height="16px" />
						<div className={classes.bioTextDesktop}>{bio}</div>
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	gridContainerPhone: {
		display: 'grid',
		'grid-template-columns': '5% 90% 5%',
	},
	gridContainerDesktop: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	gridItem: {
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	nameAndTitleTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '16px',
		'line-height': '22px',
	},
	nameAndTitleTextDesktop: {
		color: '#000000',
		'font-family': 'hah-bold',
		'font-size': '16px',
		'line-height': '26px',
	},
	lineBreakPhone: {
		width: '35px',
		'border-top': '1px solid #24A894',
	},
	lineBreakDesktop: {
		width: '84px',
		'border-top': '3px solid #24A894',
	},
	bioTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '21px',
	},
	bioTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '16px',
		'line-height': '26px',
	},
}

export default injectSheet(styles)(TeamMember)
