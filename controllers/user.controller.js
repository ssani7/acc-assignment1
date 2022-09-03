const fs = require('fs');

const allData = JSON.parse(fs.readFileSync('./data.json'));

module.exports.getRandomUser = (req, res) => {
    const randomNumber = Math.round(Math.random() * 10);
    const randomUser = allData.find(user => user.id === randomNumber)
    res.send(randomUser);
    res.end();
}

module.exports.getAllUsers = (req, res) => {
    const { limit } = req.query;
    if (Number(limit)) {
        const limitedData = allData.slice(0, limit);
        res.send(limitedData.sort((a, b) => a.id - b.id));
        res.end();
    }
    else {
        res.send(allData.sort((a, b) => a.id - b.id));
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
        fs.writeFile('./data.json', JSON.stringify(newUserList), (writeError) => {
            if (writeError) {
                res.send("Server Error. Could not update");
                res.end();
            }
            else {
                res.send(newUserList);
                res.end();
            }
        });
    }
    else {
        res.send("Please provide all the fields");
        res.end();

    }
}

module.exports.updateUser = (req, res) => {
    const body = req.body;

    if (body?.id) {
        const user = allData.find(data => data.id === body.id);
        if (user) {
            const updatedUser = { ...user, ...body };
            const remaining = allData.filter(u => u.id !== body.id)
            const newUserList = [...remaining, updatedUser];

            fs.writeFile('data.json', JSON.stringify(newUserList), (error) => {
                if (error) {
                    res.send("Server Error. Failed to update");
                    res.end();
                }
                else {
                    res.send(updatedUser);
                    res.end();
                }
            })
        }
        else {
            res.send("Please provide a valid id");
            res.end();
        }
    }
    else {
        res.send("Please provide an id to update user");
        res.end();
    }

}

module.exports.updateBulk = (req, res) => {
    const body = req.body;
    let allUsers = [...allData];
    let users = [];

    if (!(Array.isArray(body)) || body.length === 0) {
        res.send("Please provide a valid body");
        res.end();
        return
    }
    body.forEach((u, i) => {
        if (!(u.id)) {
            res.send(`Please provide valid id for no. ${i + 1} user`);
            res.end();
            return;
        }
        else {
            let user = allData.find(exisUser => exisUser.id === u.id);

            if (!(user?.id)) {
                res.send(`None of the users have id: ${u.id}`);
                res.end();
                return;
            }
            else {
                user = { ...user, ...u };
                allUsers = allUsers.filter(prev => prev.id !== u.id)
                users.push(user);
            }
        }
    });
    const newUserList = [...allUsers, ...users];

    fs.writeFile('data.json', JSON.stringify(newUserList), (error) => {
        if (error) {
            res.send("Server Error. Could not update");
            res.end();
        }
        else {
            res.send(users.sort((a, b) => a.id - b.id));
            res.end();
        }
    })

}

module.exports.deleteUser = (req, res) => {
    const id = req?.body?.id;
    if (id) {
        const user = allData.find(u => u.id === id);
        if (user) {
            const remaining = allData.filter(u => u.id !== id);
            fs.writeFile('data.json', JSON.stringify(remaining), (error) => {
                if (error) {
                    res.send("Sever error. Could not delete user");
                    res.end();
                }
                else {
                    res.send(remaining.sort((a, b) => a.id - b.id));
                    res.end();
                }
            })
        }
        else {
            res.send("The id does not belong to any user");
            res.end();
        }
    }
    else {
        res.send("Please provide an user's id");
        res.end();
    }
}