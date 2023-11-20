import express from "express"
import mongoose from 'mongoose'
import User from './models/User.js';
import Product from "./models/Product.js";
import Order from "./models/Order.js"
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
//POST /signup+

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

//POST/ Order

app.post("/order", async(req,res)=>{
const {user, product, quantity, shippingAddress,  diliveryCharges } = req.body;

const order = new Order({
    user:user,
    product:product,
    quantity:quantity,
    shippingAddress: shippingAddress,
    diliveryCharges:diliveryCharges

});

try{
    const saveduser = await order.save();

res.json({
    success:true,
    data: saveduser,
    message:'Order created successfully'
});
}


catch(e){
    res.json({
        success:false,
        message:e.message
    }); 
}

})

//GET/order/:id

app.get("/order/:id", async(req, res)=>{
    const {id} = req.params;

    const order = await Order.findById(id).populate("user product");
      
    //To hide user's password and gender make it undefined by using following syntax
    order.user.password = undefined;
    

    res.json({
        success:true,
        data:order,
        message:"order is fetched successfully"
    });
});

//GET / orders/user/:id
app.get("/orders/user/:id", async(req, res)=>{
    const{id} = req.params;

const orders = await Order.find({user: id}).populate("user product");

        res.json({
            success:true,
            data:orders,
            message:"orders fetched successfully"
        });
    
});

//PATCH /orders/status/:id
app.patch("/order/status/:id", async(req, res)=>{
    const {id} = req.params;

    const {status} = req.body;

await Order.updateOne({_id: id}, {$set: {status: status}});

    res.json({
        success:true,
        message:"order status updated successfully"
    });

})

//GET /orders
app.get("/orders", async (req, res) => {
    try {
        const { q } = req.query;

        const orders = await Order.find(query).populate("user product");
        
        orders.forEach(order => {
            if (order.user) {
                order.user.password = undefined;
            }
        });

        res.json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching orders"
        });
    }
});

// Start your server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runnung on port: ${PORT}`);
    connectDB();

});
