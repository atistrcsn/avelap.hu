export default ({ env }) => ({
  upload: {
    config: {
      // Use the official Strapi S3 provider to connect to Cloudflare R2
      // R2 is S3-compatible but does not support ACLs — omit ACL entirely
      provider: "@strapi/provider-upload-aws-s3",
      providerOptions: {
        s3Options: {
          endpoint: env("R2_ENDPOINT"),
          credentials: {
            accessKeyId: env("R2_ACCESS_KEY_ID"),
            secretAccessKey: env("R2_ACCESS_SECRET"),
          },
          // R2 uses 'auto' as the virtual region
          region: "auto",
        },
        bucket: env("R2_BUCKET"),
        // Public base URL used to build file URLs returned to clients
        baseUrl: env("R2_PUBLIC_URL"),
        prefix: "",
      },
    },
  },
  seo: {
    enabled: true,
  },
  'drag-drop-content-types-strapi5': {
    enabled: true,
  },
  "video-field": {
    enabled: true,
  },
  "config-sync": {
    enabled: true,
  },
});