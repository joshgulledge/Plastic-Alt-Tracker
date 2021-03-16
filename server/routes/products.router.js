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
  // POST route code here
});

module.exports = router;
