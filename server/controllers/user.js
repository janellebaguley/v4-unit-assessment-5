const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.find_user_by_username([username]);
        if (foundUser[0]){
            return res.sendStatus(401)
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.create_user([username, hash]);
        req.session.user = ([newUser[0], username, hash]);
        return res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.find_user_by_username({username});
        if(!foundUser[0]){
            return res.status(404).send('User not found')
        }
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password incorrect')
        }
        delete foundUser[0].password;

        req.session.user = foundUser[0]
        res.status(202).send(req.user.session);
    },
    getUser: (req, res) => {
        const {user} = req.session;
        if (user) return res.status(200).send({
            loggedIn: true, user
        })
        else return res.sendStatus(404)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200);
    }
}