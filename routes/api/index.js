// import router and routes
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// join routes to path
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// export the router
module.exports = router;