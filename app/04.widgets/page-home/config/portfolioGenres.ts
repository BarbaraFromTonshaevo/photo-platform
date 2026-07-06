export interface GenrePhoto {
  src?: string
  alt?: string
  // Реальные пиксельные размеры файла (как их отдаст будущий API/админка) —
  // не размер отображения, тот считает сам компонент под свою вёрстку
  width?: number
  height?: number
}

export interface PortfolioGenre {
  index: number
  title: string
  description: string
  to: string
  photos: GenrePhoto[]
}

const REPORTAGE_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/reportage/img_1.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_2.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/reportage/img_3.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_4.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_5.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_6.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_7.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_8.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_9.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/reportage/img_10.jpg', width: 2000, height: 1333 }
]

const STUDIO_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/studio/img_1.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/studio/img_2.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/studio/img_3.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/studio/img_4.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/studio/img_5.jpg', width: 2000, height: 1332 },
  { src: '/images/examples/studio/img_6.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/studio/img_7.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/studio/img_8.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/studio/img_9.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/studio/img_10.jpg', width: 2000, height: 3000 }
]

const CREATIVE_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/creative/img_1.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/creative/img_2.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/creative/img_3.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/creative/img_4.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/creative/img_5.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/creative/img_6.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/creative/img_7.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/creative/img_8.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/creative/img_9.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/creative/img_10.jpg', width: 2000, height: 1333 }
]

const CHILDREN_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/children/img_1.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/children/img_2.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/children/img_3.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/children/img_4.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/children/img_5.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/children/img_6.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/children/img_7.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/children/img_8.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/children/img_9.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/children/img_10.jpg', width: 2000, height: 1333 }
]

const FAMILY_PHOTOS: GenrePhoto[] = [
  { src: '/images/examples/family/img_1.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/family/img_2.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/family/img_3.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/family/img_4.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/family/img_5.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/family/img_6.jpg', width: 1815, height: 2723 },
  { src: '/images/examples/family/img_7.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/family/img_8.jpg', width: 2000, height: 3000 },
  { src: '/images/examples/family/img_9.jpg', width: 2000, height: 1333 },
  { src: '/images/examples/family/img_10.jpg', width: 2000, height: 3000 }
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
