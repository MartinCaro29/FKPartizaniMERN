let express = require('express');
let Product = require('../Models/productModel');
let multer = require('multer');
let path=require('path');
let {v4: uuidv4} = require('uuid');
let app = express();
app.use(express.json());




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Images');
    },
    filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
    })
    const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
    } else {
    cb(null, false)
    }}
    let upload = multer({ storage, fileFilter })

    const generateSlug = async (name) => {
       
        let baseSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        let slug = baseSlug;
      
        let count = 0;
        while (await Product.findOne({ slug })) {
          count++;
          slug = `${baseSlug}-${count}`;
        }
      
        return slug;
      };

   app.post("/addProduct", upload.single('image'), async(req,res) =>{
    try{

        const { name, category, description, price } = req.body;

        if (!name || !category || !description || !price || !req.file) {
            return res.status(400).send("Missing required fields");
          }

        const slug = await generateSlug(name);

        let newProduct = new Product({
            ...req.body,
            slug,
            image: req.file.filename
        });
        await newProduct.save();

        res.status(200).send("Add")
    }
    catch(err){
        res.status(500).send("Product not added");
    }


   }); 

   app.get("/getAllProducts", async(req,res) =>{
    try{
        let products = await Product.find({});
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).send("Error reading products")
    }
   });


   app.get("/getOneProduct/:id", async(req,res) =>{
    try{
        const productId = req.params.id;
        let product = await Product.findById({_id: productId});
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).send("Error reading product "+productId)
    }
   });


   
app.patch("/updateProduct/:id", upload.single('image'), async (req, res) => {
    try {
   
    const itemId = req.params.id;
    
    const itemInfo = {...req.body};
    if (itemInfo.name) {
        itemInfo.slug = await generateSlug(itemInfo.name);
      }
    if (req.file) {
    itemInfo.image = req.file.filename;
    }
    const itemUpdated = await Product.findByIdAndUpdate(
    {_id: itemId},
    {$set: itemInfo},
    {new: true}
    );
    console.log("Data update" + itemUpdated);
    res.status(200).send(itemUpdated);
    } catch (err) {
    console.log("Item not updated " + err);
    res.status(500).send("Item not updated " + err);
    }
    });

   
    app.delete("/deleteProduct/:id", async (req, res) => {
    try {
    const productId = req.params.id;
    await Product.deleteOne({ _id: productId });
    console.log("Item Deleted");
    res.status(200).send("Item Deleted");
    } catch (err) {
    
    console.log("Item not deleted " + err);
    res.status(500).send("Item not deleted " + err); }
    });


module.exports = app;