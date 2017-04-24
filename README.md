# web-server-database
Base DAL for my nodejs website projects.

`npm install -S web-server-database.git`

**Environment Variables**

    Express Target: SERVER_TARGET || 'client.js'
    Database type: DB_DATASE_TYPE || 'mssql' (sqlite is supported also.)
    Database path (only for sqlite): DB_DATABASE_STORAGE || './server/database/sqlite.db'
    database name: DB_DATABASE || 'Quicksilver',
    host: DB_HOST || 'localhost',
    port: DB_PORT || 3306,
    user: DB_USERNAME || 'username',
    password: DB_PASSWORD || 'password',
    force: DB_FORCE || false,