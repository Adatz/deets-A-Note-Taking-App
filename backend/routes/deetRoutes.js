const express = require('express');
const { getDeets, createDeet, getDeetById, UpdateDeet, DeleteDeet } = require('../controllers/deetController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get( protect, getDeets )
router.route('/create').post(protect,createDeet)
router.route('/:id').get(getDeetById).put(protect, UpdateDeet).delete(protect, DeleteDeet )

module.exports = router 