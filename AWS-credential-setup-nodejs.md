# Setting Credential in Node Js applications

When we code our applications using the AWS SDK, we need to supply our credentials to the SDK. In this document, we will look several ways
to supply our credentials to SDK.

## 1. Shared Credentials File

When the SDK loads our application, it searches for a shared credential file named **_credentials_**. The shared credential file will be at a
location **_C:\Users\NAME\.aws\credentials_** for windows and **_~/.aws.credentials_** for macOS.

We can use the credential file to create multiple profiles for different AWS account. If we have only one account, then we can create a **_default_** profile.

```sh
[default] ; default profile
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>

[dev] ; dev profile
aws_access_key_id = <DEV_ACCESS_KEY_ID>
aws_secret_access_key = <DEV_SECRET_ACCESS_KEY>

[prod] ; prod profile
aws_access_key_id = <PROD_ACCESS_KEY_ID>
aws_secret_access_key = <PROD_SECRET_ACCESS_KEY>
```

Once it is created, we can use below code to select the particular profile credentials (dev for example).

```javascript
var AWS = require("aws-sdk");
var profile = new AWS.SharedIniFileCredentials({ profile: "dev" });

AWS.config.update({ region: "ap-south-1", credentials: profile });
```

## 2. From Environmental Variables

The AWS credentials setup as environmental variable gets automatically detected by the SDK. We need not manage the credentials on our own. The environment variables that you set are :

- **_AWS_ACCESS_KEY_ID_**
- **_AWS_SECRET_ACCESS_KEY_**

Here the profiles does not matter as we are putting credentials directly to the environment where our application runs.

## 3. From a JSON File

We can load the credentials by creating a new configuration file in one of the directory from which our application can directly load.

Create a **_aws_config.json_** file and add the below contents.

```json
{ "accessKeyId": <YOUR_ACCESS_KEY_ID>, "secretAccessKey": <YOUR_SECRET_ACCESS_KEY>, "region": <YOUR_REGION> }
```

From our application, we can use below code to load the credentials from the config file.

```javascript
AWS.config.loadFromPath("./aws_config.json");
```
