/*eslint-env jquery*/

const mysql = require('mysql');
const ipcRenderer = require('electron').ipcRenderer;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass1234@',
    database: 'db_nuclear_analisys'
});
