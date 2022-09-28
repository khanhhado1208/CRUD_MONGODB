const express = require("express");
const router = express.Router();
const Car = require("../models/car.model");
const path = require('path');

// Read cars
router.get("/", async function (req, res, next) {
  let cars = await Car.find();
  res.render("index", { cars: cars });
});

// Create cars
router.post("/", function (req, res, next) {
  const newCar = new Car();
  newCar.name = req.body.name;
  newCar.brand = req.body.brand;
  newCar.year = req.body.year;
  newCar
    .save()
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    });
});

// Update cars
router.post("/update", function (req, res, next) {
  const id = req.body.id;
  Car.findById(id, function (err, car) {
    if (err) {
      console.log(err);
    }
    car.name = req.body.name;
    car.brand = req.body.brand;
    car.year = req.body.year;
    car.save();
  });
  res.redirect("/");
});

// Delete cars
router.post("/delete", function (req, res, next) {
  let id = req.body.id;
  Car.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

//Print all cars have the same brand
router.get("/make/:make", async function (req, resp, next) {
  const make = req.params.make
  try {
    let data = await Car.find({
       $or: [{ brand: { $regex: req.params.make } }],
    });
    resp.render("make",{make:data});
  } catch (error) {
    resp.status(404).send("car list failed");
  }
});

module.exports = router;
