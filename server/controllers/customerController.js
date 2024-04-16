const express = require("express");
const customerModel = require("../models/customerModels");
const mongoose = require("mongoose");

/*
Display all Customer
GET REQUEST
*/
exports.home = async (req, res) => {
  const messages = await req.flash("success");
  const locals = {
    title: "Home",
    description: "Customer Users Management System",
  };

  // PAGINATION
  let perPage = 5;
  let page = req.query.page || 1;

  // display all customer
  try {
    const display = await customerModel.aggregate([{ $sort: { updatedAt: -1 } }]).skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await customerModel.countDocuments({});
    // const displayCustomers = await customerModel.find({}).limit(5);
    res.render("index", {
      locals,
      messages,
      // displayCustomers,
      display,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/*
Add New Customer
GET REQUEST
*/
exports.newCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer",
    description: "Customer Users Management System",
  };
  res.render("customer/add", locals);
};

/*
CREATE New Customer
POST REQUEST
*/
exports.createCustomer = async (req, res) => {
  // console.log(req.body);
  const customer = new customerModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_no: req.body.phone_no,
    comments: req.body.comments,
  });

  try {
    await customerModel.create(customer);
    // req.flash("success", "Customer Added Successfully");
    req.flash("success", `${customer.first_name}, ${customer.last_name} Added Successfully`);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/*
VIEW CUSTOMER DATA
GET REQUEST
*/
exports.viewCustomer = async (req, res) => {
  const locals = {
    title: "View Customer",
    description: "Customer Users Management System",
  };
  try {
    const view_customer = await customerModel.findById ({ _id: req.params.id });
    res.render("customer/viewCustomer", { locals, view_customer });
  } catch (error) {
    console.log(error);
  }
};

/*
EDIT CUSTOMER DATA
GET REQUEST
*/
exports.editCustomer = async (req, res) => {
  const locals = {
    title: "Edit Customer",
    description: "Customer Users Management System",
  };
  try {
    const edit_customer = await customerModel.findById ({ _id: req.params.id });
    if(edit_customer){
      return res.render("customer/editCustomer", { locals, edit_customer});
    } else{
      console.log("ID not Found")
    }    
  } catch (error) {
    console.log(error);
  }
};

/*
UPDATE CUSTOMER DATA
PUT REQUEST
*/
exports.updateCustomer = async function (req, res) {
  // const messages = await flash("success");

  const locals = {
    title: "Update Customer",
    description: "Customer Users Management System",
  };
  // req.checkParams("id").isMongodId(); //Check if the ID is an ID from MongoDB
  try {
      updateCustomer = await customerModel.findByIdAndUpdate(req.params.id,{
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      comments: req.body.comments,
      updatedAt: Date.now()
    }) //.where({_id: req.params.id});
    
    // flash("success", "New Customer Added Successfully");
      req.flash("success", `${updateCustomer.first_name}, ${updateCustomer.last_name} Updated Successfully`);
      res.redirect("/");
      
      
    // res.redirect(`/editCustomer/${req.params.id}`, { locals });
  } catch (error) {
    console.log(error);
  }};


/*
DELETE CUSTOMER DATA
DELETE REQUEST
*/
exports.deleteCustomer = async (req, res) => {
  // const messages = await flash("success");
  try {
    deleteCustomer = await customerModel.findByIdAndDelete({ _id: req.params.id });
    // req.flash("success", ``, "Customer Deleted Successfully");
    req.flash("success", `${deleteCustomer.first_name}, ${deleteCustomer.last_name} Deleted Successfully`);
    res.redirect("/");
    
  } catch (error) {
    console.log(error);
  }
  // flash("success", "Customer Deleted Successfully");
};

/*
SEARCH CUSTOMER
POST REQUEST
*/ 

exports.search = async(req, res) =>{

  try {
    let searchTerm = req.body.searchTerm;
    const noSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');
    
    const customer = await customerModel.find({
      $or: [
        { first_name: { $regex: new RegExp (noSpecialChar, "i") }},
        { last_name: { $regex: new RegExp (noSpecialChar, "i") }}
      ]
    }); 
    res.render('search', {customer})
  } catch (error) {
    console.log(error) 
  }};
