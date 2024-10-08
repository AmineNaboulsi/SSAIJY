const ModelCaisee = require("../Models/Caisse")

const getCaisseAmonth = async(req , res) => {
    const getdata = await ModelCaisee.findOne({amonth : {$gte : 0 }});
    res.json(getdata)
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