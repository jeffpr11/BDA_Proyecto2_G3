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
router.get('/:table/:id', airlineController.show);

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
router.get('/delete/:id', airlineController.remove);

module.exports = router;
