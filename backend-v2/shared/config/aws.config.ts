import { registerAs } from "@nestjs/config"

export default registerAs("aws", () => ({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: {
      default: "us-west-1",
      S3Client: process.env.S3_REGION,
      CognitoIdentityProviderClient: process.env.COGNITO_REGION || "us-west-2"
    }
  },
  cognito: {
    ClientId: process.env.COGNITO_CLIENT_ID,
    UserPoolId: process.env.COGNITO_USER_POOL_ID
  },
  s3: {
    Bucket: process.env.S3_BUCKET
  },
  s3CloudFrontDomain: process.env.S3_CLOUDFRONT_DOMAIN
}))
