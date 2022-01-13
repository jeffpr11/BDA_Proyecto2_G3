var express = require('express');
var router = express.Router();

var airlineController = require('../controllers/airlineController.js');

/* 
 * GET passengers list. 
 */
router.get('/:table', airlineController.list);


/*
 * GET
 */
router.get('/:table/:tableId/:id', airlineController.show);

/*
 * POST
 */
router.post('/:table', airlineController.create);

/*
 * PUT
 */
router.post('/:table/:id', airlineController.update);

/*
 * DELETE
 */
router.get('/:table/delete/:id/:shardid', airlineController.remove);


router.get('/:table/new', function(req, res, next) {
    res.render('detail', { title: 'New' });
});
  
module.exports = router;
