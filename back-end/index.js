const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const jwtKey = "OCAMAS";
require("./db/config");
const app = express();
const User = require("./db/User");
const Product = require("./db/Product");
const Category = require("./db/Category");
const Countries = require("./countries.json");
const SubCategory = require("./db/Subcategory");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const { count } = require("./db/Category");
const Purchase = require("./db/Purchase");
const orders = require("./db/Orders");
const multer = require('multer');
const Subcategory = require("./db/Subcategory");
const Addtocart = require("./db/Cart");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
//const upload = multer({dest:'./uploads/image'})


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use("/uploads/image",express.static('uploads/image'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./uploads/image");
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

const securePassword = async(password)=>{
  try{
    const passwordHash = await bcrypt.hash(password,10);
    return passwordHash;
  }catch (error){
    res.status(400).send(error.message);
  }
}

function verifyToken(req, resp, next){
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1];
        //console.warn('middleware called if',token)
        Jwt.verify(token,jwtKey,(err)=>{
            if(err){
                resp.status(401).send({result:"Please provide valid token with header"})
            }else{ 
            }
         })
     }else{
        resp.status(403).send({result:"Please add token with header"})
    }
    //console.warn('middleware called',token);
    next();
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "19bmiit078@gmail.com",
      pass: "ibywfmpbdivbuxrp",
  }
})

function sendMail(email,otp){
  transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for message");
        console.log(success);
    }
  });

  const mailOptions = {
    from: '"OCAMAS"<19bmiit078@gmail.com>',
    to: email,
    subject: "Verify Your Email",
    html: '<p>Verify your OTP to complete the signup and login into your account.</p><p>OTP is : ' + otp + '</p><p>Do not share with anyone.</p>'
  };

  transporter.sendMail(mailOptions)
}

// app.post("/register", async (req, resp) => {
//   try {
//     let user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password;
//     Jwt.sign({ result }, jwtKey,(err) => {
//         if (err) {
//           resp.send({
//             result: "something want wrong, please try after some time.",
//           });
//         }
//         resp.send({ result , auth: token });
//       });
//     //resp.send(result);
//   } catch (e) {
//     console.log(e.message);
//   }
// });

app.post("/register", async (req, res) => {

  try {
    const {name,address,country,state,city,gender,contact,password,email} = req.body;        
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
        User.findOne({ email }, function(err, email){
            if(err) reject(new Error(err))
            if(email) reject({ error : "Please use unique Email"});
            resolve();
        })
    });

    // Promise.all([existUsername, existEmail])
    Promise.all([existEmail])
        .then(() => {
            if(password){
                bcrypt.hash(password, 10)
                    .then( hashedPassword => {
                        const user = new User({
                            name,
                            gender,
                            contact,
                            address,
                            country,
                            state,
                            city,
                            password: hashedPassword,
                            email

                        });
                        // return save result as a response
                        user.save()
                            .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                            .catch(error => res.status(500).send({error}))

                    }).catch(error => {
                        return res.status(500).send({
                            error : "Enable to hashed password"
                        })
                    })
            }
        }).catch(error => {
            return res.status(500).send({ error })
        })
} catch (error) {
    return res.status(500).send(error);
}

});

// app.post("/login", async (req, resp) => {
//   try {
//     if (req.body) {
//       let user = await User.findOne(req.body).select("-password");
//       if (user) {
//         Jwt.sign({ user }, jwtKey, (err, token) => {
//           if (err) {
//             resp.send({
//               result: "something want wrong, please try after some time."
//             });
//           }
//           //resp.send(user)
//           resp.send({user, auth: token });
//         });
//       } else {
//         resp.send({ result: "No User Found" });
//       }
//     } else {
//       resp.send({ result: "No User Found" });
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
      // console.log(password)
      let user = await User.findOne({'email': email })
      // console.log(users)
  
      if(!user) {
        return res.status(200).send({
          msg: "User not found by given emailid",
        });
      }
  
      if(bcrypt.compareSync(password, user.password)){
  
        const TOKEN_KEY = "RANDOM_KEY";
        let token = Jwt.sign({data: user.toJSON}, TOKEN_KEY)
        // console.log(token)
        return res.send({
          user,
          msg: "Login Successful...!",
          email: user.email,
          auth: token
        })
      }else{
        return res.status(200).send({
          msg: "User not found by given emailid",
        });
      }
});

