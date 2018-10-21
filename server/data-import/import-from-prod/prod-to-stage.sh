mongodump -h ds119873-a0.mlab.com:19873 -d hah-prod -u hah_prod_backup -p $HAH_PROD_BACKUP_PASSWORD -o tmp
mongorestore -h ds143539.mlab.com:43539 -d hah-stage -u hah_stage_restore -p $HAH_STAGE_RESTORE_PASSWORD --drop tmp/hah-prod
rm -rf tmp/hah-prod
rm -rf tmp

