import { Service } from '../types';

// Real profile data for Abubakr Abdullah Allaw
export const profileData = {
  fullName: 'Abubakr Abdullah Allaw',
  displayName: 'ABUBAKR ALLAW',
  arabicName: 'أبوبكر علاو',
  title: 'Architectural Engineer & Interior Designer',
  descriptor: 'Architecture · BIM · Design',
  location: 'Ibb, Yemen',
  phone: '+967 774909641',
  whatsapp: '967774909641',
  email: 'arch.abubakrallaw@gmail.com',
  nationality: 'Yemeni',
};

// Personal summary - will be translated via i18n
export const profileSummary = {
  en: 'An architectural engineer and interior designer based in Ibb, Yemen, dedicated to creating meaningful spaces that balance aesthetics with functionality. With expertise spanning architectural design, building information modeling, and interior design, I bring a comprehensive approach to every project — from initial concept through detailed documentation and visual presentation.',
  ar: 'مهندس معماري ومصمم داخلي مقيم في إب، اليمن، أكرّس جهودي لإنشاء مساحات ذات معنى توازن بين الجماليات والوظيفية. بخبرة تمتد عبر التصميم المعماري ونمذجة معلومات البناء والتصميم الداخلي، أقدم نهجًا شاملاً لكل مشروع — من الفكرة الأولية مرورًا بالتوثيق التفصيلي والإظهار البصري.',
};

// Skills - personal and technical
export const skillsData = {
  personal: [
    { en: 'Architectural Design', ar: 'التصميم المعماري' },
    { en: 'Interior Design', ar: 'التصميم الداخلي' },
    { en: 'BIM Modeling', ar: 'نمذجة معلومات البناء' },
    { en: 'Construction Documentation', ar: 'توثيق البناء' },
    { en: '3D Visualization', ar: 'الإظهار ثلاثي الأبعاد' },
    { en: 'Space Planning', ar: 'تخطيط الفراغات' },
    { en: 'Design Development', ar: 'تطوير التصميم' },
    { en: 'Client Communication', ar: 'التواصل مع العملاء' },
  ],
  software: [
    { en: 'AutoCAD', ar: 'AutoCAD' },
    { en: 'Revit', ar: 'Revit' },
    { en: '3ds Max', ar: '3ds Max' },
    { en: 'SketchUp', ar: 'SketchUp' },
    { en: 'Lumion', ar: 'Lumion' },
    { en: 'V-Ray', ar: 'V-Ray' },
    { en: 'Enscape', ar: 'Enscape' },
    { en: 'Adobe Photoshop', ar: 'Adobe Photoshop' },
    { en: 'Adobe Illustrator', ar: 'Adobe Illustrator' },
    { en: 'Microsoft Office', ar: 'Microsoft Office' },
  ],
};

// Education - real data only
export const educationData = [
  {
    degree: { en: "Bachelor's Degree in Architectural Engineering", ar: 'بكالوريوس هندسة معمارية' },
    institution: { en: 'University', ar: 'الجامعة' },
    period: { en: 'Education period', ar: 'الفترة الدراسية' },
  },
];

// Work experience - real data only
export const experienceData = [
  {
    role: { en: 'Architectural Engineer & Interior Designer', ar: 'مهندس معماري ومصمم داخلي' },
    company: { en: 'Independent Practice', ar: 'ممارسة مستقلة' },
    location: { en: 'Ibb, Yemen', ar: 'إب، اليمن' },
    period: { en: 'Present', ar: 'الحالي' },
    description: {
      en: 'Providing architectural engineering and interior design services. Responsible for design development, BIM documentation, 3D visualization, and client coordination.',
      ar: 'تقديم خدمات الهندسة المعمارية والتصميم الداخلي. مسؤول عن تطوير التصميم وتوثيق BIM والإظهار ثلاثي الأبعاد والتنسيق مع العملاء.',
    },
  },
];

