const express = require("express");
const { handleGenerateShortUrl,handleGetShortId,handleAnalytics } = require("../Controllers/url.js");

const router=express.Router();

router.post("/",handleGenerateShortUrl)
router.get("/:shortId",handleGetShortId)
router.get("/analytics/:shortId",handleAnalytics)

module.exports=router;