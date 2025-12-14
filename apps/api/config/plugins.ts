export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
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
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        eventtype: {
          field: "slug",
          references: "title",
        },
        event: {
          field: "slug",
          references: "title",
        },
      },
      slugifyWithCount: true,
      shouldUpdateSlug: true,
    },
  },
});