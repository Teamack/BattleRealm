interface ImportMetaEnv {
  readonly SITE_NAME: string
  readonly SITE_URL: string
  readonly SITE_TAGLINE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
