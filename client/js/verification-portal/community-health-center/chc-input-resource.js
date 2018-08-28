import { normalizePhone, normalizeZipcode } from './util'

export const chcInputResource = [
	{
		name: 'nameOfCHC',
		placeholder: 'Name of Community Health Center',
		verify: 'verifiedData.nameOfCHC.verified',
		styling: {
			spacer: '55px',
		},
	},
	[
		{
			name: 'addressLine1',
			placeholder: 'Address 1',
			verify: 'verifiedData.address.verified',
			styling: {
				spacer: '64px',
			},
		},
		{
			name: 'addressLine2',
			placeholder: 'Address 2',
			styling: {},
		},
		{
			name: 'city',
			placeholder: 'City',
			styling: {
				customInputStyle: 'leftHalfInputField',
			},
		},
		{
			name: 'state',
			placeholder: 'State',
			styling: {
				customInputStyle: 'rightHalfInputField',
			},
		},
		{
			name: 'zipCode',
			placeholder: 'Zip Code',
			normalize: normalizeZipcode,
			styling: {
				customInputStyle: 'leftHalfInputField',
			},
		},
	],
	{
		name: 'phoneNumber',
		placeholder: 'Phone Number',
		verify: 'verifiedData.phoneNumber.verified',
		styling: {
			normalize: normalizePhone,
			spacer: '66px',
			customInputStyle: 'leftHalfInputField',
		},
	},
	{
		name: 'email',
		placeholder: 'Email',
		verify: 'verifiedData.email.verified',
		type: 'email',
		styling: {
			customInputStyle: 'leftHalfInputField',
		},
	},
	{
		name: 'website',
		placeholder: 'Website',
		verify: 'verifiedData.website.verified',
		styling: {
			customInputStyle: 'leftHalfInputField',
		},
	},
]
