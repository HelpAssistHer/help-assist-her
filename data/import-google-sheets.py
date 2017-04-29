import csv
import json
from datetime import datetime
import re

with open('csv/Cessilye - New York Pregnancy Centers - Copy of New York.csv', 'rU') as importfile:
	with open('cessilye_nypc_bad.csv', 'wb') as noimportcsvfile: # This is the data that couldn't be imported
		with open('../test/fixtures/cessilye_nypc.json', 'w') as outfile: # this is the data we will import as a json
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
# 		Joi.number().min(23).max(50).required() // general continental US latitude parameters, to keep from accidently switching lat, lng
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

# const queryableDayHoursSchemaJoi = Joi.object().keys({
# 	open: Joi.number().min(0).max(60 * 60 * 24), // number of seconds since 00:00:00
# 	close: Joi.number().min(0).max(60 * 60 * 24) // number of seconds since 00:00:00
# })

# const queryableHoursSchemaJoi = Joi.object().keys({ // ISO day of the week with 1 being Monday and 7 being Sunday.
# 	1: Joi.array().items(queryableDayHoursSchemaJoi),
# 	2: Joi.array().items(queryableDayHoursSchemaJoi),
# 	3: Joi.array().items(queryableDayHoursSchemaJoi),
# 	4: Joi.array().items(queryableDayHoursSchemaJoi),
# 	5: Joi.array().items(queryableDayHoursSchemaJoi),
# 	6: Joi.array().items(queryableDayHoursSchemaJoi),
# 	7: Joi.array().items(queryableDayHoursSchemaJoi)
# })

# const readableDayHoursSchemaJoi = Joi.object().keys({
# 	open: Joi.string(),
# 	close: Joi.string()
# })

# const readableHoursSchemaJoi = Joi.object().keys({
# 	mon: Joi.array().items(readableDayHoursSchemaJoi),
# 	tue: Joi.array().items(readableDayHoursSchemaJoi),
# 	wed: Joi.array().items(readableDayHoursSchemaJoi),
# 	thurs: Joi.array().items(readableDayHoursSchemaJoi),
# 	fri: Joi.array().items(readableDayHoursSchemaJoi),
# 	sat: Joi.array().items(readableDayHoursSchemaJoi),
# 	sun: Joi.array().items(readableDayHoursSchemaJoi)
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
# 	dateCreated: Joi.date().iso(),
# 	email: Joi.string().email(),
# 	hours: readableHoursSchemaJoi,
# 	name: Joi.string(), // change to PRC name
# 	notes: Joi.string(),
# 	phone: phoneValidator.phone().validate(),
# 	primaryContact: Joi.string(),
# 	services: Joi.array().items(Joi.string().valid(
# 		'PREGNANCY_TEST',
# 		'ULTRASOUND',
# 		'MATERIAL_ASSISTANCE',
# 		'POST_ABORTION_HEALING',
# 		'PARENTING_CLASSES',
# 		'STD_TESTING',
# 		'COUNSELING'
# 	)),
# 	queryableHours: queryableHoursSchemaJoi,
# 	verified: {
# 		address: dateUserActionSchemaJoi,
# 		email: dateUserActionSchemaJoi,
# 		hours: dateUserActionSchemaJoi,
# 		name: dateUserActionSchemaJoi,
# 		notes: dateUserActionSchemaJoi,
# 		phone: dateUserActionSchemaJoi,
# 		primaryContact: dateUserActionSchemaJoi,
# 		services: dateUserActionSchemaJoi,
# 		website: dateUserActionSchemaJoi
# 	},
# 	updated: {
# 		address: dateUserActionSchemaJoi,
# 		email: dateUserActionSchemaJoi,
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
				'Medical Quality Pregnancy Test':'PREGNANCY_TEST',
				'Ultrasound':'ULTRASOUND',
				'Material Assistance':'MATERIAL_ASSISTANCE',
				'Post-Abortion Healing':'POST_ABORTION_HEALING',
				'Parenting Classes':'PARENTING_CLASSES',
				'STD Testing':'STD_TESTING',
				'Counseling':'COUNSELING'
			}

							
			data = []
			for row in importfilereader:
				print(row)
				
				services = []
				for i in range(11, 18):
					if row[i] == 'Yes':
						services.append(valid_services[headers[i]])
				dateVerifiedSplit = row[26].split("/")
				if len(dateVerifiedSplit) == 3:
					dateVerified = datetime(month=int(dateVerifiedSplit[0]),day=int(dateVerifiedSplit[1]),year=int('20'+dateVerifiedSplit[2])).isoformat()
					dateVerifiedObj = {
						'date': dateVerified
					}

				def processTime(rawtime):
					if len(rawtime) > 2:
						return rawtime
					if len(rawtime) == 1:
						rawtime = '0'+str(rawtime)
					return rawtime + '00'

				def processOpenClose(openclose):
					if openclose.lower().strip() == 'closed':
						return []
					else:
						rawopentime, rawclosetime = openclose.split('-')
						opentime = processTime(rawopentime)
						closetime = processTime(str(int(rawclosetime)+12))
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
					print(str_address)
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
					pregnancyCenter['name'] = row[0]

				if row[25]:
					pregnancyCenter['notes'] = row[25]

				def processPhone(phone):
					phone = ''.join([s for s in phone if s.isdigit()])
					phone =  '+1' +str(phone)
					if len(phone) == 12:
						return phone
					else:
						return None

				if row[4] and processPhone(row[4]) is not None:
					pregnancyCenter['phone'] = processPhone(row[4])

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