// Languages
export const languagesData = [
  { name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Native', ar: 'اللغة الأم' } },
  { name: { en: 'English', ar: 'الإنجليزية' }, level: { en: 'Fluent', ar: 'بطلاقة' } },
];

// Services - real services offered
export const services: Service[] = [
  {
    _id: 'arch-design',
    title: 'Architectural Design',
    titleAr: 'التصميم المعماري',
    description: 'Comprehensive architectural design services from concept development to detailed design, creating spaces that respond to context, function, and aspiration.',
    descriptionAr: 'خدمات تصميم معماري شاملة من تطوير الفكرة إلى التصميم التفصيلي، إنشاء مساحات تستجيب للسياق والوظيفة والطموح.',
    icon: 'building',
    image: '/images/stock/modern-villa-pool.webp',
  },
  {
    _id: 'bim',
    title: 'BIM Modeling & Documentation',
    titleAr: 'نمذجة معلومات البناء والتوثيق',
    description: 'Professional BIM services using Revit and industry-standard tools for accurate modeling, coordination, and construction documentation.',
    descriptionAr: 'خدمات BIM احترافية باستخدام Revit وأدوات معايير الصناعة للنمذجة الدقيقة والتنسيق وتوثيق البناء.',
    icon: 'cube',
    image: '/images/stock/exterior-design.webp',
  },
  {
    _id: 'visualization',
    title: '3D Visualization',
    titleAr: 'الإظهار المعماري ثلاثي الأبعاد',
    description: 'Photorealistic architectural visualization that communicates design intent with clarity and impact, from conceptual renders to presentation-quality imagery.',
    descriptionAr: 'إظهار معماري واقعي ينقل نية التصميم بوضوح وتأثير، من التصورات المفاهيمية إلى الصور عالية الجودة.',
    icon: 'eye',
    image: '/images/projects/architectural-visualization-cover.webp',
  },
  {
    _id: 'interior',
    title: 'Interior Design',
    titleAr: 'التصميم الداخلي',
    description: 'Thoughtful interior design that creates cohesive environments, balancing materiality, light, and spatial quality to enhance the human experience.',
    descriptionAr: 'تصميم داخلي مدروس يخلق بيئات متماسكة، يوازن بين الخامات والضوء والجودة المكانية لتعزيز التجربة الإنسانية.',
    icon: 'layout',
    image: '/images/projects/luxury-interior-design-cover.webp',
  },
];

// Sample projects - placeholder layout images
// These are architectural image placeholders to demonstrate the layout
// Real projects will be loaded from Sanity CMS when published
export const projects: any[] = [
  {
    "_id": "sample-1",
    "_type": "project",
    "title": {
      "en": "Modern Residential Villa",
      "ar": "فيلا سكنية عصرية"
    },
    "slug": {
      "current": "modern-residential-villa"
    },
    "category": {
      "_id": "Residential",
      "_type": "category",
      "nameEn": "Residential",
      "nameAr": "سكني"
    },
    "subtitle": {
      "en": "Contemporary Living Space",
      "ar": "مساحة معيشة معاصرة"
    },
    "description": {
      "en": "A modern residence of clean lines and open spaces, integrated with its landscape. The design emphasizes natural light, cross ventilation and sustainable materials.",
      "ar": "سكن عصري بخطوط نظيفة ومساحات مفتوحة متكاملة مع المناظر الطبيعية. يركز التصميم على الإضاءة الطبيعية والتهوية المتقاطعة والمواد المستدامة."
    },
    "designConcept": {
      "en": "Stacked volumes with deep overhangs shade the glazing while framing views toward the garden and pool.",
      "ar": "كتل متراكبة ببروزات عميقة تظلل الزجاج وتؤطر الإطلالات نحو الحديقة والمسبح."
    },
    "methodology": {
      "en": "Concept sketches, Revit modeling, construction documents and photorealistic visualization.",
      "ar": "رسومات الفكرة، نمذجة Revit، المخططات التنفيذية، ثم الإظهار الواقعي."
    },
    "location": {
      "en": "Ibb, Yemen",
      "ar": "إب، اليمن"
    },
    "year": "2024",
    "area": "450 m²",
    "status": "Completed",
    "role": {
      "en": "Lead Architect",
      "ar": "مصمم معماري رئيسي"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": true,
    "order": 1,
    "coverImage": "/images/stock/modern-villa-pool.webp",
    "gallery": [
      "/images/projects/modern-residential-villa-1.webp",
      "/images/stock/villa-green.webp",
      "/images/stock/villa-sunset.webp"
    ]
  },
  {
    "_id": "sample-2",
    "_type": "project",
    "title": {
      "en": "Commercial Office Complex",
      "ar": "مجمع مكاتب تجاري"
    },
    "slug": {
      "current": "commercial-office-complex"
    },
    "category": {
      "_id": "Commercial",
      "_type": "category",
      "nameEn": "Commercial",
      "nameAr": "تجاري"
    },
    "subtitle": {
      "en": "Modern Workspace Design",
      "ar": "تصميم مساحة عمل حديثة"
    },
    "description": {
      "en": "A contemporary office building designed to foster collaboration, with flexible floor plates, a glazed facade and a welcoming podium.",
      "ar": "مبنى مكاتب معاصر مصمم لتعزيز التعاون، بطوابق مرنة وواجهة زجاجية وقاعدة مرحّبة."
    },
    "designConcept": {
      "en": "A rhythmic glass facade expresses the floor structure while the podium connects the tower to street life.",
      "ar": "واجهة زجاجية إيقاعية تعبّر عن بنية الطوابق بينما تربط القاعدة البرج بحياة الشارع."
    },
    "methodology": {
      "en": "Massing studies, BIM coordination across disciplines, and phased documentation.",
      "ar": "دراسات الكتل، تنسيق BIM بين التخصصات، وتوثيق على مراحل."
    },
    "location": {
      "en": "Sana'a, Yemen",
      "ar": "صنعاء، اليمن"
    },
    "year": "2024",
    "area": "2,500 m²",
    "status": "In Progress",
    "role": {
      "en": "Architectural Designer",
      "ar": "مصمم معماري"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": true,
    "order": 2,
    "coverImage": "/images/stock/office-building-01.webp",
    "gallery": [
      "/images/stock/office-building-02.webp",
      "/images/stock/exterior-design.webp",
      "/images/stock/glass-interior.webp"
    ]
  },
  {
    "_id": "sample-3",
    "_type": "project",
    "title": {
      "en": "Luxury Interior Design",
      "ar": "تصميم داخلي فاخر"
    },
    "slug": {
      "current": "luxury-interior-design"
    },
    "category": {
      "_id": "Interior",
      "_type": "category",
      "nameEn": "Interior",
      "nameAr": "داخلي"
    },
    "subtitle": {
      "en": "Elegant Living Spaces",
      "ar": "مساحات معيشة أنيقة"
    },
    "description": {
      "en": "A refined interior blending traditional Yemeni touches with contemporary aesthetics: custom furniture, natural materials and layered lighting.",
      "ar": "تصميم داخلي راقٍ يمزج لمسات يمنية تقليدية بجماليات معاصرة: أثاث مخصص وخامات طبيعية وإضاءة متعددة الطبقات."
    },
    "designConcept": {
      "en": "A warm palette of bronze, stone and timber anchors the space around a large window and a single sculptural pendant.",
      "ar": "لوحة دافئة من البرونز والحجر والخشب تتمحور حول نافذة كبيرة وإضاءة تعليق نحتية."
    },
    "methodology": {
      "en": "Space planning, material boards, joinery details and 3D visualization.",
      "ar": "تخطيط الفراغ، لوحات الخامات، تفاصيل النجارة، والإظهار ثلاثي الأبعاد."
    },
    "location": {
      "en": "Aden, Yemen",
      "ar": "عدن، اليمن"
    },
    "year": "2023",
    "area": "180 m²",
    "status": "Completed",
    "role": {
      "en": "Interior Designer",
      "ar": "مصمم داخلي"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": true,
    "order": 3,
    "coverImage": "/images/projects/luxury-interior-design-cover.webp",
    "gallery": [
      "/images/projects/luxury-interior-design-1.webp",
      "/images/projects/luxury-interior-design-2.webp",
      "/images/projects/luxury-interior-design-3.webp"
    ]
  },
  {
    "_id": "sample-4",
    "_type": "project",
    "title": {
      "en": "Architectural Visualization",
      "ar": "إظهار معماري"
    },
    "slug": {
      "current": "architectural-visualization"
    },
    "category": {
      "_id": "Visualization",
      "_type": "category",
      "nameEn": "Visualization",
      "nameAr": "إظهار"
    },
    "subtitle": {
      "en": "Photorealistic Rendering",
      "ar": "تصيير واقعي"
    },
    "description": {
      "en": "Photorealistic visualization showing design intent: courtyard views, evening lighting and detailed material studies.",
      "ar": "إظهار واقعي يعرض نية التصميم: إطلالات الفناء وإضاءة المساء ودراسات مفصلة للخامات."
    },
    "designConcept": {
      "en": "Arched colonnades and a calm reflecting pool frame a central volume under dusk light.",
      "ar": "أروقة مقوسة وبركة عاكسة هادئة تؤطر الكتلة المركزية تحت ضوء الغروب."
    },
    "methodology": {
      "en": "3D modeling, lighting setup, rendering and post-production.",
      "ar": "النمذجة ثلاثية الأبعاد، إعداد الإضاءة، التصيير، والمعالجة النهائية."
    },
    "location": {
      "en": "Yemen",
      "ar": "اليمن"
    },
    "year": "2024",
    "status": "Completed",
    "role": {
      "en": "3D Visualization Artist",
      "ar": "فنان إظهار ثلاثي الأبعاد"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": true,
    "order": 4,
    "coverImage": "/images/projects/architectural-visualization-cover.webp",
    "gallery": [
      "/images/stock/historic-courtyard.webp",
      "/images/projects-header.webp",
      "/images/hero.webp"
    ]
  },
  {
    "_id": "sample-5",
    "_type": "project",
    "title": {
      "en": "Hillside Family House",
      "ar": "منزل عائلي على سفح جبل"
    },
    "slug": {
      "current": "hillside-family-house"
    },
    "category": {
      "_id": "Residential",
      "_type": "category",
      "nameEn": "Residential",
      "nameAr": "سكني"
    },
    "subtitle": {
      "en": "Living with the Landscape",
      "ar": "العيش مع الطبيعة"
    },
    "description": {
      "en": "A modern residence of clean lines and open spaces, integrated with its landscape. The design emphasizes natural light, cross ventilation and sustainable materials.",
      "ar": "سكن عصري بخطوط نظيفة ومساحات مفتوحة متكاملة مع المناظر الطبيعية. يركز التصميم على الإضاءة الطبيعية والتهوية المتقاطعة والمواد المستدامة."
    },
    "designConcept": {
      "en": "Stacked volumes with deep overhangs shade the glazing while framing views toward the garden and pool.",
      "ar": "كتل متراكبة ببروزات عميقة تظلل الزجاج وتؤطر الإطلالات نحو الحديقة والمسبح."
    },
    "methodology": {
      "en": "Concept sketches, Revit modeling, construction documents and photorealistic visualization.",
      "ar": "رسومات الفكرة، نمذجة Revit، المخططات التنفيذية، ثم الإظهار الواقعي."
    },
    "location": {
      "en": "Taiz, Yemen",
      "ar": "تعز، اليمن"
    },
    "year": "2023",
    "area": "320 m²",
    "status": "Completed",
    "role": {
      "en": "Architect",
      "ar": "مصمم معماري"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": false,
    "order": 5,
    "coverImage": "/images/stock/luxury-home.webp",
    "gallery": [
      "/images/stock/villa-green.webp",
      "/images/stock/livingroom-modern.webp",
      "/images/stock/villa-sunset.webp"
    ]
  },
  {
    "_id": "sample-6",
    "_type": "project",
    "title": {
      "en": "Boutique Hotel Lobby",
      "ar": "ردهة فندق بوتيك"
    },
    "slug": {
      "current": "boutique-hotel-lobby"
    },
    "category": {
      "_id": "Interior",
      "_type": "category",
      "nameEn": "Interior",
      "nameAr": "داخلي"
    },
    "subtitle": {
      "en": "Warm Hospitality Spaces",
      "ar": "مساحات ضيافة دافئة"
    },
    "description": {
      "en": "A refined interior blending traditional Yemeni touches with contemporary aesthetics: custom furniture, natural materials and layered lighting.",
      "ar": "تصميم داخلي راقٍ يمزج لمسات يمنية تقليدية بجماليات معاصرة: أثاث مخصص وخامات طبيعية وإضاءة متعددة الطبقات."
    },
    "designConcept": {
      "en": "A warm palette of bronze, stone and timber anchors the space around a large window and a single sculptural pendant.",
      "ar": "لوحة دافئة من البرونز والحجر والخشب تتمحور حول نافذة كبيرة وإضاءة تعليق نحتية."
    },
    "methodology": {
      "en": "Space planning, material boards, joinery details and 3D visualization.",
      "ar": "تخطيط الفراغ، لوحات الخامات، تفاصيل النجارة، والإظهار ثلاثي الأبعاد."
    },
    "location": {
      "en": "Sana'a, Yemen",
      "ar": "صنعاء، اليمن"
    },
    "year": "2022",
    "area": "600 m²",
    "status": "Completed",
    "role": {
      "en": "Interior Designer",
      "ar": "مصمم داخلي"
    },
    "scope": {
      "en": "Concept to documentation",
      "ar": "من الفكرة إلى التوثيق"
    },
    "software": [
      "Revit",
      "AutoCAD",
      "Lumion"
    ],
    "featured": false,
    "order": 6,
    "coverImage": "/images/stock/hotel-lobby-light.webp",
    "gallery": [
      "/images/stock/hotel-lobby-modern.webp",
      "/images/stock/hotel-lobby-ornate.webp",
      "/images/stock/interior-grand.webp"
    ]
  }
];

// Categories
export const categories: string[] = ['Residential', 'Commercial', 'Interior', 'Visualization'];

// Social links - only if real URLs are configured
export const socialLinks: { platform: string; url: string }[] = [];
