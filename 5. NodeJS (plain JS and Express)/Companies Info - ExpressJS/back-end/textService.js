const fs = require("fs");
const path = require("path");

const getData = (file) => {
    return fs.readFileSync(
        path.join(__dirname, file),
        err => {
            if (err) throw err;
        }
    )
}

const addData = (data, file) => {
    let users = JSON.parse(getData(file));

    users = [...users, data];

    return fs.writeFileSync(
        path.join(__dirname, file),
        JSON.stringify(users),
        err => {
            if (err) throw err;
        })
}

const deleteData = (id, file) => {
    let users = JSON.parse(getData(file));
    users = users.filter(user => user.id !== id);

    return fs.writeFileSync(
        path.join(__dirname, file),
        JSON.stringify(users),
        err => {
            if (err) throw err;
        })
}


module.exports = {
    getData,
    addData,
    deleteData
}