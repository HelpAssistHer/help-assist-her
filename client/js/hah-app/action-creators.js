'use strict'

import { GET_INITIAL_DATA, LOGIN, LOGOUT } from './action-types'
import { authenticateUser, logoutUser } from '../authentication/action-creators'

async function getInitialData() {
	const response = await fetch('/api/initial-data', {
		method: 'GET',
	})
	return await response.json()
}

function createInitialDataAction(initialData) {
	return {
		type: GET_INITIAL_DATA,
		initialData,
	}
}

export function createLoginAction() {
	return {
		type: LOGIN
	}
}

export function createLogoutAction() {
	return {
		type: LOGOUT
	}
}

export const getInitialAppData = () => {
	return function(dispatch) {
		return getInitialData()
			.then(
				result => dispatch(createInitialDataAction(result))
			)
	}
}


export const login = (accessToken) => {
	return function(dispatch) {
		return authenticateUser(accessToken)
			.then(
				(result) => {
					console.log('result in login '+result)
					if (result) {
						dispatch(createLoginAction())
					}
						
				}
			)
	}
}

export const logout = () => {
	return function(dispatch) {
		return logoutUser()
			.then(
				(result) => {
					if (result) {
						dispatch(createLogoutAction())
					}

				}
			)
	}
}