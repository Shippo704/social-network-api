// import router and routes
const router = require('express').Router();
const apiRoutes = require('./api');

// join routes to the path
router.use('/api', apiRoutes);

// if users stop halfway through declaring a route
router.use((req, res) => res.send('Wrong route!'))

// export the router
module.exports = router;