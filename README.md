# Netliflix Website Rest Api 

### আমাদের কে নেটফ্লিক্স ওয়েবসাইট তৈরী করার জন্য শুরুতে  rest api  তৈরী করে নিতে হবে 

> তার জন্য আমাদের কে প্রথমে যে ডিপেন্ডেন্সি বা ডেভিডেপেন্ডেন্সি গুলো ইনস্টল করতে হবে তা  নিম্নে দেয়া হলো 


```javascript  
npm install express jsonwebtoken mongoose nodemon dotenv crypto-js morgan  cors
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

<br/>


## Authtication Registration and Login 

আমাদের এই প্রজেক্ট এ authtication   এ user   রেজিস্ট্রেশন করতে  পারবে এবং লগইন  করতে  পারবে।  আর এখানে user   এর পাসওয়ার্ড  bcrypt   অবস্থায় থাকবে যেন  পাসওয়ার্ড কেউ জানতে বা বুজতে না পারে।   এতে করে নিরাপত্তা বজায় থাকবে।  

ব্যবহার কারীকে একটি টোকেন  পাঠানো  হবে।   এর মাধ্যমে user  কতক্ষন সেখানে লগইন অবস্থায় থাকবে এবং ব্যবহারী কি কোনো সাধারণ ইউসার বা অ্যাডমিন কি না তা চেক করে তাদের কে এক্সেস প্রদান করা যাবে।  আর এটি খুবই গুরত্বপূর্ন  একটা বিষয় 


শুরুতে আমাদের যা যা করতে হবে তা   নিচে লিস্ট  আকারে  দেওয়া হলো 

- এক্সপ্রেস রাউটার  তৈরী করে নিতে হবে 
- User  মডেল ইম্পোর্ট করে নিতে হবে 
- CryptoJS   কে ইম্পোর্ট করতে হবে যেন  পাসওয়ার্ড কে শক্তিশালী করা যায় 
- jsonwebtoken  কে টোকেন দেওয়ার জন্য ব্যবহার করতে হবে 

<details>
<summary>Import Code ....  </summary>

```javascript
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
```
</details>


> #### Auth Controller  

##### রেজিস্ট্রেশন  করার ধাপ গুলো নিম্নে দেওয়া হলো - 

- পোস্ট route    এর মাধ্যমে   রাউটার তৈরী করতে হবে
- User Model  এ  রেজিস্ট্রেশন  করার সময় তিনটি Value পাঠাতে  হবে ( username , email , password) 
- CryptoJS এর মাধ্যমে পাসওয়ার্ড কে শক্তিশালী করতে হবে।  
- Save  করতে হবে হবে error   মেসেজ দিতে হবে 


<details>
<summary>Auth Registration Code ...  </summary>

```javascript
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
```
</details>


#### Auth Login  route Controller 
##### লগইন   করার ধাপ গুলো নিম্নে দেওয়া হলো - 
- আমরা  লগইন করতে  হলে post   route  মেথড এর মাধ্যমে করতে হবে 
- ইমেইল এর মাধ্যমে ইউসার কে  ফাইন্ড করে আনতে হবে
- যদি  সেই user  না থাকে তখন একটি এরর মেসেজ দিতে হবে 
- তারপর  আমাদের কে পাসওয়ার্ড টি কে CryptoJS  থেকে decrypt করে   চেক  করতে হবে 
- অরিজিনাল পাসওয়ার্ড এর সাথে যদি  মিল না হয় তাহলে  একটি এরর মেসেজ   দিতে হবে 
- লগইন করার সময় একটি  টোকেন পাঠাতে হবে যেন সে নির্দিষ্ট সময় পর্যন্ত  লগইন থাকতে পারে এবং  তার যে  ইউসার টাইপ অনুযায়ী কাজ করতে  পারে 
- পাসওয়ার্ড যেহেতু খুবই  ইম্পরট্যান্ট বিষয় তাই আমাদের  কে Password   Response  হিসেবে পাঠানো যাবে  না।  তাই আমাদের কে rest  এর  মাধ্যমে Password  ছাড়া ইনফরমেশন পাঠাতে হবে।  
- Error  মেসেজ দিতে হবে 

<details>
<summary>Auth Login  Code ...  </summary>

```javascript
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

```
</details>



 
