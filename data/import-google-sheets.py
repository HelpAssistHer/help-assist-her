import csv
import json
from datetime import datetime

with open('cessilye-nypc.csv', 'rU') as importfile:
	with open('cessilye_nypc_bad.csv', 'wb') as noimportcsvfile: # This is the data that couldn't be imported
		with open('cessilye_nypc.json', 'w') as outfile: # this is the data we will import as a json
			noimportwriter = csv.writer(noimportcsvfile)
			importfilereader = csv.reader(importfile)
			headers = next(importfilereader)
			print(headers)


# hours : {
#     "mon": {
#         "open": "9:00",
#             "close": "18:00"
#     },
#     "tue": {
#         "open": "9:00",
#             "close": "17:30"
#     },
#     "wed": {
#         "open": "9:00",
#             "close": "18:00"
#     },
#     "thurs": [
#         {
#             "open": "9:00",
#             "close": "12:00"
#         },
#         {
#             "open": "13:00",
#             "close": "18:00"
#         }
#     ]
# },

			data = []
			for row in importfilereader:
				print(row)
				
				resources = []
				for i in range(11, 18):
					if row[i] == 'Yes':
						resources.append(headers[i])

				dateVerifiedObj = {
					'date': row[26]
				}
				dateVerified = row[26]

				hours = {}
				if row[18]:
					hours["mon"] = row[18]
				if row[19]:
					hours["tue"] = row[19]
				if row[20]:
					hours["wed"] = row[20]
				if row[21]:
					hours["thurs"] = row[21]
				if row[22]:
					hours["fri"] = row[22]
				if row[23]:
					hours["sat"] = row[23]
				if row[24]:
					hours["sun"] = row[24]



				pregnancyCenter = {}

				if row[2]:
					pregnancyCenter['address'] = {
						'line1': row[2]
					}
				if len(hours) > 0:
					pregnancyCenter['hours'] = hours

				if row[0]:
					pregnancyCenter['name'] = row[0]

				if row[25]:
					pregnancyCenter['notes'] = row[25]

				if row[4]:
					pregnancyCenter['phone'] = row[4]

				if row[8]:
					pregnancyCenter['email'] = row[8]
			
				if len(resources) > 0:
					pregnancyCenter['resources'] = resources

				if row[6]:
					pregnancyCenter['website'] = row[6]


				if row[3] == 'Yes': # address
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['address'] = dateVerifiedObj

				if len(hours) > 0: 
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['hours'] = dateVerifiedObj

				if row[1] == 'Yes': # name
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['name'] = dateVerifiedObj

				if row[5] == 'Yes': # phone
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['phone'] = dateVerifiedObj

				if row[7] == 'Yes': #website
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['website'] = dateVerifiedObj

				if row[9] == 'Yes': #website
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['email'] = dateVerifiedObj

				data.append(pregnancyCenter)
			json.dump(data, outfile)

