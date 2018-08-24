export const chcInputResource = [
	{
		name: 'nameOfCHC',
		placeholder: 'Name of Community Health Center',
		verify: 'verifiedData.nameOfCHC.verified',
	},
	[
		{
			name: 'addressLine1',
			placeholder: 'Address 1',
			verify: 'verifiedData.address.verified',
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
		verify: 'verifiedData.phoneNumber.verified',
	},
	{
		name: 'email',
		placeholder: 'Email',
		verify: 'verifiedData.email.verified',
	},
	{
		name: 'website',
		placeholder: 'Website',
		verify: 'verifiedData.website.verified',
	},
]
