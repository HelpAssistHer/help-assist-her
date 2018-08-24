import { normalizePhone, normalizeZipcode } from './util'

export const chcInputResource = [
	{
		name: 'nameOfCHC',
		placeholder: 'Name of Community Health Center',
		verify: 'verifiedData.nameOfCHC.verified',
		spacer: '55px',
	},
	[
		{
			name: 'addressLine1',
			placeholder: 'Address 1',
			verify: 'verifiedData.address.verified',
			spacer: '64px',
		},
		{
			name: 'addressLine2',
			placeholder: 'Address 2',
		},
		{
			name: 'city',
			placeholder: 'City',
			customInputStyle: 'leftHalfInputField',
		},
		{
			name: 'state',
			placeholder: 'State',
			customInputStyle: 'rightHalfInputField',
		},
		{
			name: 'zipCode',
			placeholder: 'Zip Code',
			normalize: normalizeZipcode,
			customInputStyle: 'leftHalfInputField',
		},
	],
	{
		name: 'phoneNumber',
		placeholder: 'Phone Number',
		verify: 'verifiedData.phoneNumber.verified',
		spacer: '66px',
		normalize: normalizePhone,
	},
	{
		name: 'email',
		placeholder: 'Email',
		verify: 'verifiedData.email.verified',
		type: 'email',
	},
	{
		name: 'website',
		placeholder: 'Website',
		verify: 'verifiedData.website.verified',
	},
]
