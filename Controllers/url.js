const Url = require("../Models/url.js");
// const dns=require("dns");


async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Url is required" });
    }

    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8);

    await Url.create({ shortId: shortID, redirectUrl: body.url, visitHistory: [],generatedBy:req.user._id });
    // return res.json({ id: shortID});
    return res.render("home",{
        id:shortID
    });
}

async function handleGetShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true } 
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
}


//Analytics
async function handleAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await Url.findOne({shortId})   
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory}) ;
}

//trace user ip address
// dns.lookup("https://bitly.com/",(err,address,family)=>{
//     console.log("Address:",address);
//     console.log("Family:",family);
// })
//to get client system ip address

// async function handleGetIpAddress(req,res,next) {
    

// }
module.exports = {
    handleGenerateShortUrl,
    handleGetShortId,
    handleAnalytics,
    // handleGetIpAddress
};
