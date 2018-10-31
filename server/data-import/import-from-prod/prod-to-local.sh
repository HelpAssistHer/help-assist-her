mongodump -h ds119873-a0.mlab.com:19873 -d hah-prod -u hah_prod_backup -p $HAH_PROD_BACKUP_PASSWORD -o tmp
mongorestore -h localhost -d hah-local  --drop tmp/hah-prod
rm -rf tmp/hah-prod
rm -rf tmp
