import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
	render() {
		const resource = this.props.resource
		const prcName = resource.prcName
		const coordinates = _.get(resource, 'address.location.coordinates')

		if (!coordinates) {
			return null
		}

		return (
			<Map
				google={this.props.google}
				initialCenter={{lat: coordinates[1], lng: coordinates[0]}}
				zoom={20}
			>
				<Marker
					title={prcName}
					position={{lat: coordinates[1], lng: coordinates[0]}}
				/>
			</Map>
		)
	}
}

export default connect()(GoogleApiWrapper({
	apiKey: 'AIzaSyCGWmo2kYWWm0fCsI3oLXJpqBC9Ub1fSkM',
})(MapContainer))
