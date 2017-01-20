import csv
import json

with open('ny_pc.csv', 'rU') as importfile:
	with open('ny_pc_bad.csv', 'wb') as noimportcsvfile:
		with open('ny_pc.json', 'w') as outfile:
			noimportwriter = csv.writer(noimportcsvfile)
			importfilereader = csv.reader(importfile)
			next(importfilereader)

			data = []
			for row in importfilereader:
				for col in row:
					try:
						col.decode('utf-8')
					except UnicodeError:
						noimportwriter.writerow(row)
						break
				data.append({
					'name': row[0].replace("\n", " ") or "",
					'address': row[1].replace("\n", " ") or "",
					'phone': row[2].replace("\n", " ") or "",
					'website': row[3].replace("\n", " ") or ""
				})
			json.dump(data, outfile)

