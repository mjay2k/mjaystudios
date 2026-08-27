// Curated content for the Jesus Anoints Ministries preview (/jaministries).
// Sourced from jesusanoints.com via scripts/scrape-ja.mjs, edited for the front-page concepts.
// This is the single source of truth — all four concepts import from here.

export const site = {
  name: 'Jesus Anoints Ministries',
  shortName: 'Jesus Anoints',
  tagline: 'Touching the world, one soul at a time.',
  pillars: 'Equipping • Empowering • Enriching Lives',
  established: '501(c)(3) non-profit ministry',

  verse: {
    text: 'And you will be a fruitful tree planted and fed by the streams of water, the Word of God.',
    ref: 'Psalm 1:3',
  },

  // Supporting scriptures used throughout the site.
  scriptures: [
    {
      text: '"Not by might, nor by power, but by My Spirit," says the Lord of hosts.',
      ref: 'Zechariah 4:6',
    },
    {
      text: 'The anointing which you have received of Him abides in you, and the same anointing teaches you all things.',
      ref: '1 John 2:27',
    },
    {
      text: 'Where the Spirit of the Lord is, there is liberty.',
      ref: '2 Corinthians 3:17',
    },
  ],

  // Primary navigation (matches the existing site's information architecture).
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Beliefs', href: '#beliefs' },
    { label: 'Programs', href: '#programs' },
    { label: 'Prophecies', href: '#prophecies' },
    { label: 'Books', href: '#books' },
    { label: 'Give', href: '#give' },
  ],

  // Every section from the jesusanoints.com tab bar, grouped for the
  // "Explore" dropdown so nothing from the old site's IA is lost.
  explore: [
    {
      group: 'The Ministry',
      items: [
        { label: 'Welcome', href: '/jaministries#mission', note: 'Who we are and why we exist' },
        { label: 'About', href: '/jaministries#testimony', note: 'Evangelist Samuel Meesala' },
        { label: 'Beliefs', href: '/jaministries/beliefs', note: 'Fourteen convictions, in full' },
        { label: 'Staff', href: '/jaministries#staff', note: 'The family serving this work' },
      ],
    },
    {
      group: 'Ministry Life',
      items: [
        { label: 'Gallery', href: '/jaministries#gallery', note: 'Crusades, gatherings, and travels' },
        { label: 'Books', href: '/jaministries#books', note: 'Titles by Samuel Meesala' },
        { label: 'Prophecy Records', href: '/jaministries/prophecy-records', note: 'The dated public record' },
        { label: 'Journal', href: '/jaministries/blog', note: 'Teachings and recent posts' },
      ],
    },
    {
      group: 'Trust & Contact',
      items: [
        { label: 'Platinum Seal', href: '/jaministries#seal', note: 'Candid transparency certification' },
        { label: 'Credentials', href: '/jaministries#credentials', note: 'Ministry credentialing' },
        { label: 'Pray & Contact', href: '/jaministries/pray', note: 'Prayer requests and how to reach us' },
        { label: 'Give', href: '/jaministries/give', note: 'Partner with the ministry' },
      ],
    },
  ],

  credentials:
    'As part of our ministry order and spiritual accountability, Jesus Anoints Ministries recognizes and issues ministry credentials for qualified servants of God, anointed in the Holy Spirit, who have demonstrated faithfulness, sound doctrine, spiritual maturity, and a sincere calling to serve Jesus Christ and His people.',

  staff: [
    {
      name: 'Evangelist Samuel Meesala',
      role: 'Founder · Evangelist · Christian Author · Chaplain',
      body: 'Leads the ministry in preaching, teaching, and prophetic ministry, reaching believers worldwide.',
    },
    {
      name: 'Tiffany Meesala',
      role: 'Ministry Partner',
      body: 'A fellow graduate in Religious Studies who shares a deep passion for the Word of God and Christian ministry.',
    },
    {
      name: 'Joshua Meesala',
      role: 'Family',
      body: 'Son of Samuel and Tiffany, currently pursuing his studies toward becoming a physician assistant.',
    },
  ],

  gallery: {
    heading: 'Twenty years of ministry',
    body: 'Crusades, gatherings, prayer, and travels: moments from the work God has done through this ministry across the nations.',
  },

  welcome: {
    heading: 'Welcome',
    lead: 'We are a non-denominational, Holy Spirit–filled Christian ministry, founded on the unchanging, inerrant Word of God.',
    body: [
      'Our calling is to exhort, edify, and comfort the Body of Christ through Spirit-led teaching, gatherings, and evangelistic crusades. We are passionate about equipping believers to walk in salvation, righteousness, and their God-given purpose.',
      'Our greatest desire is to bring glory, honor, and praise to our Lord and Savior, Jesus Christ. Everything we do depends not on human strength or ability, but on the Spirit of God who works within us.',
    ],
  },

  about: {
    name: 'Evangelist Samuel Meesala',
    role: 'Founder · Evangelist · Christian Author',
    lead: 'A global gospel ministry dedicated to proclaiming the Word of God, the Lordship of Jesus Christ, and the work of the Holy Spirit in these last days.',
    body: [
      'Samuel Meesala is known for his Bible-centered teaching, prophetic insight, and emphasis on spiritual maturity, holiness, and unity in the Body of Christ. Through Jesus Anoints Ministries he conducts preaching engagements, online broadcasts, teaching series, and prophetic messages, reaching believers worldwide via YouTube and Facebook.',
      'He is also a two-time kidney transplant recipient, whose personal testimony of healing and endurance through end-stage renal failure has strengthened his message of faith, perseverance, and total dependence on God.',
    ],
    family:
      'Samuel is joyfully married to his wife, Tiffany Meesala, a fellow graduate in Religious Studies. Together with their son, Joshua, the Meesala family serves the Lord in unity, humility, and devotion.',
    portrait: '/jaministries/curated/portrait-brown.jpg',
    portraitAlt: '/jaministries/curated/portrait-cream.jpg',
  },

  // What we believe — the nine tenets (titles from the Beliefs page).
  beliefs: [
    { n: '01', title: 'The One True God', body: 'Eternal and unchanging, revealed as Father, Son, and Holy Spirit.' },
    { n: '02', title: 'A Personal Relationship with Jesus Christ', body: 'Every believer is called to an intimate, abiding walk with Christ.' },
    { n: '03', title: 'Every Believer Has God-Given Ministry', body: 'Each one is gifted and called to serve the Body of Christ.' },
    { n: '04', title: 'Water Baptism by Immersion', body: 'An outward witness of an inward transformation in Christ.' },
    { n: '05', title: 'The Authority of the Holy Scriptures', body: 'The inerrant, inspired, and unchanging Word of God.' },
    { n: '06', title: 'The Lord Jesus Christ', body: 'Fully God and fully man, our Savior, life, and source of strength.' },
    { n: '07', title: 'The Holy Spirit and His Baptism', body: 'The empowering presence of God for life and ministry.' },
    { n: '08', title: 'A Life of Faith and Obedience', body: 'Walking by faith, in holiness, and in glad obedience to God.' },
    { n: '09', title: 'The Ministry and Work of the Holy Spirit', body: 'Teaching, guiding, and bearing fruit through every believer.' },
  ],

  // Ministry programs / what we do.
  programs: [
    { title: 'Evangelistic Crusades', body: 'Spirit-led gatherings proclaiming the gospel and the Lordship of Jesus Christ.' },
    { title: 'Teaching Series', body: 'Bible-centered teaching for spiritual maturity, holiness, and unity.' },
    { title: 'Prophetic Messages', body: 'Prophetic insight and a public record of revelation given and fulfilled.' },
    { title: 'Online Broadcasts', body: 'Reaching believers worldwide through YouTube, Facebook, and digital platforms.' },
  ],

  // Recent prophecy / blog posts (real titles from the site).
  prophecies: [
    { date: 'June 14, 2026', title: 'Iran War Prophecies Fulfilled', tag: 'Public Record' },
    { date: '', title: 'When Spiritual Leadership Becomes Control', tag: 'Teaching' },
    { date: '', title: 'The Exodus Reveals Christ: From Bondage to Eternal Inheritance', tag: 'Teaching' },
    { date: '', title: '4 Major Prophecies Fulfilled: A Public Record', tag: 'Public Record' },
    { date: '', title: 'Trump Coming to Power in 2024: Prophecy Released 2020, 2022 & 2024', tag: 'Public Record' },
    { date: '', title: 'FCRA Bill 2026: Persecution of Minorities Prophecy Fulfilled in India', tag: 'Public Record' },
  ],

  books: [
    {
      title: 'The Silence of God',
      subtitle: 'A Season When He Hides His Face and Heaven Withholds Its Light',
      cover: '/jaministries/curated/book-silence.jpg',
      href: 'https://www.amazon.com/author/samuelmeesala',
    },
    {
      title: 'Restoring the Body of Christ',
      subtitle: 'A Call to Unity, Truth, and Spiritual Maturity in the Last Days',
      cover: '/jaministries/curated/book-restoring.jpg',
      href: 'https://www.amazon.com/author/samuelmeesala',
    },
  ],

  give: {
    heading: 'Partner With the Ministry',
    body: 'Your generosity helps us proclaim the gospel, teach the Word, and reach believers around the world. Jesus Anoints Ministries is a registered 501(c)(3) non-profit, certified with the Candid Platinum Transparency Seal.',
    cta: 'Give Now',

  },

  // Pray / Contact — details as published on jesusanoints.com/pray
  contact: {
    heading: 'Pray With Us',
    lead: 'Whatever you are facing, you do not have to face it alone. Send us your prayer request, or reach out with any question. We read every message, and we pray.',
    emails: ['Jesusanoints@aol.com', 'Samueltiffany7@gmail.com'],
    phone: '1-573-987-9297',
    address: '2519 Travelers Way, Jackson, Missouri 63755',
    hours: [
      { days: 'Tuesday & Thursday', time: '8:00 AM – 4:30 PM' },
      { days: 'Saturday', time: '8:30 AM – 4:30 PM' },
      { days: 'Sun · Mon · Wed · Fri', time: 'Closed' },
    ],
  },

  // Curated imagery (scraped + cropped). Note: source photos are modest resolution;
  // hero treatments should degrade gracefully and may be replaced with higher-res later.
  images: {
    familyCross: '/jaministries/curated/family-cross.jpg',
    dovesSky: '/jaministries/curated/doves-sky.jpg',
    portraitBrown: '/jaministries/curated/portrait-brown.jpg',
    portraitCream: '/jaministries/curated/portrait-cream.jpg',
  },

  brand: {
    // 2026-08 client logo: royal-blue script + gold dove wrapping the globe, on white.
    // This is the canonical mark for the new directions (raster, white ground —
    // place it on light surfaces or inside a white plate).
    logo2026: '/jaministries/brand/logo-2026.png',
    // Globe-and-dove mark cropped from the 2026 logo — for headers/favicons
    // where the full lockup is too detailed to shrink.
    icon2026: '/jaministries/brand/icon-2026.png',
    // Earlier 2026 system. *Rev variants are for dark surfaces;
    // the plain variants are for light. iconGhost is a faint watermark dove.
    logoHorizontal: '/jaministries/brand/logo-horizontal.svg',
    logoHorizontalRev: '/jaministries/brand/logo-horizontal-rev.svg',
    logoStacked: '/jaministries/brand/logo-stacked.svg',
    logoStackedRev: '/jaministries/brand/logo-stacked-rev.svg',
    iconGold: '/jaministries/brand/icon-gold.svg',
    iconLight: '/jaministries/brand/icon-light.svg',
    iconGhost: '/jaministries/brand/icon-ghost.svg',
    // back-compat aliases (used by older concept code)
    logo: '/jaministries/brand/logo-horizontal-rev.svg',
    icon: '/jaministries/brand/icon-gold.svg',
  },

  social: {
    facebook: 'https://www.facebook.com/jesusanoints/',
    youtube: 'https://www.youtube.com/channel/UCBxCnqv-S1cm-ukcoeo7-eg',
    amazon: 'https://www.amazon.com/author/samuelmeesala',
  },

  transparency:
    'Registered 501(c)(3) non-profit · Candid Platinum Transparency Seal',
} as const;

export type Site = typeof site;
