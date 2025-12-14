import type { Schema, Struct } from '@strapi/strapi';

export interface KarbantartasKarbantartas extends Struct.ComponentSchema {
  collectionName: 'components_karbantartas_karbantartas';
  info: {
    displayName: 'Karbantart\u00E1s';
    icon: 'clock';
  };
  attributes: {
    desc: Schema.Attribute.Text &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      maxLength: 255;
    }>;
    endDateTime: Schema.Attribute.DateTime;
    isEnabled: Schema.Attribute.Boolean &
    Schema.Attribute.Required &
    Schema.Attribute.DefaultTo<false>;
    startDateTime: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    displayName: 'Address';
    icon: 'pinMap';
  };
  attributes: {
    address: Schema.Attribute.String;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    postalcode: Schema.Attribute.String;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      maxLength: 65;
    }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
    Schema.Attribute.Required;
    title: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      maxLength: 60;
    }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      maxLength: 160;
      minLength: 50;
    }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      maxLength: 60;
    }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'karbantartas.karbantartas': KarbantartasKarbantartas;
      'shared.address': SharedAddress;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
