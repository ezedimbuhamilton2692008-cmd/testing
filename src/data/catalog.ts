export type ProductCategory = 'Sneakers' | 'Clothing';
export type ProductCollectionLine = 'Sneakers' | 'Menswear' | 'Womenswear';

export interface Product {
  id:
    | 'classic-sneakers'
    | 'street-sneakers'
    | 'lowtop-sneakers'
    | 'graphic-tee'
    | 'crewneck'
    | 'essential-hoodie'
    | 'plain-trouser'
    | 'womens-sculpted-tee'
    | 'womens-wide-trouser'
    | 'womens-cropped-hoodie';
  name: string;
  category: ProductCategory;
  collectionLine: ProductCollectionLine;
  categoryLabel: string;
  price: number;
  image: string;
  placeholderFilename: string;
  sizes: string[];
  sizeLabel: string;
  fabricNote: string;
}

export interface OutfitPin {
  number: '01' | '02' | '03';
  productId: Product['id'];
  xPercent: number;
  yPercent: number;
  label: string;
}

export interface RunwayLook {
  id: string;
  indexLabel: string;
  name: string;
  seasonTag: string;
  modelName: string;
  hairstyle: string;
  skinToneNote: string;
  modelImage: string;
  placeholderFilename: string;
  description: string;
  products: [Product['id'], Product['id'], Product['id']];
  pins: [OutfitPin, OutfitPin, OutfitPin];
}

export const PRODUCTS: Record<Product['id'], Product> = {
  'classic-sneakers': {
    id: 'classic-sneakers',
    name: 'Empire Classic Sneakers',
    category: 'Sneakers',
    collectionLine: 'Sneakers',
    categoryLabel: 'HAMILTON EMPIRE FOOTWEAR',
    price: 45000,
    image: '/src/assets/images/product_classic_sneakers_1794920328972.jpg',
    placeholderFilename: 'empire-classic-sneakers.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    sizeLabel: 'EU Size',
    fabricNote: 'Full-grain calfskin upper, sculpted dual-density cupsole.',
  },
  'street-sneakers': {
    id: 'street-sneakers',
    name: 'Empire Street Sneakers',
    category: 'Sneakers',
    collectionLine: 'Sneakers',
    categoryLabel: 'HAMILTON EMPIRE FOOTWEAR',
    price: 45000,
    image: '/src/assets/images/product_street_sneakers_1794920329099.jpg',
    placeholderFilename: 'empire-street-sneakers.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    sizeLabel: 'EU Size',
    fabricNote: 'Matte obsidian leather panels with architectural chalk tread.',
  },
  'lowtop-sneakers': {
    id: 'lowtop-sneakers',
    name: 'Empire Low-Top Sneakers',
    category: 'Sneakers',
    collectionLine: 'Sneakers',
    categoryLabel: 'HAMILTON EMPIRE FOOTWEAR',
    price: 45000,
    image: '/src/assets/images/product_lowtop_sneakers_1794920330944.jpg',
    placeholderFilename: 'empire-lowtop-sneakers.jpg',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    sizeLabel: 'EU Size',
    fabricNote: 'Brushed black suede body with crisp ivory heel tab.',
  },
  'graphic-tee': {
    id: 'graphic-tee',
    name: 'Empire Graphic Tee',
    category: 'Clothing',
    collectionLine: 'Menswear',
    categoryLabel: 'HAMILTON EMPIRE MENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_graphic_tee_1794920329927.jpg',
    placeholderFilename: 'empire-graphic-tee.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '320gsm heavyweight combed cotton, geometric chest crest.',
  },
  crewneck: {
    id: 'crewneck',
    name: 'Empire Crewneck',
    category: 'Clothing',
    collectionLine: 'Menswear',
    categoryLabel: 'HAMILTON EMPIRE MENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_crewneck_1794920330966.jpg',
    placeholderFilename: 'empire-crewneck.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '440gsm French terry knit with structured ribbed collar and cuffs.',
  },
  'essential-hoodie': {
    id: 'essential-hoodie',
    name: 'Empire Essential Hoodie',
    category: 'Clothing',
    collectionLine: 'Menswear',
    categoryLabel: 'HAMILTON EMPIRE MENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_essential_hoodie_1794920332209.jpg',
    placeholderFilename: 'empire-essential-hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '480gsm jet-black cotton fleece with double-layered hood.',
  },
  'plain-trouser': {
    id: 'plain-trouser',
    name: 'Empire Plain Trouser',
    category: 'Clothing',
    collectionLine: 'Menswear',
    categoryLabel: 'HAMILTON EMPIRE MENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_plain_trouser_1794921825311.jpg',
    placeholderFilename: 'empire-plain-trouser.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '340gsm tailored wool-cotton twill with clean architectural pleats.',
  },
  'womens-sculpted-tee': {
    id: 'womens-sculpted-tee',
    name: "Empire Women's Sculpted Tee",
    category: 'Clothing',
    collectionLine: 'Womenswear',
    categoryLabel: 'HAMILTON EMPIRE WOMENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_womens_sculpted_tee_1794922749381.jpg',
    placeholderFilename: 'empire-womens-sculpted-tee.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '280gsm ivory combed cotton with clean princess-line tailoring.',
  },
  'womens-wide-trouser': {
    id: 'womens-wide-trouser',
    name: "Empire Women's Wide Trouser",
    category: 'Clothing',
    collectionLine: 'Womenswear',
    categoryLabel: 'HAMILTON EMPIRE WOMENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_womens_wide_trouser_1794922749531.jpg',
    placeholderFilename: 'empire-womens-wide-trouser.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: 'High-waisted fluid jet-black wool-blend wide-leg silhouette.',
  },
  'womens-cropped-hoodie': {
    id: 'womens-cropped-hoodie',
    name: "Empire Women's Cropped Hoodie",
    category: 'Clothing',
    collectionLine: 'Womenswear',
    categoryLabel: 'HAMILTON EMPIRE WOMENSWEAR',
    price: 25000,
    image: '/src/assets/images/product_womens_cropped_hoodie_1794922749945.jpg',
    placeholderFilename: 'empire-womens-cropped-hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabel: 'Size',
    fabricNote: '440gsm French terry cropped fleece with structured double hood.',
  },
};

