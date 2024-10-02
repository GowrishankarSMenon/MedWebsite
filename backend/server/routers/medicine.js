
const router = require("express").Router();
const {getUserMedicines,addMedicine,updateMedicine,deleteMedicine} = require("../controllers/medicine");

router.get("/:userid", getUserMedicines);       
router.post("/:userid", addMedicine);           
router.put("/:id/:userid", updateMedicine);     
router.delete("/:id/:userid", deleteMedicine);  

module.exports = router;
