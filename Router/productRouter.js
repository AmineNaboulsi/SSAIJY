const express = require('express');
const router = express.Router();
const Product = require('../Models/product');  // Make sure the path is correct
const CaisseM = require('../Models/Caisse')

router.get('/AddProduct', async (req, res) => {
    const {pname  , pprice } = req.query  ;
    if(!pname || !pprice){
        res.status(404).json({error : "missing parametres"})
        return ;
    }
    const price = Number(pprice)
    try {
        // Create a new Product instance
        const Product1 = new Product({
            productName: pname,
            productPrice: price,
            productDate: new Date(),
        });

        // Save the product in MongoDB
        await Product1.save();
        
        const getgetcaisse = await CaisseM.findOne({amonth :{$gte : 0}});
        if(getgetcaisse){
            await CaisseM.findOneAndUpdate(
                {amonth :{$gte : 0}} ,{amonth :getgetcaisse.amonth-price},{
                    new: true
                });
        }
        
        // Send response
        res.json({ message: 'Product added successfully!' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
});
router.get('/getProduct', async (req, res) => {
    try {
        // Create a new Product instance
        const Productlist = await Product.find();
        // Send response
        res.json(Productlist);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
});

module.exports = router;
