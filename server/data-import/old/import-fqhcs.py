import csv
import json
from datetime import datetime
import re

# #,Site Name,Site Telephone Number,Site URL,Site Address,Site City,Site State ,Site ZIP Code,Clinic Type,Classification 1

def processPhone(number):
    number = number.replace('(', '')
    number = number.replace(')', '')
    number = number.replace('-', '')
    number = number[:10]
    number = '+1'+number
    print(number)
    return number

def isNotEmptyAfterStrip(data):
    data = data.strip()
    if data:
        return data
    return False

with open('fqhcs.csv', 'rU') as importfile:
	with open('fqhcs_bad.csv', 'wb') as noimportcsvfile: # This is the data that couldn't be imported
		with open('fixtures/fqhcs.json', 'w') as outfile: # this is the data we will import as a json
			noimportwriter = csv.writer(noimportcsvfile)
			importfilereader = csv.reader(importfile)
			headers = next(importfilereader)

			data = []
			for row in importfilereader:
				fqhc = {}
				fqhcName = isNotEmptyAfterStrip(row[1])
				phone = isNotEmptyAfterStrip(row[2])
				website = isNotEmptyAfterStrip(row[3])
				classification = isNotEmptyAfterStrip('{} {}'.format(row[8], row[9]))
				line1 = isNotEmptyAfterStrip(row[4])
				city = isNotEmptyAfterStrip(row[5])
				state = isNotEmptyAfterStrip(row[6])
				zip = isNotEmptyAfterStrip(row[7])
				if fqhcName:
				    fqhc['fqhcName'] = fqhcName
				if phone:
				    fqhc['phone'] = processPhone(phone)
				if website:
				    fqhc['website']: website
				if classification:
				    fqhc['classification']: classification
				if line1 or city or state or zip:
				    address = {}
				    if line1:
				        address['line1'] = line1
				    if city:
				        address['city'] = city
				    if state:
				        address['state'] = state
				    if zip:
				        address['zip'] = zip
				    fqhc['address'] = address

				data.append(fqhc)
			json.dump(data, outfile)

