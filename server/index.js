import express from "express"
import mongoose from 'mongoose'
import User from './models/User.js';
import Product from "./models/Product.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log("MongoDB connected");
    }
};
//POST /signup

app.post("/signup", async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender

    });

    try {
        const saveduser = await user.save();

        res.json({
            success: true,
            data: saveduser,
            message: " signup  successfully"
        });
    }

    catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
});

//POST/ login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "please provide email and password"
        })
    }

    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")
    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });

    }
    else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
})

//GET/products

app.get("/products", async(req, res)=>{
    const Products = await Product.find();

    res.json({
        success:true,
        data:Products,
        message:"products fetched successfully "
    })
})

//POST /product

app.post("/product", async(req, res)=>{
     const {name,
         description, 
         price, 
         image, 
         category, 
         brand 
        }= req.body;
     
     const product = new Product({
        name:name,
        description: description,
        price:price,
        image:image,
        category:category,
        brand:brand
     })

try{
    const savedproduct = await product.save();

     res.json({
        success:true,
        data:savedproduct,
        message: "product created successfully"
     });
}
catch(e){
    res.json({
        success:true,
        message: e.message
     });
}
       
});


//GET/product:id

app.get("/product/:id", async(req, res)=>{
    const  { id } = req.params;

    const product = await Product.findById(id);

    res.json({
        success : true,
        data: product,
        message:"product fetched successfully"
    });
});

//PUT /product:id

app.put("/product:id", async(req, res) =>{
     const { id } = req.params;

     const {name,
         description,
          price, 
          image, 
          category, 
          brand 
        } = req.body;

     await Product.updateOne({_id : id}, {$set: {

        name:name,
        description:description,
        price:price,
        image:image,
        category:category,
        brand:brand
     }});

     const product = await product.findById(id)
       
     res.json({
        success:true,
        data: product,
        message: "product updated successfully"
     })
     
})

//DELETE/product/:id

app.delete("/product/:id", async(req, res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id: id});

    res.json({
        success: true,
        message: "product deleted successfully"
    });

});


//GET/products/search?querry=

app.get("/product", async(req, res) =>{
    const {q } = req.query;
    const products = await Product.find({name: {$regex: q, $options:"i"}});
res.json({
    success: true,
    data: products,
    message:"product fetched successfully"
});

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runnung on port: ${PORT}`);
    connectDB();

});
