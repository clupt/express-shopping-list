"use strict";
const express = require("express");
const { BadRequestError } = require("./expressError");

const router = new express.Router();
const db = require("./fakeDb");

// const ITEM_OBJ = {};

/** return list of shopping items */
router.get("/", function (req, res) {
  return res.json(db.items);
});

/** take JSON body, add item to list, return new item */
router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const newItem = req.body;
  console.log("newItem=", newItem);
  db.items.push(newItem);

  return res.json({
    "added": {
      "name": newItem.name,
      "price": newItem.price
    }
  });
});

/** return single item */
router.get("/:name", function (req, res) {
  console.log("db.items=", db.items);
  const item = db.items.find(i => i.name === req.params.name);
  console.log("item=", item);
  if (item) {
    return res.json(item);
  } else {
    throw new BadRequestError("item was not found");
  }
});

/** take JSON, modify item, return modified item */
router.patch("/:name", function (req, res){
  if (req.body === undefined) throw new BadRequestError();
  const item = db.items.find(i => i.name === req.params.name);

  if (item) {
    req.body.name ? item.name = req.body.name : item.name;
    req.body.price ? item.price = req.body.price : item.price;
    return res.json({updated:{ item }});
  } else {
    throw new BadRequestError("item was not found");
  }
})

/** delete item */

module.exports = router;