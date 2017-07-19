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
			print(headers)


#  SCHEMA
# const pointSchemaJoi = Joi.object().keys({
# 	_id: Joi.string(),
# 	type: Joi.string().valid('Point').required(),
# 	coordinates: Joi.array().ordered(
# 		Joi.number().max(-66).min(-128).required(), // general continental US longitude parameters
# 		Joi.number().min(23).max(50).required() 	// general continental US latitude parameters, to keep
# 													// from accidentally switching lat, lng
# 	).min(2).max(2)
# })

# const addressSchemaJoi = Joi.object().keys({
# 	_id: Joi.string(),
# 	city: Joi.string(),
# 	googlePlaceId: Joi.string(), // we can store the google place ID according to TOS
# 	line1: Joi.string(),
# 	line2: Joi.string(),
# 	location: pointSchemaJoi,
# 	state: Joi.string(),
# 	zip: Joi.string(),
# })

# const dayHoursSchemaJoi = Joi.object().keys({
# 	open: Joi.number().min(0).max(2359), // corresponds to 00:00 to 23:59 24-hour hhmm format.
# 	close: Joi.number().min(0).max(2359) // corresponds to 00:00 to 23:59 24-hour hhmm format.
# })

# // key: a number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday.
# // values: an object with 'open' and 'close' keys with values of a time of day in 24-hour hhmm format.
# // Values are in the range 0000–2359. The time will be reported in the place’s time zone
# // as much as possible, we are matching Google's Business hours https://developers.google.com/places/web-service/details

# const hoursSchemaJoi = Joi.object().keys({ // day of the week with 0 being Sunday.
# 	0: Joi.array().items(dayHoursSchemaJoi),
# 	1: Joi.array().items(dayHoursSchemaJoi),
# 	2: Joi.array().items(dayHoursSchemaJoi),
# 	3: Joi.array().items(dayHoursSchemaJoi),
# 	4: Joi.array().items(dayHoursSchemaJoi),
# 	5: Joi.array().items(dayHoursSchemaJoi),
# 	6: Joi.array().items(dayHoursSchemaJoi)
# })

# const dateUserActionSchemaJoi = Joi.object().keys({
# 	date: Joi.date().iso(),
# 	userId: Joi.string()
# })

# const pregnancyCenterSchemaJoi = Joi.object().keys({
# 	__v: Joi.number().min(0),
# 	_id: Joi.string(),
# 	address: addressSchemaJoi,
# 	createdAt: Joi.date().iso(),
# 	hours: hoursSchemaJoi,
# 	prcName: Joi.string(),
# 	notes: Joi.string(),
# 	phone: phoneValidator.phone().validate(),
# 	primaryContactPerson: personSchemaJoi,
# 	services: {
# 		pregnancyTest: Joi.boolean(),
# 		ultrasound: Joi.boolean(),
# 		materialAssistance: Joi.boolean(),
# 		postAbortionHealing: Joi.boolean(),
# 		parentingClasses: Joi.boolean(),
# 		stdTesting: Joi.boolean(),
# 		professionalCounseling: Joi.boolean(),
# 		other: Joi.boolean()
# 	},
# 	verified: {
# 		address: dateUserActionSchemaJoi,
# 		hours: dateUserActionSchemaJoi,
# 		prcName: dateUserActionSchemaJoi,
# 		phone: dateUserActionSchemaJoi,
# 		primaryContact: dateUserActionSchemaJoi,
# 		services: dateUserActionSchemaJoi,
# 		website: dateUserActionSchemaJoi
# 	},
# 	updated: {
# 		address: dateUserActionSchemaJoi,
# 		hours: dateUserActionSchemaJoi,
# 		name: dateUserActionSchemaJoi,
# 		notes: dateUserActionSchemaJoi,
# 		phone: dateUserActionSchemaJoi,
# 		primaryContact: dateUserActionSchemaJoi,
# 		services: dateUserActionSchemaJoi,
# 		website: dateUserActionSchemaJoi
# 	},
# 	updatedAt: Joi.date().iso(),
# 	website: Joi.string()
# })

			valid_services = {
				'Medical Quality Pregnancy Test':'pregnancyTest',
				'Ultrasound':'ultrasound',
				'Material Assistance':'materialAssistance',
				'Post-Abortion Healing':'postAbortionHealing',
				'Parenting Classes':'parentingClasses',
				'STD Testing':'stdTesting',
				'Counseling':'professionalCounseling',
				#'other'
			}
							
			data = []
			for row in importfilereader:
				#print(row)
				
				services = {}
				for i in range(11, 18):
					if row[i] == 'Yes':
						services[valid_services[headers[i]]] = True
				dateVerifiedSplit = row[26].split("/")
				if len(dateVerifiedSplit) == 3:
					dateVerified = datetime(month=int(dateVerifiedSplit[0]),day=int(dateVerifiedSplit[1]),year=int('20'+dateVerifiedSplit[2])).isoformat()
					dateVerifiedObj = {
						'date': dateVerified
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
						return []
					else:
						rawopentime, rawclosetime = openclose.split('-')
						opentime = processTime(rawopentime)
						closetime = processTime(rawclosetime, close=True)
					return [{ 'open': opentime, 'close': closetime}]


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
					pregnancyCenter['email'] = row[8]
			
				if len(services) > 0:
					pregnancyCenter['services'] = services

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
					pregnancyCenter['verified']['prcName'] = dateVerifiedObj

				if row[5] == 'Yes': # phone
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['phone'] = dateVerifiedObj

				if row[7] == 'Yes': #website
					if 'verified' not in pregnancyCenter:
						pregnancyCenter['verified'] = {}
					pregnancyCenter['verified']['website'] = dateVerifiedObj

				# if row[9] == 'Yes': #website
				# 	if 'verified' not in pregnancyCenter:
				# 		pregnancyCenter['verified'] = {}
				# 	pregnancyCenter['verified']['email'] = dateVerifiedObj

				data.append(pregnancyCenter)
			json.dump(data, outfile)

