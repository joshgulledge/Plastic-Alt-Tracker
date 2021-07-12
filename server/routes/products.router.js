const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// ---------------------------------------
// -------- get and post products -------- 

router.get('/', rejectUnauthenticated, (req, res) => {
  // GET the products from the Database
  const SQLtext = `SELECT * FROM "products";`
  // this gets all products
  pool.query(SQLtext).then(dbRes => {
  // we also want all the user likes
  const userLikesSQL = `
    SELECT * FROM "product_user"
    WHERE "product_user".user_id = $1;
  `;
  pool.query(userLikesSQL, [req.user.id]).then(response => {
    res.send({
      products: dbRes.rows,
      preferences: response.rows
    });
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
    
  }).catch(err => {
    // show the error
    console.log(err);
    res.sendStatus(500);
  }); // end pool query
}); // end the get products route

// ------- post -------
// this is the post for new products,
// use preference post is further down
router.post('/', rejectUnauthenticated, (req, res) => {

  // only admin can post new products
  if (req.user.authority !== 'ADMIN') return;

  const newProduct = req.body.newProduct;
  // set product info in as array, prevents injection
  const sendMe = [newProduct.brand, newProduct.category, newProduct.image_url, newProduct.website_link, newProduct.description, newProduct.asin_number];

  const SQLtext = `
    INSERT INTO "products"
    ("brand", "category", "image_url", "website_link", "description", "asin_number")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    `; // end SQLtext

    pool.query(SQLtext, sendMe).then(dbRes => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    }); // end pool query
}); // end post route

// ---------------------------
// ------- delete route ------

router.delete('/:id', rejectUnauthenticated, (req, res) => {

  // only admin can delete products
  if (req.user.authority !== 'ADMIN') return;

  // id of product we want to delete
  const deleteItem = req.params.id;

  // first delete the dependent data in the table
  const SQLtext = `
  DELETE FROM "product_user" WHERE "product_user".product_id = $1;
  `;

  pool.query(SQLtext, [deleteItem]).then(dbRes => {

    // now delete the product in the database
    const moreSQLtext = `
      DELETE FROM "products" WHERE "products".id = $1;
    `;
    pool.query(moreSQLtext, [deleteItem]).then (dataRes => { 
      res.sendStatus(200);
    }).catch (err => {
      console.log(err);
    }); // end delete product

  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  }); // end delete dependant data

}); // end delete route


// -------------------------------------------------
// -------- handle product likes/hates here --------  

router.post('/pref', rejectUnauthenticated, (req, res) => {
  // grab the info from inside obj
  const userInfo = req.user.id;
  const productInfo = req.body.update.product.id;
  const LikeorHate = req.body.update.preference;
  const reason = req.body.update.description;

  const sendMe = [userInfo, productInfo];
  // first we have to check if the data already has information
  const checkSQL = `
    SELECT "product_user".user_preferences FROM "product_user"
    WHERE "product_user".product_id = $2 AND "product_user".user_id = $1;
  `;
  pool.query(checkSQL, sendMe).then(dbRes => {
    // if there is no data yet, send an insert
    if (dbRes.rows.length === 0) {
      // use ternary to see if we need to send a like or a hate
      const insertData = [...sendMe, LikeorHate, reason];
      const insertSQL = `
      INSERT INTO "product_user"
      ("user_id", "product_id", "user_preferences", "reason")
      VALUES
      ($1, $2, $3, $4)
      `;
      pool.query(insertSQL, insertData).then(response => {
        res.sendStatus(200);
      }).catch(err => {
        console.log(err);
      });
    } ; // end if no data
    
    // if there is already data, update that data
    if (dbRes.rows.length > 0) {
      const updateData = [...sendMe, LikeorHate, reason];
      const updateSQL = `
        UPDATE "product_user"
        SET "user_preferences" = $3, "reason" = $4
        WHERE "product_user".user_id = $1 AND "product_user".product_id = $2;
      `;
      pool.query(updateSQL, updateData).then(response => {
        res.sendStatus(200);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
    }; // end update data
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
}); // end preference route

// -------------------------------------------------
// -------- handle rainforest api call here --------  

router.post('/rainforest', rejectUnauthenticated, (req, res) => {
  // get the asin of product we want
  const lookUpKey = req.body.value;
  // set the params to send to rainforest api
  const params = {
    api_key: process.env.rainforest,
    type: "product",
    amazon_domain: "amazon.com",
    asin: lookUpKey
  };
  // send the request to rainforest api
  axios.get('https://api.rainforestapi.com/request', { params })
  .then(rainRes => {
    // send back the info
    res.send(JSON.stringify(rainRes.data));
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  }); // end get from api request

}); // end rainforest api call

module.exports = router;
