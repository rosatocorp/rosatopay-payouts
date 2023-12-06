import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class RosatopayController {
    private final String APP_ID = "YOUR_APP_ID"; // Replace with your actual App ID
    private final String SECRET_KEY = "YOUR_SECRET_KEY"; // Replace with your actual Secret Key

    @GetMapping("/payout")
    public ResponseEntity<String> payout() {
        // Define the Rosatopay payout data
        Map<String, Object> rosatopayPayoutData = new HashMap<>();
        rosatopayPayoutData.put("amount", "1.00"); //Use the amount with 2 decimals.
        rosatopayPayoutData.put("currency", "USD");
        rosatopayPayoutData.put("purpose", "cashback");
        rosatopayPayoutData.put("type", "crypto"); //Currently only crypto is supported
        rosatopayPayoutData.put("blockchain", "bsc"); //Currently BSC, POLYGON, ETHEREUM is supported
        rosatopayPayoutData.put("token", "USDT"); //Currently USDT withdrawals are supported
        rosatopayPayoutData.put("withdrawalAddress", "0x0000000000000000000000000000000000000000"); //Change this to your withdrawal address, or else this will withdraw to this black hole address.

        // Create HttpHeaders with the required headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Rosatopay-Payout-Idempotency", generateRequestOrderId());
        headers.add("appid", APP_ID);
        headers.add("secretkey", SECRET_KEY);

        // Create an HttpEntity with the Rosatopay payout data and headers
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(rosatopayPayoutData, headers);

        // Create a RestTemplate to make the POST request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity("https://payments.rosatopay.com/v1/payouts", requestEntity, String.class);

        if (response.getBody() != null) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.badRequest().body("Payout failed.");
        }
    }

    private String generateRequestOrderId() {
        String chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ23456789";
        int stringLength = 6;
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < stringLength; i++) {
            int randomNum = (int) (Math.random() * chars.length());
            randomString.append(chars, randomNum, randomNum + 1);
        }
        return "payout_" + randomString.toString();
    }
}
