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
    return 'order_' + randomstring;
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
      "amount": "10.00",
      "currency": "USD",
      "purpose": "cashback",
      "queue_if_low_balance": false,
      "type": "crypto",
      "blockchain": "bsc",
      "token": "USDT",
      "withdrawalAddress": "0x0000000000000000000000000000000000000000"
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
    if( body && body.id ) {
      res.send('SUCCESSFUL PAYOUT');
    } else {
      res.send('FAILED PAYOUT, PLEASE CHECK APP_ID AND SECRET KEY...');
    }
  });
});

app.listen(9933);
console.log('Server is running on http://localhost:9933');
