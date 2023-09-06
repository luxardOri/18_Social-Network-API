const router = require("express").Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
