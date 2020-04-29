import { GET_PREGNANCY_RESOURCE_CENTERS } from './action-types'

function getPregnancyResourceCentersAction(pregnancyResourceCenters) {
	return {
		type: GET_PREGNANCY_RESOURCE_CENTERS,
		pregnancyResourceCenters,
	}
}

export const addPrcsToRedux = prcs => {
	return function(dispatch) {
		dispatch(getPregnancyResourceCentersAction(prcs))
	}
}
