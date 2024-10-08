const moneyMongoose = require('mongoose')

const CaisseShema = new moneyMongoose.Schema({
  amonth : Number ,
  deposed_date : Date ,
  amonthDeposed : Number,
});


module.exports = moneyMongoose.model('Caisse' , CaisseShema);