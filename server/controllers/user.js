const bcrypt = require('bcryptjs');

module.exports = {
    register: asyc(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.find_user_by_username({username});
        if (foundUser[0]){
            return res.sendStatus(401)
        }
        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.create_user({username, hash});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: (){

    },
    getUser: (){

    },
    logout: (){

    }
}