//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();
const users = require('../users');
const bcrypt = require('bcrypt');

function usernameFind(un){
    for (index in users){
        if (users[index].username===un){
            return index;
        }
    }
    return -1;
}
//routes
router.get('/', async (req, res) => {
    try{
        if(req.session.user){
            return res.redirect('/private');
        }
        else{
            return res.status(200).render('users/login', {title: "Login"});
        }
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        let i=usernameFind(username);
        if(i!==-1){
            let pw = await bcrypt.compare(password, users[i].hashedPassword);
            if (pw){
            req.session.user=users[i];
            res.redirect('/private');
            }
            else{
                res.status(401).render('users/login', {title: "Error", error: "Invalid username or password, please try again :)"});
            }
        }
        else{
            res.status(401).render('users/login', {title: "Error", error: "Invalid username or password, please try again :)"});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send({error:e});
    }
});

 router.get('/private', async (req, res) => {
    try{
        return res.status(200).render('users/user', {user: req.session.user, title: req.session.user.username});
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

router.get('/logout', async (req, res) => {
    try{
        req.session.destroy();
        return res.status(200).render('users/logout', {message: "You've been logged out!", title:"Logout"});
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

module.exports = router;