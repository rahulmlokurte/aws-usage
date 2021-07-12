const cdk = require("@aws-cdk/core");
const codeartifact = require("@aws-cdk/aws-codeartifact");

class CdkCodeartifactStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id) {
    super(scope, id);

    // Create a Domain
    const domain = new codeartifact.CfnDomain(this, "CodeArtifactDomain", {
      domainName: "sample-domain",
    });

    // Create a public repository
    const publicSampleRepo = new codeartifact.CfnRepository(
      this,
      "PublicSampleRepository",
      {
        repositoryName: "public-npm-store",
        externalConnections: ["public:npmjs"],
        domainName: domain.domainName,
      }
    );

    publicSampleRepo.addDependsOn(domain);

    // Create a custom repository
    const customSampleRepo = new codeartifact.CfnRepository(
      this,
      "CustomSampleRepository",
      {
        repositoryName: "custom-repository-store",
        upstreams: [publicSampleRepo.repositoryName],
        domainName: domain.domainName,
      }
    );
    customSampleRepo.addDependsOn(publicSampleRepo);
  }
}

module.exports = { CdkCodeartifactStack };
