# Attendance Register Server

## SAAD Group 2

- Alice Chambers
- Nathan Hall
- Silvia Horoba
- Alex Hornsby
- Adam Edmunds

## Launch Server

#### 1 - Enter server sub-folder

- `cd /server`

#### 2 - Add ENV file

- Copy the file `.env.local.template` and rename it to `.env.local`
- Then fill in empty fields

#### 3 - Start server side

- `npm run start`

- Default port is 3001

## Development Tools

### To start postgres contaier

#### 1 - Enter dev-tools folder

- `cd server/dev-tools`
- or
- `cd dev-tools`

#### 2 - Start docker-compose

- `docker-compose up -d`

- Data will then persist between sesssions in `server/dev-tools/postgres-data`
- Remove `postgres-data` folder to reset db
