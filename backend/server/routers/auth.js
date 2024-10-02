const router=require("express").Router();
const {signUp,login}=require("../controllers/auth");
router.post("/login",login);
router.post("/signUp",signUp);



module.exports=router;