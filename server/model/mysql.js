const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"Cksdn1324132$",
    database:"ghd",
})

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

module.exports = db;