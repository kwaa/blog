export type Icon = {
  src: string
  sizes?: string
  type?: string
  purpose?: string
}

export const icons: { [name: string]: Icon } = {
  favicon: {
    src: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAT1JREFUSMetkttuhSAQRVvhVMSKCFTP5f//s3uLE+OrzEokI+yVDJevK93BN5D6mmgTGDRAJNYUtQRGpsmYEBir8ZRCoKIhMP54GLMAVhVqougIn09KbKwqbIyKnmAAo1Q41kpXYAsMcvsTkJpKmyCHSokRGfselapAKJEQesBrUxOAbDuE5zMlCrxI6joCl+QrZVn+wLLwX00AsvH+YJ41BImTnH+B98bMO95jsklgPMazIQu8p1K/nHUEeWLW/ux4/357kLOOMI4Mi2Ctc7WhdX29jNERoIDakHOy7VLW1VoobcKpiAD8jrWlOCePu1WI0e44N44Uts17HgBhXEOQhijUWsYOtAoDkIbq5W0bR6iAq1BuC4z3B8MQo7swz7LSgfsC4SQbYkuCtXUeNAhUeLCIA4mfCqMSviH8A0vlJt0MamaSAAAAAElFTkSuQmCC',
    sizes: '24x24',
    type: 'image/x-icon'
  },
  appleTouchIcon: {
    src: '/assets/any@180.webp',
    sizes: '180x180',
    type: 'image/webp'
  },
  any192: {
    src: '/assets/any@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'any'
  },
  any512: {
    src: '/assets/any@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  maskable192: {
    src: '/assets/maskable@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'maskable'
  },
  maskable512: {
    src: '/assets/maskable@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
}
