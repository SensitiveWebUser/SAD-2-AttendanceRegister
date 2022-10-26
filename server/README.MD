# Attendance Register Server
## SAAD Group 2

- Alice Chambers
- Nathan Hall
- Silvia Horoba
- Alex Hornsby
- Adam Edmunds

### Launch Server

- `cd /server`

- Copy the file `.env.local.template` and rename it to `.env.local`
- Add your Mongo URI and a JWT key

- `mongod --dbpath=./data --nojournal`
 
- `npm run start`