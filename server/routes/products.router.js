const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ---------------------------------------
// -------- get and post products -------- 
 
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

// -------------------------------------------
// -------- handle product likes here --------  

router.post('/likes', (req, res) => {
  // take the info from inside obj
  const userInfo = req.body.update.user;
  const productInfo = req.body.update.product;
  // make the array to send  1 is for like 2 is for hate
  const sendMe = [userInfo.id, productInfo.id, 1, 'reason will go here'];

  const SQLtext = `
    INSERT INTO "product_user"
    ("user_id", "product_id", "user_preferences", "reason")
    VALUES
    ($1, $2, $3, $4)
  `;

  pool.query(SQLtext, sendMe).then(dbRes => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('something happened in the like post query 💥', err);
    res.sendStatus(500);
  })
}); // end post likes

router.post('/hate', (req, res) => {
  // take the info from inside obj
  const userInfo = req.body.update.user;
  const productInfo = req.body.update.product;
  // make the array to send  1 is for like 2 is for hate
  const sendMe = [userInfo.id, productInfo.id, 2, 'reason will go here'];

  const SQLtext = `
    INSERT INTO "product_user"
    ("user_id", "product_id", "user_preferences", "reason")
    VALUES
    ($1, $2, $3, $4)
  `;

  // Update table where uder id = something 
  // and product id = soemthing

  pool.query(SQLtext, sendMe).then(dbRes => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('something happened in the like post query 💥', err);
    res.sendStatus(500);
  })

}); // end post likes


module.exports = router;
