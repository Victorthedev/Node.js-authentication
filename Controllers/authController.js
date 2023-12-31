const User = require ('../models/user');

module.exports.signup_get = (req, res) => {
    res.render('signup')
};

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
   
    //Create a new user in DB
    try{
        const user = await User.create({email, password});
        res.status(201).json(user);
    }
    catch(err) {
        console.log(error)
        res.status(400).send('Incorrect credentials submitted');
    }
};

module.exports.login_get = (req, res) => {
    res.render('login')
};

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;
    console.log(email,password);
    res.send('login')
};