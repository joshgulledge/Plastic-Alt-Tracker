const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // GET the products from the Database
  const SQLtext = `SELECT * FROM "products";`

  pool.query(SQLtext).then(dbRes => {
    // send the results back
    res.send(dbRes.rows);
  }).catch(err => {
    // show the error
    console.log('💥 Error! ', err);
    res.sendStatus(500);
  });
}); // end the get products route

/**
 * POST route template
 */
router.post('/', (req, res) => {
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
      console.log('Something happened, product not added 💥', err);
      res.sendStatus(500);
    }); // end pool query
  
});

module.exports = router;
