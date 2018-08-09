export const chcInputResource = [
	{
		name: 'nameOfCHC',
		placeholder: 'Name of Community Health Center',
		verify: {
			name: 'verifiedData.nameOfCHC.verified',
		},
	},
	[
		{
			name: 'addressLine1',
			placeholder: 'Address 1',
			verify: {
				name: 'verifiedData.address.verified',
			},
		},
		{
			name: 'addressLine2',
			placeholder: 'Address 2',
		},
		{
			name: 'city',
			placeholder: 'City',
		},
		{
			name: 'state',
			placeholder: 'State',
		},
		{
			name: 'zipCode',
			placeholder: 'Zip Code',
		},
	],
	{
		name: 'phoneNumber',
		placeholder: 'Phone Number',
		verify: {
			name: 'verifiedData.phoneNumber.verified',
		},
	},
	{
		name: 'email',
		placeholder: 'Email',
		verify: {
			name: 'verifiedData.email.verified',
		},
	},
	{
		name: 'website',
		placeholder: 'Website',
		verify: {
			name: 'verifiedData.website.verified',
		},
	},
]