export const PRODUCT_LIST: Product[] = [
  PRODUCTS['classic-sneakers'],
  PRODUCTS['street-sneakers'],
  PRODUCTS['lowtop-sneakers'],
  PRODUCTS['graphic-tee'],
  PRODUCTS['crewneck'],
  PRODUCTS['essential-hoodie'],
  PRODUCTS['plain-trouser'],
  PRODUCTS['womens-sculpted-tee'],
  PRODUCTS['womens-wide-trouser'],
  PRODUCTS['womens-cropped-hoodie'],
];

export const RUNWAY_LOOKS: RunwayLook[] = [
  {
    id: 'look-01',
    indexLabel: '01',
    name: 'The City Edit',
    seasonTag: 'Victoria Island Capsule',
    modelName: 'Tunde Adeyemi',
    hairstyle: 'Low-Cut Fade',
    skinToneNote: 'Deep Espresso Tone',
    modelImage: '/src/assets/images/model_city_edit_1794920326763.jpg',
    placeholderFilename: 'model-01-city-edit.jpg',
    description:
      'Crisp heavyweight cotton tee paired with tailored black plain trousers and sculpted leather court sneakers.',
    products: ['graphic-tee', 'plain-trouser', 'classic-sneakers'],
    pins: [
      { number: '01', productId: 'graphic-tee', xPercent: 50, yPercent: 28, label: 'Tee' },
      { number: '02', productId: 'plain-trouser', xPercent: 49, yPercent: 59, label: 'Trouser' },
      { number: '03', productId: 'classic-sneakers', xPercent: 46, yPercent: 89, label: 'Sneakers' },
    ],
  },
  {
    id: 'look-02',
    indexLabel: '02',
    name: 'Gallery Opening',
    seasonTag: 'Lagos Contemporary',
    modelName: 'Chidi Okafor',
    hairstyle: 'Natural Curls',
    skinToneNote: 'Rich Chocolate Tone',
    modelImage: '/src/assets/images/model_gallery_opening_1794920326822.jpg',
    placeholderFilename: 'model-02-gallery-opening.jpg',
    description:
      'Boxy fleece hoodie proportions balanced over tailored plain trousers and architectural monochrome street runners.',
    products: ['essential-hoodie', 'plain-trouser', 'street-sneakers'],
    pins: [
      { number: '01', productId: 'essential-hoodie', xPercent: 51, yPercent: 31, label: 'Hoodie' },
      { number: '02', productId: 'plain-trouser', xPercent: 49, yPercent: 60, label: 'Trouser' },
      { number: '03', productId: 'street-sneakers', xPercent: 44, yPercent: 89, label: 'Sneakers' },
    ],
  },
  {
    id: 'look-03',
    indexLabel: '03',
    name: 'Ikoyi Minimal',
    seasonTag: 'Tailored Streetwear',
    modelName: 'Sadiq Bello',
    hairstyle: 'Braided Cornrows',
    skinToneNote: 'Deep Umber Tone',
    modelImage: '/src/assets/images/model_lagos_night_1794920327877.jpg',
    placeholderFilename: 'model-03-ikoyi-minimal.jpg',
    description:
      'Ash-grey French terry crewneck paired with fluid plain tailored trousers and minimalist low-top sneakers.',
    products: ['crewneck', 'plain-trouser', 'lowtop-sneakers'],
    pins: [
      { number: '01', productId: 'crewneck', xPercent: 50, yPercent: 29, label: 'Crewneck' },
      { number: '02', productId: 'plain-trouser', xPercent: 49, yPercent: 59, label: 'Trouser' },
      { number: '03', productId: 'lowtop-sneakers', xPercent: 45, yPercent: 91, label: 'Low-Tops' },
    ],
  },
  {
    id: 'look-04',
    indexLabel: '04',
    name: 'The Empress Edit',
    seasonTag: 'Womenswear Sovereign',
    modelName: 'Amara Eze',
    hairstyle: 'Sleek Knotless Braids',
    skinToneNote: 'Deep Espresso Tone',
    modelImage: '/src/assets/images/model_empress_edit_1794922748471.jpg',
    placeholderFilename: 'model-04-empress-edit.jpg',
    description:
      'Effortless feminine poise pairing an ivory sculpted cotton tee with high-waisted black wide trousers and court sneakers.',
    products: ['womens-sculpted-tee', 'womens-wide-trouser', 'classic-sneakers'],
    pins: [
      { number: '01', productId: 'womens-sculpted-tee', xPercent: 50, yPercent: 29, label: 'Sculpted Tee' },
      { number: '02', productId: 'womens-wide-trouser', xPercent: 49, yPercent: 58, label: 'Wide Trouser' },
      { number: '03', productId: 'classic-sneakers', xPercent: 47, yPercent: 90, label: 'Sneakers' },
    ],
  },
  {
    id: 'look-05',
    indexLabel: '05',
    name: 'Victoria Island',
    seasonTag: 'After Hours Edit',
    modelName: 'Damilola Balogun',
    hairstyle: 'Two-Strand Twists',
    skinToneNote: 'Warm Chocolate Tone',
    modelImage: '/src/assets/images/model_victoria_island_1794920327551.jpg',
    placeholderFilename: 'model-05-victoria-island.jpg',
    description:
      'Monochrome precision with heavyweight charcoal fleece hoodie, tailored plain trousers, and classic white leather.',
    products: ['essential-hoodie', 'plain-trouser', 'classic-sneakers'],
    pins: [
      { number: '01', productId: 'essential-hoodie', xPercent: 49, yPercent: 30, label: 'Hoodie' },
      { number: '02', productId: 'plain-trouser', xPercent: 50, yPercent: 59, label: 'Trouser' },
      { number: '03', productId: 'classic-sneakers', xPercent: 46, yPercent: 90, label: 'Sneakers' },
    ],
  },
  {
    id: 'look-06',
    indexLabel: '06',
    name: 'Studio Day',
    seasonTag: 'Victoria Island Atelier',
    modelName: 'Kelechi Nwosu',
    hairstyle: 'Shoulder-Length Locs',
    skinToneNote: 'Deep Mahogany Tone',
    modelImage: '/src/assets/images/model_studio_day_1794920327962.jpg',
    placeholderFilename: 'model-06-studio-day.jpg',
    description:
      'Clean ecru French terry crewneck matched with pleated black plain trousers and heavy-tread monochrome footwear.',
    products: ['crewneck', 'plain-trouser', 'street-sneakers'],
    pins: [
      { number: '01', productId: 'crewneck', xPercent: 50, yPercent: 29, label: 'Crewneck' },
      { number: '02', productId: 'plain-trouser', xPercent: 49, yPercent: 59, label: 'Trouser' },
      { number: '03', productId: 'street-sneakers', xPercent: 48, yPercent: 89, label: 'Sneakers' },
    ],
  },
  {
    id: 'look-07',
    indexLabel: '07',
    name: 'Lagos Velvet',
    seasonTag: 'Womenswear Atelier',
    modelName: 'Zuri Adewale',
    hairstyle: 'Natural Sculpted Curls',
    skinToneNote: 'Rich Chocolate Tone',
    modelImage: '/src/assets/images/model_lagos_velvet_1794922748735.jpg',
    placeholderFilename: 'model-07-lagos-velvet.jpg',
    description:
      'Simple, refined womenswear silhouette featuring a cropped jet-black hoodie, tailored wide trousers, and suede low-tops.',
    products: ['womens-cropped-hoodie', 'womens-wide-trouser', 'lowtop-sneakers'],
    pins: [
      { number: '01', productId: 'womens-cropped-hoodie', xPercent: 50, yPercent: 31, label: 'Cropped Hoodie' },
      { number: '02', productId: 'womens-wide-trouser', xPercent: 49, yPercent: 58, label: 'Wide Trouser' },
      { number: '03', productId: 'lowtop-sneakers', xPercent: 47, yPercent: 91, label: 'Low-Tops' },
    ],
  },
  {
    id: 'look-08',
    indexLabel: '08',
    name: 'Atelier Edit',
    seasonTag: 'Signature Monograph',
    modelName: 'Ibrahim Musa',
    hairstyle: 'Tapered Afro Fade',
    skinToneNote: 'Rich Chestnut Tone',
    modelImage: '/src/assets/images/model_atelier_edit_1794920327866.jpg',
    placeholderFilename: 'model-08-atelier-edit.jpg',
    description:
      'Architectural jet-black hoodie silhouette finished with fine charcoal plain trousers and suede low-tops.',
    products: ['essential-hoodie', 'plain-trouser', 'lowtop-sneakers'],
    pins: [
      { number: '01', productId: 'essential-hoodie', xPercent: 51, yPercent: 30, label: 'Hoodie' },
      { number: '02', productId: 'plain-trouser', xPercent: 50, yPercent: 59, label: 'Trouser' },
      { number: '03', productId: 'lowtop-sneakers', xPercent: 53, yPercent: 90, label: 'Low-Tops' },
    ],
  },
];
