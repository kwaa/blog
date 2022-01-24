export const head = {
  custom: {
    common: [],
    dev: [],
    prod: [
      // Webmention.io
      '<link rel="webmention" href="https://webmention.io/kwaa.dev/webmention" />',
      '<link rel="pingback" href="https://webmention.io/kwaa.dev/xmlrpc" />',
      // Umami Analytics
      '<script async defer data-do-not-track="true" data-website-id="ba1bafad-7768-4723-9395-5cad73a0bf87" src="https://umami.kwaa.dev/umami.js"></script>',
      // Block Baiduspider
      '<meta name="baiduspider" content="noindex">'
    ]
  },
  relMe: []
}
