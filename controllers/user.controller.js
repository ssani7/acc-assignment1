const fs = require('fs');

const allData = JSON.parse(fs.readFileSync('./data.json'));


module.exports.getRandomUser = (req, res) => {
    const randomNumber = Math.round(Math.random() * 5);
    const randomUser = allData.find(user => user.id === randomNumber)
    res.send(randomUser);
    res.end();
}

module.exports.getAllUsers = (req, res) => {
    const { limit } = req.query;
    if (Number(limit)) {
        const limitedData = allData.slice(0, limit);
        res.send(limitedData);
        res.end();
    }
    else {
        res.send(allData);
        res.end();
    }
}

module.exports.addUser = (req, res) => {
    const newUser = req.body;

    if (newUser?.name && newUser?.gender && newUser?.contact && newUser?.address && newUser?.photoUrl) {
        const updateDoc = {
            id: allData.length,
            name: newUser.name,
            gender: newUser.gender,
            contact: newUser.contact,
            address: newUser.address,
            photoUrl: newUser.photoUrl,
        }

        const newUserList = [...allData, updateDoc];
        fs.writeFile('data.json', JSON.stringify(newUserList), (writeError) => {
            if (writeError) {
                res.send("Server Error. Could not update");
                res.end();
            }
            else {
                res.send(JSON.parse(fs.readFileSync('./data.json')));
                res.end();
            }
        });
    }
    else {
        res.send("Please provide all the fields");
        res.end();
    }

}