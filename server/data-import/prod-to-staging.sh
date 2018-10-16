echo "$HAH_PROD_BACKUP" | mongodump -h ds119873-a0.mlab.com:19873 -d hah-prod -u hah_prod_backup -o tmp
mongorestore -h ds143539.mlab.com:43539 -d hah-stage -u hah_stage_restore -p $HAH_STAGE_RESTORE --drop tmp/hah-prod
mongorestore -h ds143559.mlab.com:43559 -d hah-dev -u hah_dev_restore -p $HAH_DEV_RESTORE --drop tmp/hah-prod
rm -rf tmp/hah-prod

