**Rosatopay's merchant payout sample code JAVA**

## Basic steps to start

1. npm install
2. Change adequately in RosatopayController.java, Especially APP_ID and SECRET_KEY as provided.
3. mvn clean install
4. mvn spring-boot:run
5. Access the Application: Open a web browser or use a tool like Postman and access the application using the defined endpoints. In your case, the /payout endpoint will trigger the Rosatopay payout operation.

For example, if your application is running locally, you can access it at http://localhost:8080/payout. Replace 8080 with the port number specified in your application's output.

For any suggestions or doubts, Please contact us at contact@rosatocorp.com
