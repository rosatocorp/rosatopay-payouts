require 'httparty'

class RosatopayController < ApplicationController
  def payout
    # Replace with your actual App ID and Secret Key
    app_id = 'YOUR_APP_ID'
    secret_key = 'YOUR_SECRET_KEY'

    # Function to generate a random request order ID
    def generate_request_order_id
      chars = ('A'..'Z').to_a + ('2'..'9').to_a
      string_length = 6
      random_string = (0...string_length).map { chars.sample }.join
      "payout_#{random_string}"
    end

    # Rosatopay payout data
    rosatopay_payout_data = {
      amount: '1.00', # Use the amount with 2 decimals.
      currency: 'USD',
      purpose: 'cashback',
      type: 'crypto', # Currently only crypto is supported
      blockchain: 'bsc', # Currently BSC, POLYGON, ETHEREUM is supported
      token: 'USDT', # Currently USDT withdrawals are supported
      withdrawalAddress: '0x0000000000000000000000000000000000000000' # Change this to your withdrawal address
    }

    # Set headers for the HTTP request
    headers = {
      'Content-Type' => 'application/json',
      'Rosatopay-Payout-Idempotency' => generate_request_order_id,
      'appid' => app_id,
      'secretkey' => secret_key
    }

    # Make a POST request to Rosatopay
    response = HTTParty.post('https://payments.rosatopay.com/v1/payouts',
                             body: rosatopay_payout_data.to_json,
                             headers: headers)

    if response.success?
      render json: { message: 'Payout was successful via Rosatopay', data: response.parsed_response }
    else
      render json: { error: 'Payout failed via Rosatopay', data: response.parsed_response }, status: :unprocessable_entity
    end
  end
end

