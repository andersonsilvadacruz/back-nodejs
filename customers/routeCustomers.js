const router = require("express").Router();

const {
  getCustomers,
  getCustomersById,
  createCustomers,
  updateCustomers,
  deletCustomers,
  loginCustomers,
  logautCustomers,
  
} = require("./controllerCustomers");

//LOGIN
router.post("/login", loginCustomers);
router.post("/registro", createCustomers);
router.post("/logaut",logautCustomers);
//CRUD
router.get("/", getCustomers);
router.get("/:id", getCustomersById);
router.patch("/:id", updateCustomers);
router.delete("/:id", deletCustomers);


module.exports = router;
