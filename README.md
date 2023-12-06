**Rosatopay's merchant payout sample code**

## Basic steps to start

In this Go code:

Replace "YOUR_APP_ID" and "YOUR_SECRET_KEY" with your actual App ID and Secret Key.

The generateRequestOrderId() function generates a random order ID, similar to the JavaScript and PHP versions.

The Rosatopay payout data is defined as a map.

The json.Marshal function is used to convert the payout data to JSON format.

An HTTP POST request is created with the specified headers and JSON data, and it is sent to the Rosatopay API endpoint.

The response from the Rosatopay API is read and printed to the console.

You can run this Go code on your system to perform the Rosatopay payout operation. Make sure to replace the placeholders with your actual credentials and test the code in your Go environment.

For any suggestions or doubts, Please contact us at contact@rosatocorp.com
