const router = require('express').Router();
const { handleErrors } = require('../../middlewares/errorHandlers');
const bookRoutes = require('./book');

router.use('/book', bookRoutes);
router.use(handleErrors);

module.exports = router;
