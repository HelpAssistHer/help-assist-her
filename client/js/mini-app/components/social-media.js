import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import FacebookWhite from '../../components/icons/icon-components/facebook-white'
import TwitterWhite from '../../components/icons/icon-components/twitter-white'
import InstagramWhite from '../../components/icons/icon-components/instagram-white'

const HAH_FACEBOOK_URL = 'https://www.facebook.com/HelpAssistHer/'
const HAH_TWITTER_URL = 'https://twitter.com/helpassisther'
const HAH_INSTAGRAM_URL = 'https://www.instagram.com/helpassisther/'

const SocialMedia = ({ classes, iconSize, spacerWidth }) => (
	<div>
		<div className={classes.socialMedia}>
			<a href={HAH_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
				<FacebookWhite height={iconSize} width={iconSize} />
			</a>
			<Spacer width={spacerWidth} />
			<a href={HAH_TWITTER_URL} target="_blank" rel="noopener noreferrer">
				<TwitterWhite height={iconSize} width={iconSize} />
			</a>
			<Spacer width={spacerWidth} />
			<a href={HAH_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
				<InstagramWhite height={iconSize} width={iconSize} />
			</a>
		</div>
	</div>
)

const styles = {
	socialMedia: {
		display: 'flex',
	},
}

export default injectSheet(styles)(SocialMedia)
