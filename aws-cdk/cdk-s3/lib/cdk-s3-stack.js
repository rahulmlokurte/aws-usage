const cdk = require("@aws-cdk/core");
const kms = require("@aws-cdk/aws-kms");
const s3 = require("@aws-cdk/aws-s3");

class CdkS3Stack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const myKmsKey = new kms.Key(this, "MyKey", {
      enableKeyRotation: true,
    });

    const myBucket = new s3.Bucket(this, "MyBucket", {
      bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: myKmsKey,
      versioned: true,
    });
  }
}

module.exports = { CdkS3Stack };
