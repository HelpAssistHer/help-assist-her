import csv
import json
from datetime import datetime
import re

with open('cessilye-nypc.csv', 'rU') as importfile:
	with open('cessilye_nypc_bad.csv', 'wb') as noimportcsvfile: # This is the data that couldn't be imported
		with open('test/fixtures/cessilye_nypc.json', 'w') as outfile: # this is the data we will import as a json
			noimportwriter = csv.writer(noimportcsvfile)
			importfilereader = csv.reader(importfile)
			headers = next(importfilereader)

			valid_services = {
				'Medical Quality Pregnancy Test':'medicalQualityPregnancyTest',
				'Ultrasound':'ultrasound',
				'Material Assistance':'materialAssistance',
				'Post-Abortion Healing':'postAbortionCounseling',
				'Parenting Classes':'parentingClasses',
				'STD Testing':'stdTesting',
				'Counseling':'licensedProfessionalCounseling',
				#'other'
			}

			data = []
			for row in importfilereader:

				services = {}
				for i in range(11, 18):
					if row[i] == 'Yes':
						services[valid_services[headers[i]]] = True
				dateVerifiedSplit = row[26].split("/")
				if len(dateVerifiedSplit) == 3:
					dateVerified = datetime(month=int(dateVerifiedSplit[0]),day=int(dateVerifiedSplit[1]),year=int('20'+dateVerifiedSplit[2])).isoformat()
					dateVerifiedObj = {
						'date': dateVerified,
						'verified': True
					}

				def processTime(rawtime, close=False):
					if ':' in rawtime:
						hour, minute = rawtime.split(':')
					else:
						hour = rawtime
						minute = '00'
					if close:
						hour = str(int(hour) + 12)
					if len(hour) == 1:
						hour = '0'+str(hour)
					return "{}{}".format(hour, minute)



				def processOpenClose(openclose):
					if openclose.lower().strip() == 'closed':
						return {'closedAllDay': True}
					else:
						rawopentime, rawclosetime = openclose.split('-')
						opentime = processTime(rawopentime)
						closetime = processTime(rawclosetime, close=True)
					return { 'open': opentime, 'close': closetime}


				hours = {}
				if row[18]: #monday
					hours[1] = processOpenClose(row[18])
				if row[19]: #tuesday
					hours[2] = processOpenClose(row[19])
				if row[20]: #wednesday
					hours[3] = processOpenClose(row[20])
				if row[21]: #thursday
					hours[4] = processOpenClose(row[21])
				if row[22]: #friday
					hours[5] = processOpenClose(row[22])
				if row[23]: #saturday
					hours[6] = processOpenClose(row[23])
				if row[24]: #sunday
					hours[0] = processOpenClose(row[24])


				pregnancyCenter = {}

				def processAddress(str_address):
					#print(str_address)
					try:
						line1, rest = str_address.strip().split('\n')
						city, state_zip = rest.split(',')
						state, zipcode = state_zip.strip().split(" ")
					except:
						return {
							'line1': str_address
						}

					return {
						'line1': line1.strip(),
						'city': city.strip(),
						'state': state.strip(),
						'zip': zipcode.strip()
					}

				if row[2]:
					pregnancyCenter['address'] = processAddress(row[2])

				if len(hours) > 0:
					pregnancyCenter['hours'] = hours

				if row[0]:
					pregnancyCenter['prcName'] = row[0]

				if row[25]:
					pregnancyCenter['notes'] = row[25]

				def processPhone(phone, prcName):
					phone = ''.join([s for s in phone if s.isdigit()])
					phone =  '+1' +str(phone)
					if len(phone) == 12:
						return phone
					else:
						print("phone number {} for {} could not convert to the right format".format(phone,prcName))
						return None

				if row[4] and row[0] and processPhone(row[4], row[0]) is not None:
					pregnancyCenter['phone'] = processPhone(row[4], row[0])

				if row[8]:
					pregnancyCenter['email'] = row[8].strip()

				if len(services) > 0:
					pregnancyCenter['services'] = services

				if row[6]:
					pregnancyCenter['website'] = row[6]

				if row[3] == 'Yes': # address
					if 'verifiedData' not in pregnancyCenter:
						pregnancyCenter['verifiedData'] = {}
					pregnancyCenter['verifiedData']['address'] = dateVerifiedObj

				if len(hours) > 0:
					if 'verifiedData' not in pregnancyCenter:
						pregnancyCenter['verifiedData'] = {}
					pregnancyCenter['verifiedData']['hours'] = dateVerifiedObj

				if row[1] == 'Yes': # name
					if 'verifiedData' not in pregnancyCenter:
						pregnancyCenter['verifiedData'] = {}
					pregnancyCenter['verifiedData']['prcName'] = dateVerifiedObj

				if row[5] == 'Yes': # phone
					if 'verifiedData' not in pregnancyCenter:
						pregnancyCenter['verifiedData'] = {}
					pregnancyCenter['verifiedData']['phone'] = dateVerifiedObj

				if row[7] == 'Yes': #website
					if 'verifiedData' not in pregnancyCenter:
						pregnancyCenter['verifiedData'] = {}
					pregnancyCenter['verifiedData']['website'] = dateVerifiedObj

				# if row[9] == 'Yes': #email
				# 	if 'verifiedData' not in pregnancyCenter:
				# 		pregnancyCenter['verifiedData'] = {}
				# 	pregnancyCenter['verifiedData']['email'] = dateVerifiedObj

				data.append(pregnancyCenter)
			json.dump(data, outfile)

