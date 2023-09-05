const router = require("express").Router();
const thoughtsRoutes = require("./thoughtsRoutes");

router.use("/thoughts", thoughtsRoutes);

module.exports = router;
