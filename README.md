# studywith-server
This project is the server part of StudyWith, providing people to make study meetings and share their study achievements.

## Prerequisites
### Node and npm
- node >= 18.15.x (LTS)
- npm >= 9.5.0

Download nodejs from [Here](https://nodejs.org/)

### MySQL
- mysql >= 8.0.0

## Installation
Clone this repository:
```sh
git clone https://github.com/conserveshin/studywith-server.git
```
Install nodejs package dependencies:
```sh
npm install
```

## Environment Variable Setup
Set the following environmental variables to use:

- `SERVER_PORT`= _Port where the server listens_
- `DB_HOST`= _Address where MySQL server listens_
- `DB_PORT`= _Port where MySQL server listens_
- `DB_USER`= _Username for connection to database_
- `DB_PASSWORD`=_Plain password for connection to database_
- `DB_DATABASE`=_Database for the connection_
- `DB_CONNECTION_LIMIT`=_Maximum number of connections in the pool_


## Usage
Running server foreground:
```
npm run start
```

Running server background and watching for changes:
```sh
npm run dev
```