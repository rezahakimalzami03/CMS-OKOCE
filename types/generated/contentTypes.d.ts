import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBeritaBerita extends Schema.CollectionType {
  collectionName: 'beritas';
  info: {
    singularName: 'berita';
    pluralName: 'beritas';
    displayName: 'Berita';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_berita: Attribute.String & Attribute.Required;
    deskripsi_berita: Attribute.Text & Attribute.Required;
    tanggal_berita: Attribute.Date & Attribute.Required;
    foto_berita: Attribute.Media & Attribute.Required;
    author_berita: Attribute.Text & Attribute.Required;
    editor_berita: Attribute.Text & Attribute.Required;
    foto_content: Attribute.Media & Attribute.Required;
    deskripsi_berita_2: Attribute.Text;
    deskripsi_berita_3: Attribute.Text;
    deskripsi_berita_4: Attribute.Text;
    deskripsi_berita_5: Attribute.Text;
    deskripsi_berita_6: Attribute.Text;
    deskripsi_berita_7: Attribute.Text;
    deskripsi_berita_8: Attribute.Text;
    deskripsi_berita_9: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::berita.berita',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::berita.berita',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBrandLokalBrandLokal extends Schema.CollectionType {
  collectionName: 'brand_lokals';
  info: {
    singularName: 'brand-lokal';
    pluralName: 'brand-lokals';
    displayName: 'Brand-Lokal';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_brand: Attribute.String & Attribute.Required;
    deskripsi_brand: Attribute.Text & Attribute.Required;
    foto_brand: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::brand-lokal.brand-lokal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::brand-lokal.brand-lokal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDonasiDonasi extends Schema.CollectionType {
  collectionName: 'donasis';
  info: {
    singularName: 'donasi';
    pluralName: 'donasis';
    displayName: 'Donasi';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_donasi: Attribute.String & Attribute.Required;
    deskripsi_donasi: Attribute.Text & Attribute.Required;
    foto_donasi: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::donasi.donasi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::donasi.donasi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_event: Attribute.String & Attribute.Required;
    tanggal_event: Attribute.Date & Attribute.Required;
    harga_event: Attribute.String & Attribute.Required;
    point_event: Attribute.String & Attribute.Required;
    foto_event: Attribute.Media & Attribute.Required;
    url_pendaftaran: Attribute.Text & Attribute.Required;
    deskripsi_event: Attribute.Text & Attribute.Required;
    tempat_event: Attribute.Text & Attribute.Required;
    quota_event: Attribute.String & Attribute.Required;
    durasi_event: Attribute.String & Attribute.Required;
    narasumber: Attribute.Text & Attribute.Required;
    deskripsi_event_2: Attribute.Text;
    deskripsi_event_3: Attribute.Text;
    deskripsi_event_4: Attribute.Text;
    deskripsi_event_5: Attribute.Text;
    deskripsi_event_6: Attribute.Text;
    contact_person: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMagangMagang extends Schema.CollectionType {
  collectionName: 'magangs';
  info: {
    singularName: 'magang';
    pluralName: 'magangs';
    displayName: 'Magang';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_magang: Attribute.String & Attribute.Required;
    lokasi_magang: Attribute.String & Attribute.Required;
    durasi_magang: Attribute.String & Attribute.Required;
    jenis_magang: Attribute.Enumeration<
      ['Hybrid', 'WFO (Work From Office)', 'WFH (Work From Home)']
    > &
      Attribute.Required;
    foto_magang: Attribute.Media & Attribute.Required;
    tentang_program: Attribute.Text & Attribute.Required;
    benefit_magang: Attribute.Text & Attribute.Required;
    kriteria_peserta: Attribute.Text & Attribute.Required;
    url_msib: Attribute.Text & Attribute.Required;
    kompetensi_1: Attribute.Text & Attribute.Required;
    kompetensi_2: Attribute.Text & Attribute.Required;
    kompetensi_3: Attribute.Text & Attribute.Required;
    kompetensi_4: Attribute.Text & Attribute.Required;
    kompetensi_5: Attribute.Text & Attribute.Required;
    kriteria_peserta_1: Attribute.Text & Attribute.Required;
    kriteria_peserta_2: Attribute.Text;
    kriteria_peserta_3: Attribute.Text;
    kriteria_peserta_4: Attribute.Text;
    kriteria_peserta_5: Attribute.String;
    kriteria_peserta_6: Attribute.Text;
    kriteria_peserta_7: Attribute.Text;
    kriteria_peserta_8: Attribute.Text;
    kriteria_peserta_9: Attribute.Text;
    kriteria_peserta_10: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::magang.magang',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::magang.magang',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterMentorMasterMentor extends Schema.CollectionType {
  collectionName: 'master_mentors';
  info: {
    singularName: 'master-mentor';
    pluralName: 'master-mentors';
    displayName: 'Master-Mentor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    url_master_mentor: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-mentor.master-mentor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-mentor.master-mentor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMerchandiseMerchandise extends Schema.CollectionType {
  collectionName: 'merchandises';
  info: {
    singularName: 'merchandise';
    pluralName: 'merchandises';
    displayName: 'Merchandise';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_merchandise: Attribute.String & Attribute.Required;
    deskripsi_merchandise: Attribute.Text;
    harga_merchandise: Attribute.String & Attribute.Required;
    foto_merchandise: Attribute.Media & Attribute.Required;
    stock_merchandise: Attribute.String & Attribute.Required;
    link_merchandise: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::merchandise.merchandise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::merchandise.merchandise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeluangKerjaPeluangKerja extends Schema.CollectionType {
  collectionName: 'peluang_kerjas';
  info: {
    singularName: 'peluang-kerja';
    pluralName: 'peluang-kerjas';
    displayName: 'Peluang_kerja';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_kerja: Attribute.String & Attribute.Required;
    lokasi_kerja: Attribute.String & Attribute.Required;
    foto_kerja: Attribute.Media & Attribute.Required;
    kategori_kerja: Attribute.String & Attribute.Required;
    tentang_program: Attribute.Text & Attribute.Required;
    benefit_program: Attribute.Text & Attribute.Required;
    jobdesc_kerja: Attribute.Text & Attribute.Required;
    kriteria_peserta: Attribute.Text & Attribute.Required;
    url_pendaftaran: Attribute.Text & Attribute.Required;
    sistem_kerja: Attribute.Enumeration<
      ['Full-Time', 'Part-Time', 'Contract', 'Volunteer']
    > &
      Attribute.Required;
    periode_pendaftaran: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::peluang-kerja.peluang-kerja',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::peluang-kerja.peluang-kerja',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeluangUsahaPeluangUsaha extends Schema.CollectionType {
  collectionName: 'peluang_usahas';
  info: {
    singularName: 'peluang-usaha';
    pluralName: 'peluang-usahas';
    displayName: 'Peluang_usaha';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    judul_usaha: Attribute.String & Attribute.Required;
    foto_usaha: Attribute.Media & Attribute.Required;
    lokasi_usaha: Attribute.String & Attribute.Required;
    kategori_usaha: Attribute.String & Attribute.Required;
    tentang_program: Attribute.Text & Attribute.Required;
    benefit_program: Attribute.Text & Attribute.Required;
    jobdesc_usaha: Attribute.Text & Attribute.Required;
    kriteria_usaha: Attribute.Text & Attribute.Required;
    url_pendaftaran: Attribute.String & Attribute.Required;
    sistem_kerja: Attribute.Enumeration<
      ['Full-Time', 'Part-Time', 'Contract', 'Volunteer']
    > &
      Attribute.Required;
    periode_pendaftaran: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::peluang-usaha.peluang-usaha',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::peluang-usaha.peluang-usaha',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPenggerakOkocePenggerakOkoce extends Schema.CollectionType {
  collectionName: 'penggerak_okoces';
  info: {
    singularName: 'penggerak-okoce';
    pluralName: 'penggerak-okoces';
    displayName: 'Penggerak-OKOCE';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_penggerak: Attribute.String & Attribute.Required;
    deskripsi_penggerak: Attribute.String & Attribute.Required;
    foto_penggerak: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::penggerak-okoce.penggerak-okoce',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::penggerak-okoce.penggerak-okoce',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPengurusPengurus extends Schema.CollectionType {
  collectionName: 'penguruses';
  info: {
    singularName: 'pengurus';
    pluralName: 'penguruses';
    displayName: 'Struktur-Pengurus-Founder';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_founder: Attribute.String & Attribute.Required & Attribute.Unique;
    jabatan_founder: Attribute.String & Attribute.Required & Attribute.Unique;
    foto_founder: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pengurus.pengurus',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pengurus.pengurus',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStrukturPengurusDirektoratStrukturPengurusDirektorat
  extends Schema.CollectionType {
  collectionName: 'struktur_pengurus_direktorats';
  info: {
    singularName: 'struktur-pengurus-direktorat';
    pluralName: 'struktur-pengurus-direktorats';
    displayName: 'Struktur-Pengurus-Direktorat';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_pengurus: Attribute.String & Attribute.Required;
    jabatan_pengurus: Attribute.String & Attribute.Required;
    foto_pengurus: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::struktur-pengurus-direktorat.struktur-pengurus-direktorat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::struktur-pengurus-direktorat.struktur-pengurus-direktorat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStrukturPengurusEksekutifStrukturPengurusEksekutif
  extends Schema.CollectionType {
  collectionName: 'struktur_pengurus_eksekutifs';
  info: {
    singularName: 'struktur-pengurus-eksekutif';
    pluralName: 'struktur-pengurus-eksekutifs';
    displayName: 'Struktur-Pengurus-Eksekutif';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_pengurus: Attribute.String & Attribute.Required;
    jabatan_pengurus: Attribute.String & Attribute.Required;
    foto_pengurus: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::struktur-pengurus-eksekutif.struktur-pengurus-eksekutif',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::struktur-pengurus-eksekutif.struktur-pengurus-eksekutif',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStrukturPengurusHarianStrukturPengurusHarian
  extends Schema.CollectionType {
  collectionName: 'struktur_pengurus_harians';
  info: {
    singularName: 'struktur-pengurus-harian';
    pluralName: 'struktur-pengurus-harians';
    displayName: 'Struktur-Pengurus-Harian';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_pengurus: Attribute.String & Attribute.Required;
    jabatan_pengurus: Attribute.String & Attribute.Required;
    foto_pengurus: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::struktur-pengurus-harian.struktur-pengurus-harian',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::struktur-pengurus-harian.struktur-pengurus-harian',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStrukturPengurusKurasiStrukturPengurusKurasi
  extends Schema.CollectionType {
  collectionName: 'struktur_pengurus_kurasis';
  info: {
    singularName: 'struktur-pengurus-kurasi';
    pluralName: 'struktur-pengurus-kurasis';
    displayName: 'Struktur-Pengurus-Kurasi';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_dewan: Attribute.String & Attribute.Required & Attribute.Unique;
    jabatan_dewan: Attribute.String & Attribute.Required;
    foto_dewan: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::struktur-pengurus-kurasi.struktur-pengurus-kurasi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::struktur-pengurus-kurasi.struktur-pengurus-kurasi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStrukturPengurusPembinaStrukturPengurusPembina
  extends Schema.CollectionType {
  collectionName: 'struktur_pengurus_pembinas';
  info: {
    singularName: 'struktur-pengurus-pembina';
    pluralName: 'struktur-pengurus-pembinas';
    displayName: 'Struktur-Pengurus-Pembina';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nama_pembina: Attribute.String & Attribute.Required & Attribute.Unique;
    jabatan_pembina: Attribute.String;
    foto_pembina: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::struktur-pengurus-pembina.struktur-pengurus-pembina',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::struktur-pengurus-pembina.struktur-pengurus-pembina',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::berita.berita': ApiBeritaBerita;
      'api::brand-lokal.brand-lokal': ApiBrandLokalBrandLokal;
      'api::donasi.donasi': ApiDonasiDonasi;
      'api::event.event': ApiEventEvent;
      'api::magang.magang': ApiMagangMagang;
      'api::master-mentor.master-mentor': ApiMasterMentorMasterMentor;
      'api::merchandise.merchandise': ApiMerchandiseMerchandise;
      'api::peluang-kerja.peluang-kerja': ApiPeluangKerjaPeluangKerja;
      'api::peluang-usaha.peluang-usaha': ApiPeluangUsahaPeluangUsaha;
      'api::penggerak-okoce.penggerak-okoce': ApiPenggerakOkocePenggerakOkoce;
      'api::pengurus.pengurus': ApiPengurusPengurus;
      'api::struktur-pengurus-direktorat.struktur-pengurus-direktorat': ApiStrukturPengurusDirektoratStrukturPengurusDirektorat;
      'api::struktur-pengurus-eksekutif.struktur-pengurus-eksekutif': ApiStrukturPengurusEksekutifStrukturPengurusEksekutif;
      'api::struktur-pengurus-harian.struktur-pengurus-harian': ApiStrukturPengurusHarianStrukturPengurusHarian;
      'api::struktur-pengurus-kurasi.struktur-pengurus-kurasi': ApiStrukturPengurusKurasiStrukturPengurusKurasi;
      'api::struktur-pengurus-pembina.struktur-pengurus-pembina': ApiStrukturPengurusPembinaStrukturPengurusPembina;
    }
  }
}
