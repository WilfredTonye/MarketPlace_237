//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// firebase admin setup
let serviceAccount = require("./wilshopping-ef928-firebase-adminsdk-t7mux-71a6f4dbde.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

//declare static path
let staticPath = path.join(__dirname, "Public");
//intializing express.js
const app = express();

//middlewares
app.use(express.static(staticPath)).use(express.json());

//routes
//home route
app.get("/", (req, res) =>{
    res.sendFile(path.join(staticPath, "WilShopping.html"));
})

//home route
app.get("/home", (req, res) =>{
    res.send(path.join(__dirname,"/WilStore/Public", "WilStore.html"));
})

//sigup route
app.get('/signup', (req, res) =>{
    res.sendFile(path.join(staticPath, "Signup.html"));
})

app.post('/signup', (req,res) => {
    let{ name, email, password, number, tac} = req.body
    //form validations
    if (name.length < 3) {
        res.json({'alert':'name must be 3 letters long'});
    }else if(!email.length){
        res.json({'alert': 'enter your email'});
    }else if(password.length < 8){
        res.json({'alert': 'password should be 8 letters long'});
    }else if(!number.length){
        res.json({'alert': 'enter your phone number'});
    }else if(!Number(number)|| number.length < 9){
        res.json({'alert': 'invalid number, please enter valid one'});
    }else if(!tac){
        res.json({'alert': 'you must agree to our terms and conditions'});
    }else{
        //store user in db
        db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({'alert': 'email already exists'})
            }else{
                //encrypt the password before storing it
                bcrypt.genSalt(9, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                        .then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                password: req.body.password
                            })
                        })
                    })
                })
            }
        })
    }
})

//login route
app.get('/login', (req, res) =>{
    res.sendFile(path.join(staticPath, "Login.html"));
})

app.post('/login', (req,res) => {
    let{email, password} = req.body;
    if (!email.length || !password.length) {
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if (!user.exists) {
            return res.json({'alert': 'log in email does not exists'})
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if (result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                    })
                }else{
                    return res.json({'alert': 'password is incorrect'});
                }
            })
        }
    })

})

//homme route
app.get('/homme', (req, res) =>{
    res.sendFile(path.join(staticPath, "Homme.html"));
})

//femme route
app.get('/femme', (req, res) =>{
    res.sendFile(path.join(staticPath, "Femme.html"));
})

//femme route
app.get('/enfant', (req, res) =>{
    res.sendFile(path.join(staticPath, "Enfant.html"));
})

//femme route
app.get('/categories', (req, res) =>{
    res.sendFile(path.join(staticPath, "Categorie.html"));
})

//accessoires route
app.get('/accessoires', (req, res) =>{
    res.sendFile(path.join(staticPath, "Accessoire.html"));
})

//product route
app.get('/product', (req, res) =>{
    res.sendFile(path.join(staticPath, "Product.html"));
})

//Admin route
app.get('/admin', (req, res) =>{
    res.sendFile(path.join(staticPath, "Admin.html"));
})

app.post('/admin', (req, res) => {
    let{ name, about, address, number, tac, email} = req.body;
    if (!name.length || !address.length || !about.length || !Number(number)|| number.length < 9) {
        return res.json({'alert' :'some information(s) is/are invalid'})
    } else if (!tac){
        return res.json({'alert' :'you must agree to yours terms and conditions'})
    }else{
        //update users admin status here
        db.collection('admin').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                admin: true
            }).then(data => {
                res.json(true);
            })
        })
    }
})

//add product route
app.get('/add-product', (req, res) =>{
    res.sendFile(path.join(staticPath, "AddProduct.html"));
})

//404 route
app.get('/404', (req, res) =>{
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use( (req, res) =>{
    res.redirect('/404');
})

app.listen(3005, () =>{
    console.log('listening on port 3005.......');
})