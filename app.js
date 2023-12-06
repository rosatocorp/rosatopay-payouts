var express = require('express');
var crypto = require('crypto');
var request = require('request');
var app = express();
var APP_ID = 'YOUR_APP_ID';
var SECRET_KEY = 'YOUR_SECRET_KEY';

function generateRequestOrderId() {
   let chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ23456789";
    let string_length = 6;
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return 'payout_' + randomstring;
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/payout', function(req, res) {
  var rosatopayPayoutData = {
      "amount": "1.00", //Use the amount with 2 decimals.
      "currency": "USD",
      "purpose": "cashback",
      "type": "crypto", //Currently only crypto is supported
      "blockchain": "bsc", //Currently BSC, POLYGON, ETHEREUM is supported
      "token": "USDT", //Currently USDT withdrawals are supported
      "withdrawalAddress": "0x0000000000000000000000000000000000000000" //Change this to your withdrawal address, or else this will withdraw to this black hole address.
    }

    var options = {
      url: 'https://payments.rosatopay.com/v1/payouts',
      method: 'POST',
      headers: {
          'Rosatopay-Payout-Idempotency': generateRequestOrderId(),
          'Content-Type': 'application/json',
          'appid': APP_ID,
          'secretkey': SECRET_KEY
      },
      body: rosatopayPayoutData,
      json: true
    }


  request( options, function( err, response, body ) {
    if( body ) {
      if( body.error ) {
        res.send(body.reason);
      } else {
        console.log('Payout was successful via Rosatopay');
        res.send(body);
      }
    }
  });
});

app.listen(9933);
console.log('Server is running on http://localhost:9933');
