const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

//home route
// router.get('/', (req, res)=>{
//     const locals = {
//         title: 'Home',
//         description: 'Customer Users Management System'
//     }
//     res.render('index' , locals);
// });

router.get("/", customerController.home);
router.get("/add", customerController.newCustomer);

// CREATE NEW CUSTOMER
router.post("/add", customerController.createCustomer);

// VIEW A CUSTOMER BY ID
// router.get("customer/viewCustomer/:id", customerController.viewCustomerList);

router.get("/viewCustomer/:id", customerController.viewCustomer);

// EDIT AND UPDATE A CUSTOMER BY ID
router.get("/editCustomer/:id", customerController.editCustomer);
router.put("/editCustomer/:id", customerController.updateCustomer);

// DELETE CUSTOMER
router.delete("/editCustomer/:id", customerController.deleteCustomer);

// SEARCH CUSTOMER
router.post("/search", customerController.search);


module.exports = router;
