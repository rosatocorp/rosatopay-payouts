<?php
// Replace with your actual App ID and Secret Key
$APP_ID = 'YOUR_APP_ID';
$SECRET_KEY = 'YOUR_SECRET_KEY';

// Function to generate a random request order ID
function generateRequestOrderId() {
    $chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ23456789";
    $string_length = 6;
    $randomstring = '';
    for ($i = 0; $i < $string_length; $i++) {
        $rnum = rand(0, strlen($chars) - 1);
        $randomstring .= $chars[$rnum];
    }
    return 'payout_' . $randomstring;
}

// Rosatopay payout data
$rosatopayPayoutData = [
    "amount" => "1.00", // Use the amount with 2 decimals.
    "currency" => "USD",
    "purpose" => "cashback",
    "type" => "crypto", // Currently only crypto is supported
    "blockchain" => "bsc", // Currently BSC, POLYGON, ETHEREUM is supported
    "token" => "USDT", // Currently USDT withdrawals are supported
    "withdrawalAddress" => "0x0000000000000000000000000000000000000000" // Change this to your withdrawal address, or else this will withdraw to this black hole address.
];

// Set headers for the HTTP request
$headers = [
    'Content-Type: application/json',
    'Rosatopay-Payout-Idempotency: ' . generateRequestOrderId(),
    'appid: ' . $APP_ID,
    'secretkey: ' . $SECRET_KEY,
];

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, 'https://payments.rosatopay.com/v1/payouts');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($rosatopayPayoutData));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute cURL session and fetch response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    // Close cURL session
    curl_close($ch);

    // Output the response
    echo $response;
}
?>

