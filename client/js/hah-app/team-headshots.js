import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'

const TeamHeadshots = ({ classes }) => (
	<div>
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
		<Spacer width="16px" />
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
		<img className={classes.headshot} src="../img/team/karen.png" alt="Karen" />
	</div>
)

const styles = {
	headshot: {
		height: '240px',
		width: '240px',
	},
}

export default injectSheet(styles)(TeamHeadshots)
