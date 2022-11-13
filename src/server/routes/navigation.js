const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/nav', async (req, res) => {
  let name = "";
  axios.get('https://webkiosk.juit.ac.in:9443/StudentFiles/PersonalFiles/ShowAlertMessageSTUD.jsp', { headers: req.body['Cookie'] })
    .then(resp => {
      let $ = cheerio.load(resp.data);
      name = $('body > center > p:nth-child(1) > font > b').text().match(/[^Welcome][A-Z][A-Z]*[\s][\s][A-Z][A-Z]*/)[0].trim();
      res.send(name);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;