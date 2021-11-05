# Netliflix Website Rest Api 

### আমাদের কে নেটফ্লিক্স ওয়েবসাইট তৈরী করার জন্য শুরুতে  rest api  তৈরী করে নিতে হবে 

> তার জন্য আমাদের কে প্রথমে যে ডিপেন্ডেন্সি বা ডেভিডেপেন্ডেন্সি গুলো ইনস্টল করতে হবে তা  নিম্নে দেয়া হলো 


```javascript  
npm install express jsonwebtoken mongoose nodemon dotenv crypto-js morgan 
```

> #### আমাদের কে rest  api  তৈরী করার জন্য  index.js    এ   যা করতে হবে তা নিম্ব দেওয়া হলো 
>  - ডিপেন্ডেসি গুলো ইম্পোর্ট করে নিতে হবে 
>  - এক্সপ্রেস এর  app  তৈরী  করে নিতে হবে 
>  - middlwar   ফাঙ্কশন গুলুকে কল করতে হবে 
>  - route  আলাদা আলাদা করলে সেগুলো ইম্পোর্ট করে  নিতে হবে 
>  - route  গুলো কে   app  use  করতে হবে 
>  - পোর্ট তৈরি করে নিতে হবে এবং mongdb  এর সঠিক কানেক্ট  করতে হবে 


> ### index.js 


 ```javascript
 // express import 
const express = require("express");

// app create 
const app = express();

//  all dependency import 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan")
const cors = require('cors');

// dependency import 
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    cors()
]
/* ==========================
    all route import   start 
*============================ */



/* ==========================
    all route import   start 
*============================ */


// env dependency  function call 
dotenv.config();
app.use(middleware)


/* ==========================
    all route  use start  
*============================ */

app.get("/", (req, res) => {
    res.send("<h2>you are success and all  work api project </h2>")
})

/* ==========================
    all route  use end   
*============================ */



/* ==========================
 mongdb connect code  start 
*============================ */

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URL;
mongoose.connect(uri,
    { useNewUrlParser: true })
    .then(() => {
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
    .catch(e => {
        return console.log(e)
    })


/* ==========================
 mongdb connect code  end
*============================ */
```

### আমাদের এই প্রজেক্ট  টি  mongdb   এর সাথে mongoose  এবং এক্সপ্রেস ব্যবহার করা  হয়েছে। তাই আমরা  প্রত্যেক  রাউটার  এর জন্য আলাদা কন্ট্রোলার এবং মডেল তৈরী করবো।  
 <br/>

> #### শুরুতে  আমরা মডেল তৈরি করে  নিবো।   আমাদের এই প্রজেক্ট এ  তিনিটা model  থাকবে।  অর্থাৎ তিনটি কালেকশন থাকবে।  সেগুলো  নিম্নে দেওয়া হলো - 

 <br/>


> ##### User  মডেল  এবং scheema  তৈরী কোয়ার জন্য আমাদের  যে বিষয় গুলো লাগবে তা নিম্নে  লিস্ট আকারে দেওয়া হলো -

<details>
<summary>User Mode and Scheema Create List  ...... </summary>


 -  username
    -  type: String 
    -  required: true 
    -  unique: true 
- email 
    -  type: String 
    -  required: true 
    -  unique: true 
- password 
    -  type: String 
    -  required: true 
- profilePic 
    -  type: String 
    -  defaut: "" 
- isAdmin 
    -  type: Boolean 
    -  default: false 
- timestamps :  true  


</details>

<details>
<summary>User Mode and Scheema Create Code   ...... </summary>

```javascript 
const { Schema, model } = require('mongoose')

const userScheema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},

    {
        timestamps: true
    }
)

module.exports = model("User", userScheema)
```


</details>
<br/>

 ##### Movie  মডেল  এবং scheema  তৈরী কোয়ার জন্য আমাদের  যে বিষয় গুলো লাগবে তা নিম্নে  লিস্ট আকারে দেওয়া হলো -

<details>
<summary>Movie  Model and Scheema Create List  ...... </summary>


 -  title
    -  type: String 
    -  required: true 
    -  unique: true 
- desc 
    -  type: String 
- imgTitle 
    -  type: String 
- imgSm 
    -  type: String 
- trailer 
    -  type: String 
- video 
    -  type: String 
- year 
    -  type: String 
- limit 
    -  type: String 
- genre 
    -  type: String  
- isSeries 
    -  type: Boolean 
    -  defaut:false
- timestamps :  true  

</details>

<details>
<summary>Movie  Model  and Scheema Create Code   ...... </summary>

```javascript 
const { Schema, model } = require('mongoose')

const movieScheema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    desc: String,
    img: String,
    imgTitle: String,
    imgSm: String,
    trailer: String,
    video: String,
    year: String,
    limit: String,
    genre: String,
    isSeries: {
        type: Boolean,
        default: false
    }

},

    {
        timestamps: true
    }
)
module.exports = model("Movie", movieScheema)
```
</details>

<br/>


##### List   মডেল  এবং scheema  তৈরী কোয়ার জন্য আমাদের  যে বিষয় গুলো লাগবে তা নিম্নে  লিস্ট আকারে দেওয়া হলো -

<details>
<summary>List  Model and Scheema Create List  ...... </summary>


 -  title
    -  type: String 
    -  required: true 
    -  unique: true 
- type 
    -  type: String 
- genre 
    -  type: String 
- content 
    -  type: String 
- timestamps :  true  

</details>



<details>
<summary>List   Model  and Scheema Create Code   ...... </summary>

```javascript 
const { Schema, model } = require('mongoose')

const movieScheema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: String,
    genre: String,
    content: Array
},

    {
        timestamps: true
    }
)
module.exports = model("Movie", movieScheema)
```
</details>





 