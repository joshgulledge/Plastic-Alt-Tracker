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

    // put the get likes there

    res.send(dbRes.rows);
  }).catch(err => {
    // show the error
    console.log('💥 Error! ', err);
    res.sendStatus(500);
  }); // end pool query
}); // end the get products route

// ------- post -------
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
}); // end post route

// ---------------------------
// ------- delete route ------

router.delete('/:id', (req, res) => {
  console.log('inside router delete....');
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
      console.log('something happened in the delete server router... product 💥 ', err);
    }); // end delete product

  }).catch(err => {
    console.log('something happened in the delete server router.... dependent data 💥', err);
    res.sendStatus(500);
  }); // end delete dependant data

}); // end delete route

// -------------------------------------------
// -------- handle product likes here --------  

router.post('/likes', (req, res) => {
  // take the info from inside obj
  const userInfo = req.body.update.user;
  const productInfo = req.body.update.product;
  // make the array to send  1 is for like 2 is for hate
  const sendMe = [userInfo.id, productInfo.id];
  const checkSQL = `
    SELECT "product_user".user_preferences FROM "product_user"
    WHERE "product_user".product_id = $2 AND "product_user".user_id = $1;
  `;

  pool.query(checkSQL, sendMe).then(dbRes => {

    // if there is no data yet, send an insert
    if (dbRes.rows.length === 0) {
      const insertData = [...sendMe, 1, 'reasons go here'];
      const insertSQL = `
      INSERT INTO "product_user"
      ("user_id", "product_id", "user_preferences", "reason")
      VALUES
      ($1, $2, $3, $4)
      `;
      pool.query(insertSQL, insertData).then(response => {
        console.log('the data was inserted 🎉');
        res.sendStatus(200);
      }).catch(err => {
        console.log('error in the insert 💥', err);
      });
    } ; // end if no data
    
    // if there is already data, update that data
    if (dbRes.rows.length > 0) {
      const updateData = [...sendMe, 1, 'reasons go here'];
      const updateSQL = `
        UPDATE "product_user"
        SET "user_preferences" = $3, "reason" = $4
        WHERE "product_user".user_id = $1 AND "product_user".product_id = $2;
      `;
      pool.query(updateSQL, updateData).then(response => {
        console.log('data has been updated 🎉');
        res.sendStatus(200);
      }).catch(err => {
        console.log('error in the update 💥', err);
        res.sendStatus(500);
      });
    }; // end update data
  }).catch(err => {
    console.log('something happened in the like post query 💥', err);
    res.sendStatus(500);
  })
}); // end likes route

// --------- hate products -------
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
  });
}); // end hates route


module.exports = router;
