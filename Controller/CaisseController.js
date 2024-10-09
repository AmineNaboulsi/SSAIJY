const ModelCaisee = require("../Models/Caisse")
const Product = require("../Models/product")
const mongoose = require("mongoose")
const getCaisseAmonth = async(req , res) => {
    const getdata = await ModelCaisee.findOne({amonth : {$gte : 0 }});
    //hado diya liyoma
    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 
    let endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    //hado diyal lbara7

    let TodayPrices = await Product.find({
        productDate: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    });
    let TotalToday = 0 ;
    TodayPrices.map((Prod,i)=>{
        TotalToday +=  Prod.productPrice 
     })
    startOfDay.setDate(startOfDay.getDate()-1);
    endOfDay.setDate(endOfDay.getDate()-1);

    let TotalYesterday = 0 ;
    TodayPrices = await Product.find({
        productDate: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    });
    TodayPrices.map((Prod,i)=>{
        TotalYesterday +=  Prod.productPrice 
     })
    res.json({
        amonth : String(getdata.amonth)      ,
        todayamonth : TotalToday ,
        yestrdayamonth : TotalYesterday ,
        TodayPrices:TodayPrices
        })
}
const getCaisseList = async(req , res) => {
    const getdata = await ModelCaisee.find({amonth : {$lte : -1 }});
    res.json(getdata)
}
const CaisseDeposet = async(req , res) => {
    const {mdeposed} = req.query;
    if(!mdeposed){
        res.status(405).send("Missing parametres")
        return ;
    }
    const parsedMdeposed = Number(mdeposed);
    const Dopo = new ModelCaisee({
        amonth : -1 ,
        amonthDeposed : parsedMdeposed ,
        deposed_date : new Date()
    });
    await Dopo.save();
    const getgetcaisse = await ModelCaisee.findOne({amonth :{$gte : 0}});
    if(getgetcaisse){
        await ModelCaisee.findOneAndUpdate(
            {amonth :{$gte : 0}} ,{amonth :getgetcaisse.amonth+parsedMdeposed},{
                new: true
              });
    }
    res.json({ msg : "Added successfuly"});
}
module.exports  = {
    getCaisseAmonth , getCaisseList ,CaisseDeposet
}