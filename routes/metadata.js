const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
    getMetadata, createMetadata, updateMetadata, deleteMetadata, getMetadataForEdit
} = require("../controllers/metadata");

//isAdmin
const isAdmin = require("../middleware/auth")

//CREATE Metadata
router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    createMetadata
);


//GET metadata
router.get("/", getMetadata);

//GET metadata
router.get("/one", passport.authenticate("jwt", { session: false }), getMetadataForEdit);
//UPDATE metadata
router.put(
    "/edit",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    updateMetadata
);

//DELETE metadata
router.delete(
    "/delete",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    deleteMetadata
);


module.exports = router;