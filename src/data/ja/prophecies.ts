// Prophecy Records & Fulfillments — the public record from
// jesusanoints.com/prophecy-records-fulfillments.
//
// Every entry was publicly released before the corresponding event via
// YouTube, Facebook, or the ministry website. Status reflects the ministry's
// own designation on that page.

export type ProphecyStatus = 'Fulfilled' | 'Ongoing' | 'Awaiting';

export type Prophecy = {
  n: number;
  title: string;
  released: string;
  status: ProphecyStatus;
  body: string;
};

export const propheciesIntro = {
  verse: {
    text: 'In the midst of a crooked and wicked generation, you must be seen as bright lights in this dark fallen world.',
    ref: 'Philippians 2:15',
  },
  lead:
    'Test every prophetic message against Scripture, public evidence, and verifiable timelines. Each record below was released publicly before the event it describes.',
  standards: [
    'Publicly released before the event occurred',
    'Verifiable timestamps on YouTube, Facebook, or this site',
    'Specific rather than general predictions',
    'Events consistent with the message given',
    'Alignment with the whole counsel of Scripture',
  ],
};

export const prophecies: Prophecy[] = [
  { n: 1, title: 'Colombia Presidential Election', released: 'May 6, 2026', status: 'Fulfilled', body: 'Conservative Abelardo De La Espriella defeated left-wing Gustavo Petro in elections held May 31 and June 21, 2026.' },
  { n: 2, title: 'Scotland Elections', released: 'May 6, 2026', status: 'Fulfilled', body: 'No single-party majority resulted; the SNP remained largest but required cooperation with other parties.' },
  { n: 3, title: 'Iran Prophecy Series', released: 'March 3, March 26 & April 20, 2026', status: 'Fulfilled', body: 'Conflict involving Iran, Israel, and the USA would end within months; Iranian leadership would face pressure; peace would follow. Key Iranian officials were killed and a U.S.–Iran deal was signed.' },
  { n: 4, title: 'India General Election', released: 'January 6, 2024', status: 'Fulfilled', body: 'The BJP would not achieve an outright majority and a coalition government would be required. Results announced June 4, 2024 confirmed this outcome.' },
  { n: 5, title: 'Tamil Nadu Chief Minister Leadership', released: 'December 18, 2025', status: 'Fulfilled', body: 'Vijay would emerge as leader and become Tamil Nadu’s first Christian Chief Minister on May 10, 2026.' },
  { n: 6, title: 'Wicked Kings and Rulers', released: 'January 2, 2024', status: 'Fulfilled', body: 'God would overthrow wicked leadership. Venezuela’s Maduro was removed, Iran’s Khamenei was killed, and major leadership upheavals occurred globally.' },
  { n: 7, title: 'United States Presidential Election', released: '2020 & January 6, 2024', status: 'Fulfilled', body: 'Trump would win the November 2024 election and restore the nation to its foundational roots. Trump defeated Harris on November 5, 2024.' },
  { n: 8, title: '2022 FIFA World Cup Final', released: 'December 11, 2022', status: 'Fulfilled', body: 'Argentina and France would compete in the final. The match occurred December 18, 2022.' },
  { n: 9, title: 'Air India Tragedy', released: 'October 13, 2024', status: 'Fulfilled', body: 'An Air India plane crash involving the deaths of families and children. The crash occurred June 12, 2025.' },
  { n: 10, title: 'Assassination Attempts on President Trump', released: 'July 22, 2024', status: 'Fulfilled', body: 'Multiple assassination attempts symbolized by axes. Multiple attempts were reported between July 2024 and April 2026.' },
  { n: 11, title: 'Corruption, Fraud & Hidden Wrongdoing', released: '2022; reaffirmed December 18, 2025', status: 'Ongoing', body: 'Hidden corruption would be exposed. Investigations into California High-Speed Rail, COVID origins, and healthcare fraud followed.' },
  { n: 12, title: 'Media & Political Deception', released: 'December 2019 & December 2022', status: 'Ongoing', body: 'Spoken words and media narratives would manipulate public perception. Multiple media defamation cases and corrections occurred 2024–2026.' },
  { n: 13, title: 'Worldwide Increase in Natural Calamities', released: 'December 2, 2022', status: 'Ongoing', body: 'Earthquakes, tsunamis, floods, storms, and landslides would increase. The Turkey–Syria earthquakes (February 2023) and Libya flooding (September 2023) confirmed this.' },
  { n: 14, title: 'Extreme Heat & Global Boiling', released: 'December 2, 2022', status: 'Ongoing', body: '“Boiling temperatures and extreme heat shall be witnessed.” July 2023 became the hottest month on record, and 2023 the warmest year.' },
  { n: 15, title: 'Drought and Water Scarcity', released: 'December 2, 2022', status: 'Ongoing', body: 'Drying lakes, rivers, and water scarcity everywhere. Mississippi River historic lows, Argentine drought, and Amazon Basin low levels were reported 2023–2025.' },
  { n: 16, title: 'Increased Christian Persecution', released: 'December 2, 2022', status: 'Ongoing', body: '“Days of persecution and trials, especially for Christians.” Open Doors reported 360 million (2023) rising to 380 million (2025) facing persecution.' },
  { n: 17, title: 'Global Energy Crisis', released: 'December 2, 2022', status: 'Ongoing', body: 'A global energy crisis and a search for new, safe energy sources. A nuclear fusion breakthrough was announced December 5, 2022 and renewable investment expanded.' },
  { n: 18, title: 'Outpouring of the Holy Spirit & Revival', released: 'December 2, 2022', status: 'Ongoing', body: 'The Holy Spirit anointing poured out and revival beginning before Christ’s return. The Asbury Revival began February 8, 2023 and spread internationally.' },
  { n: 19, title: 'Advances in Artificial Intelligence and Science', released: 'December 2, 2022', status: 'Ongoing', body: 'Great advancements in AI and robotic science. ChatGPT released in 2022; AI expanded into education, healthcare, and business 2023–2025.' },
  { n: 20, title: 'Unusual Animal Behavior', released: 'December 2, 2022', status: 'Ongoing', body: 'Wild animals attacking humans and mysterious bird, animal, and sea creature behaviors. Mass bird deaths, whale strandings, and wild animal attacks were reported 2023–2025.' },
  { n: 21, title: 'New Viruses and Mystery Illnesses', released: 'December 2, 2022', status: 'Ongoing', body: 'New COVID hybrids and mystery illnesses would afflict nations. New variants (EG.5, JN.1, KP.2, KP.3, XEC) emerged and respiratory illness clusters were reported 2023–2025.' },
  { n: 22, title: 'Black Cloud Over the United States', released: 'December 2, 2022 (dream received September 2022)', status: 'Fulfilled', body: 'A dream of black cloud and smoke covering the U.S. In June 2023, Canadian wildfire smoke affected 115 million Americans and NYC recorded the worst air quality globally.' },
  { n: 23, title: 'Volcanic Eruptions', released: 'December 2, 2022', status: 'Ongoing', body: '“We will see lavas, volcanoes erupting.” The Smithsonian reported 75 confirmed eruptions during 2023 from 71 volcanoes.' },
  { n: 24, title: 'Increasing Global Acceptance of LGBTQ Ideology', released: 'December 2, 2022', status: 'Ongoing', body: 'LGBTQ ideology would gain broader acceptance and influence. Gallup reported 7.6% of U.S. adults identifying as LGBTQ (June 2023), rising to 9.3% (February 2025).' },
  { n: 25, title: 'Gender Identity Confusion Influencing Children and Schools', released: 'December 2, 2022', status: 'Ongoing', body: 'Schools and churches would be influenced by gender identity teachings and children would experience confusion. Widespread debates over classroom instruction occurred 2023–2025.' },
  { n: 26, title: 'Worldwide Protests and Cries for Justice', released: 'January 17, 2020', status: 'Ongoing', body: 'Protests everywhere demanding justice and human rights. George Floyd protests (May 2020), Hong Kong, Belarus, and Nigeria’s #EndSARS were documented.' },
  { n: 27, title: 'Increasing Moral Depravity', released: 'January 17, 2020', status: 'Ongoing', body: 'Human minds becoming more depraved and inhuman. Increases in violence, exploitation, trafficking, and polarization were documented 2020–2026.' },
  { n: 28, title: 'Great Falling Away From Faith', released: 'January 17, 2020', status: 'Ongoing', body: '“The great falling away from faith has begun.” Pew Research recorded Christian identification declining from 78% (2007) to 63% (2022), with the unaffiliated rising from 16% to 29%.' },
  { n: 29, title: 'Corruption and Injustice in Politics and Institutions', released: 'January 17, 2020', status: 'Ongoing', body: 'Corruption and injustice, especially in politics and institutions. Transparency International documented widespread institutional corruption 2020–2023.' },
  { n: 30, title: 'Great Division Among People', released: 'January 17, 2020', status: 'Ongoing', body: 'Great division based on creed, color, race, doctrine, and origin. Pew polarization research tracked deep American political and social divisions.' },
  { n: 31, title: 'Knowledge Increasing While Rejecting God', released: 'January 17, 2020', status: 'Ongoing', body: 'Knowledge increases everywhere while mankind rejects the knowledge of God. AI expansion paralleled religious disaffiliation.' },
  { n: 32, title: 'A Sodom & Gomorrah Generation', released: 'January 17, 2020', status: 'Ongoing', body: 'A generation characterized by protests, depraved minds, division, violence, sexual confusion, and rejection of God’s truth, unfolding through documented social trends.' },
  { n: 33, title: 'Prophetic Warning Concerning the United States & President Trump', released: 'December 17, 2025', status: 'Ongoing', body: 'A dream about attacks and pressure against the President and the U.S. Political tension, threats, and division were documented immediately following the prophecy.' },
  { n: 34, title: 'Religious Wars, Global Conflict & Increasing Chaos', released: 'September 21, 2021', status: 'Ongoing', body: 'A dream showing widespread chaos, fighting, looting, and destruction globally. The Russia–Ukraine invasion (February 2022) and Hamas–Israel war (October 2023) were documented.' },
  { n: 35, title: 'Scarcity, Food Shortages & Lean Years', released: '2024', status: 'Ongoing', body: 'Food shortages and famine-like conditions. The 2025 Global Report on Food Crises found 295 million people across 53 countries experienced acute hunger in 2024.' },
  { n: 36, title: 'Lawlessness, Crime, Violence & Moral Decline', released: '2024', status: 'Ongoing', body: 'Lawlessness, crime, violence, and moral decline escalating. ACLED documented rising conflict and the UNODC Global Study on Homicide 2023 confirmed increases in violence.' },
  { n: 37, title: 'Youth Mental Health Crisis', released: 'March 21, 2022; released publicly October 26, 2022', status: 'Ongoing', body: '“Mysterious deaths and suicides, especially among younger generations and kids.” The CDC 2023 Youth Risk Behavior Survey reported an ongoing mental health crisis among high school students.' },
  { n: 38, title: 'Biden Winning in 2020, but Darkness and Failure', released: 'November 7, 2020 (dream received November 4)', status: 'Ongoing', body: 'A dream showed Biden winning but the atmosphere dark, troubled, and spiritually unclean. Biden won November 7, 2020; the presidency faced major disapproval and he withdrew from the 2024 race.' },
  { n: 39, title: 'Russia–Ukraine War Escalation', released: 'December 7, 2021 (before the invasion)', status: 'Fulfilled', body: 'The prophecy described Russia preparing military forces along the Ukraine border. The full-scale invasion occurred February 24, 2022.' },
  { n: 40, title: 'Healing Through Medical Advancements & AI', released: 'December 2, 2022; reaffirmed December 15, 2025', status: 'Ongoing', body: 'Healing through medical advancements and AI technology. The FDA maintains a list of AI-enabled medical devices and AI expanded in healthcare 2022–2026.' },
  { n: 41, title: 'Food Supply Cleansing & Harmful Additives', released: 'December 17, 2025', status: 'Ongoing', body: 'Heightened awareness of food safety and the food system cleansed from toxins and additives. The FDA revoked Red No. 3 authorization (2025) and reassessed BHT and azodicarbonamide (2026).' },
  { n: 42, title: 'UFO / UAP Prophecy & Spiritual Discernment', released: 'October 26, 2022 (dream received October 2022)', status: 'Ongoing', body: 'A dream of UFOs filling American skies, with a spiritual warning about darkness and deception. In May 2026 the U.S. government released UFO/UAP files and CBS reported 28 videos.' },
  { n: 43, title: 'Victory, Protection, Warning and Restoration for America', released: 'December 18, 2025', status: 'Ongoing', body: 'God would protect Trump, expose hidden corruption, and establish justice. Investigations, arrests, and prosecutions were documented following the prophecy release.' },
  { n: 44, title: 'Europe Including the United Kingdom', released: 'July 7, 2025', status: 'Awaiting', body: '“God’s light is once again shining upon the nations of Europe, including the United Kingdom.” Awaiting fulfillment documentation.' },
  { n: 45, title: 'Ohio Governor and United States Senate Elections', released: 'July 8, 2026', status: 'Awaiting', body: 'Vivek Ramaswamy would be elected Ohio Governor and Jon Husted would retain his Senate seat. The election is scheduled for November 3, 2026.' },
  { n: 46, title: 'United States Congressional Elections', released: 'December 15, 2025', status: 'Awaiting', body: 'The Republican Party would retain Senate and House majorities on November 3, 2026. Elections have not yet been held.' },
  { n: 47, title: 'São Tomé and Príncipe Presidential Election', released: 'June 24, 2026', status: 'Fulfilled', body: 'Incumbent Carlos Vila Nova would prevail. July 19, 2026 results: Vila Nova won over 55% of the vote; Nito Abreu received over 41%.' },
  { n: 48, title: 'China’s Interference in the 2020 U.S. Election', released: 'July 9, 2023 (dream received November 2020)', status: 'Fulfilled', body: 'A dream about China’s involvement in the U.S. election. In July 2026 the White House published documents on China’s acquisition and exploitation of American voter data.' },
  { n: 49, title: 'AI Humanoids, Artificial Pleasure & the Coming Great Deception', released: 'July 24, 2026 (dream received July 20, 2026)', status: 'Awaiting', body: 'Advanced AI humanoids created for artificial pleasure; humanity rejecting Christ; churches abandoned. Believers are warned to guard their hearts and stay spiritually awake.' },
  { n: 50, title: 'The Floodwaters of This World', released: 'August 1, 2026', status: 'Awaiting', body: 'Floodwaters representing worldly influences overwhelming people, with shelter representing Jesus Christ as the firm foundation. A call to keep our eyes on Christ.' },
  { n: 51, title: 'Major Earthquake, Volcanic Activity & Nations Coming Together', released: 'August 1, 2026', status: 'Fulfilled', body: 'A dream of a major earthquake, volcanic eruptions, and nations cooperating. On August 10, 2026 a 7.4 magnitude earthquake hit Colombia, Mount Etna erupted, and multiple nations offered assistance.' },
];
