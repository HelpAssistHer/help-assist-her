mongodump -h ds119873-a0.mlab.com:19873 -d hah-prod -u hah_prod_backup -p $HAH_PROD_BACKUP_PASSWORD -o tmp
mongorestore -h ds143559.mlab.com:43559 -d hah-dev -u hah_dev_restore -p $HAH_DEV_RESTORE_PASSWORD --drop tmp/hah-prod
rm -rf tmp/hah-prod
rm -rf tmp

