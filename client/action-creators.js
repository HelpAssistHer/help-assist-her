import { GET_INITIAL_DATA, UPDATE_LOGIN_STATE } from './action-types'
import {
	authenticateUser,
	logoutUser,
} from './verification-portal/authentication/action-creators'

async function getInitialData() {
	const response = await fetch('/api/initial-data', {
		method: 'GET',
	})
	return await response.json()
}

export function createLoginAction(userDisplayName) {
	return {
		type: UPDATE_LOGIN_STATE,
		isLoggedIn: true,
		userDisplayName,
	}
}

export function createLogoutAction() {
	return {
		type: UPDATE_LOGIN_STATE,
		isLoggedIn: false,
	}
}

export const getInitialAppData = () => {
	return function (dispatch) {
		return getInitialData().then((initialData) =>
			dispatch({
				type: GET_INITIAL_DATA,
				initialData,
			}),
		)
	}
}

export const login = (accessToken) => {
	return function (dispatch) {
		return authenticateUser(accessToken).then((result) => {
			if (result) {
				dispatch(createLoginAction())
			}
		})
	}
}

export const logout = () => {
	return function (dispatch) {
		return logoutUser().then((result) => {
			if (result) {
				dispatch(createLogoutAction())
			}
		})
	}
}