app.post("/forgotpassword", async (req, resp)=>{
  try{
      let email = req.body.email;
      let user = await User.findOne({'email': email })
      resp.send(user);
      let otp = req.body.otp;
      console.log(email);
      sendMail(email,otp);
  }catch{
      console.log("error at forgotpass");
  }
})


app.put("/update-password", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const data = await User.findOne({ _id:user_id });

    if(data){
      
      const newPassword = await securePassword(password);

      let result = await User.findByIdAndUpdate({ _id:user_id},{$set:{
        password:newPassword,
        auth:''
      }});
      res.send(result);
      const TOKEN_KEY = "RANDOM_KEY";
      let token = Jwt.sign({data: password.toJSON}, TOKEN_KEY)
      res.status(200).send({auth:token,success:true ,msg:"update"})

    }else{
      res.status(200).send({success:false,msg:"change fail"})
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewuser", async (req, resp) => {
  try {
    let result = await User.find();
    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewuser/:id", async (req, resp) => {
  try {
    const id = req.params.id
    let result = await User.findById(id);
    // console.log(result)
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/userupdate/:id", async (req, resp) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
  let result = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/userdelete/:id", async (req, resp) => {
  try {
    let result = await User.findByIdAndDelete(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/addproduct",upload.single('image'),async (req, resp) => {
  console.log(req.file,req.body,125)
  try {
    const path = req.file != undefined ? req.file.path.replace(/\\/g,"/"): "";
    var model ={ 
      name : req.body.name,
      description: req.body.description,
      price:req.body.price,
      category:req.body.category,
      subcategory:req.body.subcategory,
      discount:req.body.discount,
      stock:req.body.stock,
      company:req.body.company,
      picture : path !="" ? "/" + path : ""
    }

    let product = new Product(model);
    let result = await product.save();
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewproduct",async (req, resp) => {
  try {
    const products = await Product.find().populate("category","name").populate("subcategory","name");
    if (products.length > 0) {
      resp.send(products);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewproduct/:id", async (req, resp) => {
  try {
    const products = await Product.find({_id:req.params.id}).populate("category","name").populate("subcategory","name");
    if (products.length > 0) {
      resp.send(products);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/deleteproduct/:id", async (req, resp) => {
  try {
    let result = await Product.findByIdAndDelete({ _id: req.params.id });
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/updateproduct/:id", async (req, resp) => {
  try {
    let result = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});



app.post("/addcategory", async (req, resp) => {
  // try {
  //   const {category} = req.body;

  //   let addcategory = new Category({
  //     name: category,
  //   });
  //   await addcategory.save();

  // } catch (e) {
  //   console.log(e.message);
  // }
  try {
    let addcategory = new Category(req.body);
    let result = await addcategory.save();
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewcategory", async (req, resp) => {
  try {
    const category = await Category.find();
    if (category.length > 0) {
      resp.send(category);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewcategory/:id", async(req, resp) => {
  try {
    const category = await Category.find({_id:req.params.id});
    if (category.length > 0) {
      resp.send(category);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/updatecategory/:id", async (req, resp) => {
  try {
    let result = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/deletecategory/:id", async(req, resp) =>{
  try{
    const result = await Category.findByIdAndDelete({_id:req.params.id})
    resp.send(result);
  }
  catch{
    console.warn("invalid category id")
  }
})

app.post("/addsubcategory", async (req, resp) => {
  try {
    let subcategory = new Subcategory(req.body);
    let result = await subcategory.save();
    result = result.toObject();
    resp.send(result)
    // const{name , category}=req.body
    // console.log(name, category);
    // let addsubcategory = new Subcategory({
    //   name: name,
    //   category: category,
    // });
    // await addsubcategory.save();
  } catch (e) {
    console.log(e.message);
  }
});
app.get("/viewsubcategory/:id", async (req, resp) => {
  try {
    const subcategory = await Subcategory.find({_id:req.params.id});
    if (subcategory.length > 0) {
      resp.send(subcategory);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.get("/viewsubcategory", async (req, resp) => {
  try {
    const subcategory = await SubCategory.find().populate("category", "name");
    if (subcategory.length > 0) {
      resp.send(subcategory);
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/updatesubcategory/:id", async (req, resp) => {
  try {
    let result = await Subcategory.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/deletesubcategory/:id", async (req, resp) => {
  try {
    let result = await SubCategory.findByIdAndDelete({ _id: req.params.id });
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewcountry", async (req, resp) => {
  try {
    const countryNameArray = Countries.map((country) => ({
      id: country.id,
      name: country.name,
    }));
    resp.send(countryNameArray);
  } catch (e) {
    resp.status(404).send("Invalid url...");
  }
});

app.get("/states/:countryId", async (req, resp) => {
  try {
    const countryId = req.params.countryId;
    if (countryId) {
      const country = Countries.find((country) => country.id == countryId);
      if (country) {
        return resp.send(country.states);
      } else {
        throw "Invalid Country Id";
      }
    }
  } catch (err) {
    resp.send(err);
  }
});

app.get("/cities/:countryId/:stateId", async (req, resp) => {
  try {
    const countryId = req.params.countryId;
    const stateId = req.params.stateId;
    if (countryId) {
      const country = Countries.find((country) => country.id == countryId);
      if (country) {
        const state = country.states.find((state) => state.id == stateId);
        if (state) {
          return resp.send(state.cities);
        } else {
          throw "Invalid State";
        }
      } else {
        throw "Invalid Country";
      }
    }
  } catch (err) {
    resp.send(err);
  }
});

app.get("/viewsubcategorybycategoryid/:category", async (req, resp) => {
  try {
    const subcategory = await SubCategory.find({
    category: req.params.category,
    });
    if (subcategory.length > 0) {
      resp.send({ data: subcategory });
    } else {
      resp.send({ result: "no product found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/Purchase", async (req, resp) => {
  try {
    let addpurchase = new Purchase(req.body);
    let result = await addpurchase.save();
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/Purchaseview", async (req, resp) => {
  try {
    const purchases = await Purchase.find();
    if (purchases.length > 0) {
      resp.send(purchases);
    } else {
      resp.send({ result: "no purchase found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/Purchase/:id", async (req, resp) => {
  try {
    let result = await Purchase.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/Purchase/:id", async (req, resp) => {
  try {
    let result = await Purchase.findByIdAndDelete({ _id: req.params.id });
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/orders", async (req, resp) => {
  try {
    let addorders = new orders(req.body);
    let result = await addorders.save();
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/vieworders", async (req, resp) => {
  try {
    const orders = await orders.find();
    if (orders.length > 0) {
      resp.send(orders);
    } else {
      resp.send({ result: "no orders found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/orders/:id", async (req, resp) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
  let result = await orders.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.delete("/orders/:id", async (req, resp) => {
  try {
    let result = await orders.findByIdAndDelete({ _id: req.params.id });
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/addtocart", async (req, resp) => {
  try {
    let addtocart = new Addtocart(req.body);
    let result = await Cart.save();
    resp.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/viewcart", async (req, resp) => {
  try {
    const viewcart = await Addtocart.find();
    if (viewcart.length > 0) {
      resp.send(viewcart);
    } else {
      resp.send({ result: "no orders found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/deletecart/:id", async(req, resp) =>{
  try{
    const result = await Addtocart.findByIdAndDelete({_id:req.params.id})
    resp.send(result);
  }
  catch{
    console.warn("invalid category id")
  }
})


app.listen(5000);
