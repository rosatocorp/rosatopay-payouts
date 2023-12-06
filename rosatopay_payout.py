import requests
import json
import random
import string

# Replace with your actual App ID and Secret Key
APP_ID = 'YOUR_APP_ID'
SECRET_KEY = 'YOUR_SECRET_KEY'

# Function to generate a random request order ID
def generate_request_order_id():
    chars = string.ascii_uppercase + '23456789'
    string_length = 6
    random_string = ''.join(random.choice(chars) for _ in range(string_length))
    return 'payout_' + random_string

# Rosatopay payout data
rosatopay_payout_data = {
    "amount": "1.00",  # Use the amount with 2 decimals.
    "currency": "USD",
    "purpose": "cashback",
    "type": "crypto",  # Currently only crypto is supported
    "blockchain": "bsc",  # Currently BSC, POLYGON, ETHEREUM is supported
    "token": "USDT",  # Currently USDT withdrawals are supported
    "withdrawalAddress": "0x0000000000000000000000000000000000000000"  # Change this to your withdrawal address
}

# Set headers for the HTTP request
headers = {
    'Content-Type': 'application/json',
    'Rosatopay-Payout-Idempotency': generate_request_order_id(),
    'appid': APP_ID,
    'secretkey': SECRET_KEY
}

# Send the POST request to Rosatopay
url = 'https://payments.rosatopay.com/v1/payouts'
response = requests.post(url, headers=headers, data=json.dumps(rosatopay_payout_data))

# Check the response
if response.status_code == 200:
    print('Payout was successful via Rosatopay')
    print(response.text)
else:
    print('Payout failed with status code:', response.status_code)
    print(response.text)

