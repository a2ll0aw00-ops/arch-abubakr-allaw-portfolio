export type LocalizedText = { ar: string; en: string };

export const cvResume = {
  name: { ar: 'أبوبكر عبد الله محمد علاو', en: 'ABUBAKR ABDULLAH MOHAMMED ALLAW' },
  role: { ar: 'مهندس معماري', en: 'Architect' },
  descriptor: { ar: 'التصميم المعماري · الرسومات الفنية · Revit وBIM', en: 'Architectural Design · Technical Drawings · Revit & BIM' },
  location: { ar: 'إب، اليمن', en: 'Ibb, Yemen' },
  phone: '+967 774909641',
  email: 'arch.abubakrallaw@gmail.com',
  linkedin: 'https://linkedin.com/in/archabubakrallaw/',
  portfolioLabel: { ar: 'البورتفوليو المعماري', en: 'Architectural Portfolio' },
  summary: {
    ar: [
      'مهندس معماري حاصل على درجة البكالوريوس في الهندسة المعمارية من جامعة إب، ولدي خبرة مهنية في المساهمة بتطوير المشاريع المعمارية، مع تركيز على المشاريع السكنية وتصميم الواجهات والتصميم الداخلي وإعداد المخططات والرسومات الفنية.',
      'أمتلك خبرة في استخدام AutoCAD لإعداد وتطوير الرسومات المعمارية، إلى جانب العمل على النماذج ثلاثية الأبعاد والإظهار المعماري باستخدام Revit وSketchUp وLumion. كما ساهمت في مشاريع مرتبطة بعملاء في المملكة العربية السعودية والإمارات العربية المتحدة والكويت، مع الاهتمام بفهم متطلبات التصميم ومراجعة المخرجات وتطويرها وفق ملاحظات العملاء.',
      'أطمح إلى توظيف مهاراتي التصميمية والتقنية في تطوير حلول معمارية تجمع بين كفاءة الوظيفة وجودة التكوين ودقة التفاصيل، وتستجيب لاحتياجات العملاء ومتطلبات المشروع.',
    ],
    en: [
      "Architect with a Bachelor's degree in Architectural Engineering from the University of Ibb and professional experience contributing to architectural project development, with a focus on residential projects, façade design, interior design, and the preparation of plans and technical drawings.",
      'Experienced in using AutoCAD to prepare and develop architectural drawings, as well as creating 3D models and architectural visualizations with Revit, SketchUp, and Lumion. Contributed to projects for clients in Saudi Arabia, the United Arab Emirates, and Kuwait, with attention to understanding design requirements, reviewing deliverables, and developing them in response to client feedback.',
      'I aim to apply my design and technical skills to develop architectural solutions that combine functional efficiency, quality composition, and precise detailing while responding to client needs and project requirements.',
    ],
  } satisfies Record<'ar' | 'en', string[]>,
  experience: [
    {
      role: { ar: 'مهندس معماري', en: 'Architect' },
      company: { ar: 'مكتب عمد للاستشارات الهندسية والتطوير العقاري', en: 'Amd Office for Engineering Consultancy and Real Estate Development' },
      meta: { ar: 'إب، اليمن | 2024 – حتى الآن', en: 'Ibb, Yemen | 2024 – Present' },
      responsibilities: [
        { ar: 'المساهمة ضمن الفريق المعماري في تطوير الأفكار والحلول التصميمية لمشاريع متنوعة.', en: 'Contribute to developing design ideas and solutions for a range of projects as part of the architectural team.' },
        { ar: 'إعداد وتطوير المخططات والرسومات المعمارية ثنائية الأبعاد باستخدام AutoCAD.', en: 'Prepare and develop 2D architectural plans and drawings using AutoCAD.' },
        { ar: 'إعداد النماذج المعمارية ثلاثية الأبعاد باستخدام Revit.', en: 'Create 3D architectural models using Revit.' },
        { ar: 'إنتاج التصورات والرندرات المعمارية باستخدام Lumion لدعم عرض الأفكار التصميمية.', en: 'Produce architectural visualizations and renders using Lumion to communicate design ideas.' },
        { ar: 'المساهمة في تطوير التصميم الداخلي والفراغات المعمارية وفق طبيعة المشروع ومتطلباته.', en: 'Contribute to interior design and spatial development in line with each project’s nature and requirements.' },
        { ar: 'مراجعة المخرجات وتحديثها بما يتوافق مع الملاحظات الفنية ومتطلبات فريق العمل.', en: 'Review and update deliverables in response to technical comments and team requirements.' },
      ],
    },
    {
      role: { ar: 'مهندس معماري | عمل تعاقدي عن بُعد', en: 'Architect | Remote Contract Work' },
      company: { ar: 'مكتب أوتاد للتصاميم المعمارية', en: 'Awtad Architectural Design Office' },
      meta: { ar: 'تعاون عن بُعد مع المكتب في المملكة العربية السعودية | 2024 – حتى الآن', en: 'Remote collaboration with an office in Saudi Arabia | 2024 – Present' },
      responsibilities: [
        { ar: 'المساهمة في تنفيذ مهام تصميمية لمشاريع معمارية وفق نظام التعاقد بحسب احتياجات المكتب.', en: 'Contribute to design tasks for architectural projects on a contract basis according to the office’s needs.' },
        { ar: 'تطوير واجهات الفلل السكنية والشاليهات، مع الاهتمام بالتكوين المعماري والتناسب والخامات.', en: 'Develop façades for residential villas and chalets, with attention to architectural composition, proportion, and materials.' },
        { ar: 'إعداد تصاميم داخلية لفلل سكنية بأساليب معمارية متنوعة، تشمل الطرازين المودرن والكلاسيكي.', en: 'Prepare interior designs for residential villas in different styles, including modern and classical.' },
        { ar: 'تطوير النماذج ثلاثية الأبعاد والتصورات البصرية والرسومات المرتبطة بالتصميم.', en: 'Develop 3D models, visualizations, and design-related drawings.' },
        { ar: 'مراجعة التصميمات وإجراء التعديلات وفق متطلبات المشروع وملاحظات العملاء.', en: 'Review designs and make revisions according to project requirements and client feedback.' },
        { ar: 'التعامل مع مشاريع مرتبطة بعملاء في السعودية والإمارات والكويت.', en: 'Work on projects associated with clients in Saudi Arabia, the United Arab Emirates, and Kuwait.' },
      ],
    },
  ],
  technicalSkillGroups: [
    {
      title: { ar: 'التصميم والرسم المعماري', en: 'Architectural Design & Drafting' },
      skills: [
        { name: { ar: 'AutoCAD', en: 'AutoCAD' }, level: { ar: 'متقدم', en: 'Advanced' }, description: { ar: 'إعداد وتطوير المخططات المعمارية والرسومات ثنائية الأبعاد والتفاصيل الفنية.', en: 'Prepare and develop architectural plans, 2D drawings, and technical details.' } },
        { name: { ar: 'Revit', en: 'Revit' }, level: { ar: 'النمذجة والتوثيق المعماري', en: 'Architectural Modeling & Documentation' }, description: { ar: 'إنشاء النماذج المعمارية وإعداد اللوحات والمخرجات ضمن سير عمل نمذجة معلومات البناء (BIM).', en: 'Create architectural models and prepare sheets and deliverables within a Building Information Modeling (BIM) workflow.' } },
        { name: { ar: 'SketchUp', en: 'SketchUp' }, level: { ar: 'متقدم', en: 'Advanced' }, description: { ar: 'التصميم المفاهيمي، وتطوير الكتل، وإنشاء النماذج المعمارية ثلاثية الأبعاد.', en: 'Conceptual design, massing development, and 3D architectural modeling.' } },
      ],
    },
    {
      title: { ar: 'النمذجة والإظهار المعماري', en: 'Architectural Modeling & Visualization' },
      skills: [
        { name: { ar: 'Lumion', en: 'Lumion' }, level: { ar: 'متقدم', en: 'Advanced' }, description: { ar: 'الإظهار المعماري وإنتاج الرندرات والمشاهد الداخلية والخارجية.', en: 'Architectural visualization and production of renders and interior and exterior scenes.' } },
        { name: { ar: '3ds Max', en: '3ds Max' }, level: { ar: 'متوسط', en: 'Intermediate' }, description: { ar: 'النمذجة والإظهار ثلاثي الأبعاد، مع تدريب متخصص في البرنامج.', en: '3D modeling and visualization, with specialized training in the software.' } },
      ],
    },
    {
      title: { ar: 'التصميم الجرافيكي وإعداد العروض', en: 'Graphic Design & Presentation Production' },
      skills: [
        { name: { ar: 'Adobe Photoshop', en: 'Adobe Photoshop' }, level: { ar: 'متوسط', en: 'Intermediate' }, description: { ar: 'معالجة الصور وتحسين المخرجات البصرية.', en: 'Image editing and enhancement of visual deliverables.' } },
        { name: { ar: 'Adobe Illustrator', en: 'Adobe Illustrator' }, level: { ar: 'أساسي', en: 'Basic' }, description: { ar: 'إعداد الرسومات والعناصر البصرية.', en: 'Preparation of drawings and visual elements.' } },
        { name: { ar: 'Adobe InDesign', en: 'Adobe InDesign' }, level: { ar: 'أساسي', en: 'Basic' }, description: { ar: 'تنسيق صفحات البورتفوليو والعروض متعددة الصفحات.', en: 'Layout of portfolio pages and multi-page presentations.' } },
      ],
    },
  ],
  education: [
    { degree: { ar: 'بكالوريوس الهندسة المعمارية', en: "Bachelor's Degree in Architectural Engineering" }, institution: { ar: 'جامعة إب — كلية الهندسة والعمارة', en: 'University of Ibb — Faculty of Engineering and Architecture' }, details: { ar: 'قسم الهندسة المعمارية | 2018–2023 | التقدير: جيد | المعدل: 77.63%', en: 'Department of Architecture | 2018–2023 | Grade: Good | GPA: 77.63%' } },
    { degree: { ar: 'دبلوم اللغة الإنجليزية', en: 'English Language Diploma' }, institution: { ar: 'جامعة إب — مركز اللغات والترجمة', en: 'University of Ibb — Center for Languages and Translation' }, details: { ar: '2017–2018 | النسبة: 92% | التقدير: ممتاز', en: '2017–2018 | Score: 92% | Grade: Excellent' } },
    { degree: { ar: 'الثانوية العامة', en: 'General Secondary Education' }, institution: { ar: 'مدرسة النهضة — إب', en: 'Al-Nahda School — Ibb' }, details: { ar: '2016–2017 | النسبة: 92% | التقدير: ممتاز', en: '2016–2017 | Score: 92% | Grade: Excellent' } },
  ],
  training: [
    { title: { ar: 'تدريب 3ds Max', en: '3ds Max Training' }, organization: { ar: 'أكاديمية بناء بالتعاون مع قسم التدريب بجامعة إب', en: 'Binaa Academy in cooperation with the Training Department at the University of Ibb' }, details: { ar: 'التقدير: امتياز.', en: 'Grade: Excellent.' } },
  ],
  selectedProjects: [
    { title: { ar: 'منتجع وادي ورزان السياحي', en: 'Wadi Warzan Tourist Resort' }, meta: { ar: 'مشروع التخرج | تعز، اليمن | 2023', en: 'Graduation Project | Taiz, Yemen | 2023' }, description: { ar: 'تصميم مشروع سياحي متعدد المكونات، مع تطوير الفكرة المعمارية بما يتناسب مع طبيعة الموقع، وإعداد المخططات والتصميم ثلاثي الأبعاد والإظهار المعماري.', en: 'Design of a multi-component tourism project, developing the architectural concept to suit the site and preparing plans, 3D design, and architectural visualizations.' } },
    { title: { ar: 'تصميم واجهة شاليه سكني', en: 'Residential Chalet Façade Design' }, meta: { ar: 'الكويت | 2024', en: 'Kuwait | 2024' }, description: { ar: 'تطوير واجهة معمارية لشاليه سكني بطابع عصري، مع مراعاة التناسب والتكوين المعماري وطبيعة الاستخدام الترفيهي.', en: 'Development of a contemporary façade for a residential chalet, considering proportion, architectural composition, and its recreational use.' } },
    { title: { ar: 'تصميم قاعة أفراح', en: 'Wedding Hall Design' }, meta: { ar: 'مكتب عمد للاستشارات الهندسية والتطوير العقاري | إب، اليمن | 2025', en: 'Amd Office for Engineering Consultancy and Real Estate Development | Ibb, Yemen | 2025' }, description: { ar: 'المساهمة ضمن الفريق المعماري في تطوير الفكرة التصميمية والفراغات الداخلية، وإعداد النماذج ثلاثية الأبعاد والعروض التقديمية للمشروع.', en: 'Contributed as part of the architectural team to the design concept and interior spaces, and prepared 3D models and project presentations.' } },
    { title: { ar: 'التصميم الداخلي لفلل سكنية', en: 'Residential Villa Interior Design' }, meta: { ar: 'عبر مكتب أوتاد للتصاميم المعمارية | السعودية | 2024–2025', en: 'Through Awtad Architectural Design Office | Saudi Arabia | 2024–2025' }, description: { ar: 'المساهمة في تصميم داخلي لفلل بطرازين مودرن وكلاسيكي، مع تطوير التصورات ثلاثية الأبعاد والمخرجات التصميمية والرسومات ذات الصلة.', en: 'Contributed to interior design for villas in modern and classical styles, developing 3D visualizations, design deliverables, and related drawings.' } },
    { title: { ar: 'تطوير الهوية البصرية لمكتب عمد الهندسي', en: 'Visual Identity Development for Amd Engineering Office' }, meta: { ar: 'مكتب عمد للاستشارات الهندسية والتطوير العقاري | 2025', en: 'Amd Office for Engineering Consultancy and Real Estate Development | 2025' }, description: { ar: 'المساهمة في إعداد الشعار وتنسيق الألوان والعناصر البصرية بما يتناسب مع هوية المكتب.', en: 'Contributed to logo development and coordination of colors and visual elements to suit the office identity.' } },
  ],
  professionalSkills: [
    { ar: 'تطوير الحلول التصميمية وفق متطلبات المشروع واحتياجات العميل.', en: 'Develop design solutions in line with project requirements and client needs.' },
    { ar: 'التفكير المعماري وتخطيط الفراغات.', en: 'Architectural thinking and spatial planning.' },
    { ar: 'الاهتمام بالتفاصيل ودقة الرسومات والمخرجات.', en: 'Attention to detail and accuracy in drawings and deliverables.' },
    { ar: 'استقبال الملاحظات وتحويلها إلى تعديلات تصميمية واضحة.', en: 'Receive feedback and translate it into clear design revisions.' },
    { ar: 'التواصل والتعاون ضمن فريق العمل.', en: 'Communication and collaboration within a team.' },
    { ar: 'التعلم الذاتي وتطوير المهارات التقنية.', en: 'Self-directed learning and development of technical skills.' },
    { ar: 'تنظيم المهام والملفات والالتزام بالمواعيد.', en: 'Organization of tasks and files, and adherence to deadlines.' },
  ] satisfies LocalizedText[],
  languages: [
    { name: { ar: 'العربية', en: 'Arabic' }, level: { ar: 'اللغة الأم', en: 'Native' } },
    { name: { ar: 'الإنجليزية', en: 'English' }, level: { ar: 'مستوى متوسط', en: 'Intermediate' } },
  ],
};
