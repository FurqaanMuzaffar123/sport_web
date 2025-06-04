import express from 'express';
import bodyParser from "body-parser"
import pg from "pg"
import bcrypt from "bcrypt"
import ejs from "ejs"

const app = express();
const port = 3000
const saltRounds = 10
const db = new pg.Client({
    host:'localhost',
    user:"postgres",
    password:"your_password_here", // replace with your actual password
    port:5432,
    database:"sports_web"
})

db.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));
// Routes

app.get('/', (req, res) => {
    res.sendFile("index.html")
});

app.post("/register",async (req,res)=>{
    const username = req.body.firstName + " " + req.body.lastName
    const rawPassword = req.body.password
    const password = await bcrypt.hash(rawPassword,saltRounds)
    const email = req.body.email
    const phoneNumber = Number(req.body.phoneNumber)
    const gender = req.body.gender 
    const age = Number(req.body.age)
    const result = await db.query(`INSERT INTO users(username,email,password,phonenumber,gender,age) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,[username,email,password,phoneNumber,gender,age])
    const id = result.rows[0].id
    console.log(result.rows)
    res.redirect(`/home_page?username=${encodeURIComponent(username)}&userid=${id}&email=${encodeURIComponent(email)}&phoneNumber=${phoneNumber}&gender=${gender}&age=${age}`)
})

app.get("/home_page",(req,res)=>{
    const {username, userid, email, phoneNumber, gender, age} = req.query
    res.render("home_page.ejs",{
        username:username,
        userid:userid,
        email:email,
        phoneNumber:phoneNumber,
        gender:gender,
        age:age
    })
})

app.post("/login",async (req,res)=>{
    const email = req.body.email
    const password = req.body.password 
    const result = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
    if(result.rows.length === 0){
        return res.status(400).send("User not found")
    }
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return res.status(400).send("Invalid credentials")
    }
    res.redirect(`/home_page?username=${encodeURIComponent(user.username)}&userid=${user.id}&email=${encodeURIComponent(user.email)}&phoneNumber=${user.phonenumber}&gender=${user.gender}&age=${user.age}`)
})

app.get("/logout",(req,res)=>{
    res.redirect("/")
})

app.listen(port, () => {
  console.log('Listening on http://localhost:3000');
});
