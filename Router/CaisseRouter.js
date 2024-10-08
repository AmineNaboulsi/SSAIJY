const ControllerCaisse = require("../Controller/CaisseController")
const express = require("express");
const router  = express.Router();

//Get only Amonth of caisse
router.get('/getcamonth',ControllerCaisse.getCaisseAmonth);
//Get all deposet list 
router.get('/getdepolist',ControllerCaisse.getCaisseList);
//deposet on caisse
router.get('/depo',ControllerCaisse.CaisseDeposet);

module.exports = router;