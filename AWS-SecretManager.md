# How to Create AWS SecretManager

AWS secretManager allows us to retrieve database credentials, API keys and other secrets using Secret Manager API's. Instead of storing the hardcoded secret values, we can directly fecth it from secret manager API. It also provides us the option to rotate the credentials for configurable number of days.

Let us see the example of mongoDB credentials stored in secretManager.

1. Select the AWS secret Manager service from AWS console.

2. Click on **_Store a new secret_** button.

3. It provides various options for the secret Type. It supports credentials for RDS, DocumentDB, Redshift clusters and also other types of secret. Here, we select **_other types of secret_**.

4. In **_Plaintext_** store the mongodb credentials.
   `mongodb://USERNAME:PASSWORD@rahul-mongo.cluster.ap-south-1.docdb.amazonaws.com:27017`

5. Click on Next and then provide the secret name **_mongodbURI_**.

6. Click on Next and you can configure automatic rotation. We will Disable automatic rotation.

7. Click on Next and you will be taken to review the configuration. Click on the **\*Store** button.

8. You can see the secret in the list as shown below.

![store-secret](./store-secret.png)
