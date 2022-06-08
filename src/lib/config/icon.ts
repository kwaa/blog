import type { Icon, IconConfig } from '$lib/types/icon'
import { site } from '$lib/config/site'

export const icon: IconConfig = {
  favicon: {
    src: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAT1JREFUSMetkttuhSAQRVvhVMSKCFTP5f//s3uLE+OrzEokI+yVDJevK93BN5D6mmgTGDRAJNYUtQRGpsmYEBir8ZRCoKIhMP54GLMAVhVqougIn09KbKwqbIyKnmAAo1Q41kpXYAsMcvsTkJpKmyCHSokRGfselapAKJEQesBrUxOAbDuE5zMlCrxI6joCl+QrZVn+wLLwX00AsvH+YJ41BImTnH+B98bMO95jsklgPMazIQu8p1K/nHUEeWLW/ux4/357kLOOMI4Mi2Ctc7WhdX29jNERoIDakHOy7VLW1VoobcKpiAD8jrWlOCePu1WI0e44N44Uts17HgBhXEOQhijUWsYOtAoDkIbq5W0bR6iAq1BuC4z3B8MQo7swz7LSgfsC4SQbYkuCtXUeNAhUeLCIA4mfCqMSviH8A0vlJt0MamaSAAAAAElFTkSuQmCC',
    sizes: '24x24',
    type: 'image/x-icon'
  },
  appleTouchIcon: {
    src: site.protocol + site.domain + '/assets/any@180.webp',
    sizes: '180x180',
    type: 'image/webp'
  },
  any192: {
    src: site.protocol + site.domain + '/assets/any@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'any'
  },
  any512: {
    src: site.protocol + site.domain + '/assets/any@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  maskable192: {
    src: site.protocol + site.domain + '/assets/maskable@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'maskable'
  },
  maskable512: {
    src: site.protocol + site.domain + '/assets/maskable@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
}

export const favicon: Icon = {
  src: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAT1JREFUSMetkttuhSAQRVvhVMSKCFTP5f//s3uLE+OrzEokI+yVDJevK93BN5D6mmgTGDRAJNYUtQRGpsmYEBir8ZRCoKIhMP54GLMAVhVqougIn09KbKwqbIyKnmAAo1Q41kpXYAsMcvsTkJpKmyCHSokRGfselapAKJEQesBrUxOAbDuE5zMlCrxI6joCl+QrZVn+wLLwX00AsvH+YJ41BImTnH+B98bMO95jsklgPMazIQu8p1K/nHUEeWLW/ux4/357kLOOMI4Mi2Ctc7WhdX29jNERoIDakHOy7VLW1VoobcKpiAD8jrWlOCePu1WI0e44N44Uts17HgBhXEOQhijUWsYOtAoDkIbq5W0bR6iAq1BuC4z3B8MQo7swz7LSgfsC4SQbYkuCtXUeNAhUeLCIA4mfCqMSviH8A0vlJt0MamaSAAAAAElFTkSuQmCC',
  sizes: '24x24',
  type: 'image/x-icon'
}

export const any: { [key: string]: Icon } = {
  180: {
    src: site.protocol + site.domain + '/assets/any@180.webp',
    sizes: '180x180',
    type: 'image/webp'
  },
  192: {
    src: site.protocol + site.domain + '/assets/any@192.webp',
    sizes: '192x192',
    type: 'image/webp'
  },
  512: {
    src: site.protocol + site.domain + '/assets/any@512.png',
    sizes: '512x512',
    type: 'image/png'
  }
}

export const maskable: { [key: string]: Icon } = {
  192: {
    src: site.protocol + site.domain + '/assets/maskable@192.webp',
    sizes: '192x192',
    type: 'image/webp'
  },
  512: {
    src: site.protocol + site.domain + '/assets/maskable@512.png',
    sizes: '512x512',
    type: 'image/png'
  }
}
