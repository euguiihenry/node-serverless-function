const fs = require('fs');
const data = require('../database/data.json');

export default (req, res) => {
    /* 
    *   This following way down below, it is to check if 
    *   it is a request or a response, it is simpler cause I
    *   avoid to use more than one file to make changes 
    *   into user database (in this example).
    */

    if (req.method === 'GET') {
        fs.readFile('./database/data.json', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const info = JSON.parse(data);
            res.send(info);
        });

    } else {
        const info = JSON.parse(req.body);
        data.push(info);

        fs.writeFile('./database/data.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send({ status: "User Created", info});

        });
    }
}