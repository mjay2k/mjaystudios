// What We Believe — the full statement of faith from jesusanoints.com/beliefs.
// Fourteen tenets, each with its supporting Scripture references.

export type Belief = {
  n: string;
  title: string;
  body: string;
  scripture: string;
};

export const beliefsIntro = {
  verse: {
    text: 'Make My Word of Truth known to your children and your children’s children.',
    ref: 'Deuteronomy 4:9',
  },
  lead:
    'We are a non-denominational, Holy Spirit–filled Christian ministry, founded on the unchanging, inerrant Word of God. These are the convictions we hold, teach, and live by.',
};

export const beliefs: Belief[] = [
  {
    n: '01',
    title: 'The One True God',
    body: 'There exists only one true and living God, eternal and unchanging, who reveals Himself as Father, Son, and Holy Spirit. He is perfect in all His ways: Creator, Redeemer, and Sustainer.',
    scripture: 'Deuteronomy 6:4; Isaiah 43:10–11; Matthew 28:19; Luke 3:22',
  },
  {
    n: '02',
    title: 'A Personal Relationship With Jesus Christ',
    body: 'Every believer must cultivate a personal, intimate, and abiding relationship with Jesus Christ. Apart from Him, nothing of spiritual value is possible. He provides life, strength, fellowship, guidance, and the assurance of His constant presence.',
    scripture: 'John 15:1–5; Hebrews 13:5–6',
  },
  {
    n: '03',
    title: 'Every Believer Has God-Given Ministry',
    body: 'Each believer possesses a unique ministry and calling from God, a distinct purpose. As members of the Body of Christ, believers teach, exhort, encourage, and admonish one another, facilitating spiritual maturity and the fulfilment of divine purpose.',
    scripture: 'Colossians 3:16; 1 Thessalonians 5:14; Colossians 1:28',
  },
  {
    n: '04',
    title: 'Water Baptism By Immersion',
    body: 'Water baptism through total immersion is Scripturally mandated. This act symbolizes the believer’s death with Christ and resurrection into new life, lived for God, freed from the unregenerated self and sinful nature. Baptism is an outward testimony to inward transformation and a public declaration of union with Christ.',
    scripture: 'Romans 6:4; Colossians 2:11–12',
  },
  {
    n: '05',
    title: 'The Authority Of The Holy Scriptures',
    body: 'The complete Bible constitutes inspired, God-breathed Scripture and the infallible standard for faith and conduct. Scripture is eternal, unchanging, and fully sufficient for teaching, correction, instruction, and equipping believers for every good work.',
    scripture: '2 Timothy 3:16–17; Psalm 119:89',
  },
  {
    n: '06',
    title: 'The Lord Jesus Christ',
    body: 'Jesus Christ, God’s only begotten Son, was conceived by the Holy Spirit and born of the Virgin Mary, living a sinless life as the perfect Lamb of God. He was crucified, died, buried, and rose on the third day in power and glory. He ascended to Heaven and sits at God’s right hand, reigning in majesty and authority. Jesus Christ alone deserves all worship, honor, and praise.',
    scripture: 'Matthew 1:20–24; Matthew 2:1; Ephesians 1:20–23',
  },
  {
    n: '07',
    title: 'The Holy Spirit God And His Baptism',
    body: 'Every believer receives the indwelling Holy Spirit at the moment of salvation. Believers should earnestly desire and seek the baptism (fullness) of the Holy Spirit, which empowers Christian life and accompanies manifestations of spiritual gifts and fruits. Through His presence, power, and workings, the Holy Spirit equips the Church to fulfil God’s will on earth.',
    scripture:
      'Matthew 3:11; Acts 10:47–48; Acts 4:31; Acts 2:1–47; 1 Corinthians 12:1–11; Galatians 5:22',
  },
  {
    n: '08',
    title: 'A Life Of Faith And Obedience',
    body: 'Christians maintain right standing with God through faith in Jesus Christ. This faith produces visible, Spirit-empowered fruit in personal, family, and church life. Genuine faith demonstrates itself through actions and character flowing from the indwelling Holy Spirit. True love for the Lord manifests in keeping and obeying His Word, an expression of love rather than burden.',
    scripture: 'Matthew 7:16–20; Romans 3:22; Galatians 2:16',
  },
  {
    n: '09',
    title: 'The Ministry And Work Of The Holy Spirit God',
    body: 'The Holy Spirit’s ministry glorifies Jesus Christ, convicts the world of sin, regenerates believers, and indwells, baptizes, guides, and empowers every believer for godly living and faithful service.',
    scripture: 'John 16:8–14; Titus 3:5; 1 Corinthians 12:13; Romans 8:9–14; Acts 1:8',
  },
  {
    n: '10',
    title: 'The Threefold Witness In The Life Of A Believer',
    body: 'Every believer must align personally with the Blood of Jesus, the Word of Jesus, and the Spirit of Jesus. These three bear witness and affirm the believer’s standing in Christ before the Father on judgment day.',
    scripture:
      '1 John 5:8; Ephesians 1:7; Hebrews 9:14; Revelation 12:1; John 17:17; Hebrews 4:12; James 1:21; Romans 8:16; John 14:26; Ephesians 1:13–14',
  },
  {
    n: '11',
    title: 'Tithes, Offerings And Compassionate Giving',
    body: 'Tithing and offerings belong in the local assembly where believers receive anointed instruction through dedicated shepherding. Compassionate giving includes providing alms and Christlike care for the poor, the sick, the homeless, and all in need.',
    scripture: 'Malachi 3:10–11; Luke 6:38; James 1:27',
  },
  {
    n: '12',
    title: 'The Unity And Equality Of All Believers In Jesus Christ',
    body: 'All humanity comprises one race before God. In Christ there exists no discrimination based on age, sex, or color. Christ is the focus, dwells in all believers, and can use anyone willing and obedient.',
    scripture:
      'Colossians 3:11; Galatians 3:28; Romans 2:11; Acts 17:26; Genesis 1:27; 1 Samuel 16:7; Acts 2:17–18; Acts 10:34–35',
  },
  {
    n: '13',
    title: 'The Resurrection Of The Saved And Unsaved',
    body: 'The saved experience bodily resurrection to everlasting life in God’s presence. The unsaved experience resurrection to judgment and everlasting separation from God.',
    scripture: 'John 5:28–29; Matthew 25:31–46; Acts 24:15; Revelation 22:1; Daniel 12:2',
  },
  {
    n: '14',
    title: 'The Personal And Imminent Return Of Jesus Christ',
    body: 'Jesus Christ will personally and imminently return for His Church, and every believer is called to watch, remain ready, and live in the expectation of that day.',
    scripture:
      'Acts 1:11; 1 Thessalonians 4:13–18; Revelation 1:7; Matthew 24:42–44; Titus 2:13; 2 Thessalonians 1:7–10; Matthew 25:31',
  },
];
