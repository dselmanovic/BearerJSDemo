var express = require('express');
var router = express.Router();

/* GET some secure resource. */
router.get('/', function(req, res) {
    res.send(
        {
            title:"This is some secure object. NEVER!!! send your token back to user like this",
            authToken:req.authToken
        }
    );
});

module.exports = router;
