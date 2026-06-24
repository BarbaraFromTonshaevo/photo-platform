export interface GenrePhoto {
  src?: string
  alt?: string
}

export interface PortfolioGenre {
  index: number
  title: string
  description: string
  to: string
  photos: GenrePhoto[]
}

const REPORTAGE_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/reportage/img_1.jpg' },
  { src: '/images/examples/reportage/img_2.jpg' },
  { src: '/images/examples/reportage/img_3.jpg' },
  { src: '/images/examples/reportage/img_4.JPG' },
  { src: '/images/examples/reportage/img_5.JPG' },
  { src: '/images/examples/reportage/img_6.JPG' },
  { src: '/images/examples/reportage/img_7.jpg' },
  { src: '/images/examples/reportage/img_8.jpg' },
  { src: '/images/examples/reportage/img_9.jpg' },
  { src: '/images/examples/reportage/img_10.jpg' }
]

const STUDIO_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/studio/img_1.jpg' },
  { src: '/images/examples/studio/img_2.jpg' },
  { src: '/images/examples/studio/img_3.jpg' },
  { src: '/images/examples/studio/img_4.jpg' },
  { src: '/images/examples/studio/img_5.jpg' },
  { src: '/images/examples/studio/img_6.jpg' },
  { src: '/images/examples/studio/img_7.jpg' },
  { src: '/images/examples/studio/img_8.jpg' },
  { src: '/images/examples/studio/img_9.jpg' },
  { src: '/images/examples/studio/img_10.jpg' }
]

const CREATIVE_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/creative/img_1.jpg' },
  { src: '/images/examples/creative/img_2.jpg' },
  { src: '/images/examples/creative/img_3.jpg' },
  { src: '/images/examples/creative/img_4.jpg' },
  { src: '/images/examples/creative/img_5.jpg' },
  { src: '/images/examples/creative/img_6.png' },
  { src: '/images/examples/creative/img_7.png' },
  { src: '/images/examples/creative/img_8.png' },
  { src: '/images/examples/creative/img_9.png' },
  { src: '/images/examples/creative/img_10.png' }
]

const CHILDREN_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/children/img_1.jpg' },
  { src: '/images/examples/children/img_2.jpg' },
  { src: '/images/examples/children/img_3.jpg' },
  { src: '/images/examples/children/img_4.jpg' },
  { src: '/images/examples/children/img_5.jpg' },
  { src: '/images/examples/children/img_6.jpg' },
  { src: '/images/examples/children/img_7.jpg' },
  { src: '/images/examples/children/img_8.jpg' },
  { src: '/images/examples/children/img_9.jpg' },
  { src: '/images/examples/children/img_10.jpg' }
]

const FAMILY_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/family/img_1.jpg' },
  { src: '/images/examples/family/img_2.jpg' },
  { src: '/images/examples/family/img_3.jpg' },
  { src: '/images/examples/family/img_4.jpg' },
  { src: '/images/examples/family/img_5.jpg' },
  { src: '/images/examples/family/img_6.jpg' },
  { src: '/images/examples/family/img_7.jpg' },
  { src: '/images/examples/family/img_8.jpg' },
  { src: '/images/examples/family/img_9.jpg' },
  { src: '/images/examples/family/img_10.jpg' }
]

export const portfolioGenres: PortfolioGenre[] = [
  {
    index: 1,
    title: 'Репортаж',
    description: 'События и живые эмоции без постановки — момент, пойманный таким, какой он есть.',
    to: '/portfolio/reportage',
    photos: REPORTAGE_PHOTOS
  },
  {
    index: 2,
    title: 'Студийная',
    description: 'Свет, фон и характер — портрет в контролируемой тишине студии.',
    to: '/portfolio/studio',
    photos: STUDIO_PHOTOS
  },
  {
    index: 3,
    title: 'Творческая',
    description: 'Образы на грани фотографии и искусства — идея важнее правил.',
    to: '/portfolio/creative',
    photos: CREATIVE_PHOTOS
  },
  {
    index: 4,
    title: 'Семейная',
    description: 'Настоящая жизнь семьи: смех, обнимашки, мелочи, которые важны.',
    to: '/portfolio/family',
    photos: FAMILY_PHOTOS
  },
  {
    index: 5,
    title: 'Детская',
    description: 'Искренние улыбки и непоседливость — детство, пойманное в свете.',
    to: '/portfolio/children',
    photos: CHILDREN_PHOTOS
  }
]
