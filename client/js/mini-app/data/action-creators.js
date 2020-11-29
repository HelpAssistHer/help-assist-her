import {
	GET_PREGNANCY_RESOURCE_CENTERS,
	GET_COMMUNITY_HEALTH_CENTERS,
} from './action-types'

function getPregnancyResourceCentersAction(pregnancyResourceCenters) {
	return {
		type: GET_PREGNANCY_RESOURCE_CENTERS,
		pregnancyResourceCenters,
	}
}

function getChcsAction(chcs) {
	return {
		type: GET_COMMUNITY_HEALTH_CENTERS,
		communityHealthCenters: chcs,
	}
}

export const addPrcsToRedux = (prcs) => {
	return function (dispatch) {
		dispatch(getPregnancyResourceCentersAction(prcs))
	}
}

export const addChcsToRedux = (chcs) => {
	return function (dispatch) {
		dispatch(getChcsAction(chcs))
	}
}
