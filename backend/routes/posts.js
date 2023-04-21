var express = require('express');
var router = express.Router();

router.get('/', (request, response) => {
    response.send("this is the blogs router for existing posts")
})

router.get('/new', (request, response) => {
    response.send("this is the blogs router for new posts")
})

router.get('/edit', (request, response) => {
    response.send("this is the blogs router for editing posts")
})

router.get('/delete', (request, response) => {
    response.send("this is the blogs router for deleting posts")
})


module.exports = router;