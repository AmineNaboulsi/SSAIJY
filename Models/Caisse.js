const moneyMongoose = require('mongoose')

const CaisseShema = new moneyMongoose.Schema({
  amonth : {
    type:moneyMongoose.Types.Decimal128
  } ,
  deposed_date : Date ,
  amonthDeposed : Number,
});


module.exports = moneyMongoose.model('Caisse' , CaisseShema);