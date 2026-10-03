// Cited numbers used in the preview. Every figure shown on the site comes from
// here so the source travels with it. Full research notes: docs/labradon/research.md.

export type Fact = { id: string; value: string; label: string; source: string; url: string };

export const facts = {
  vacantDays: {
    id: 'vacantDays',
    value: '34.4',
    label: 'days an average apartment sits empty between residents',
    source: 'RealPage, 2025',
    url: 'https://www.realpage.com/analytics/vacant-days-climbs/',
  },
  turnCost: {
    id: 'turnCost',
    value: '$3,872',
    label: 'average all-in cost of one apartment turnover',
    source: 'Zego survey of 630 property managers, 2023',
    url: 'https://www.multifamilydive.com/news/turnover-costs-4000-apartment-multifamily/696298/',
  },
  localRent: {
    id: 'localRent',
    value: '$1,519',
    label: 'average Hampton Roads apartment rent, about $50 for every vacant day',
    source: 'HUD market analysis, 2024',
    url: 'https://www.huduser.gov/portal/publications/pdf/VirginiaBeachNorfolkNewportNewsVA-NC-CHMA-24.pdf',
  },
  renters: {
    id: 'renters',
    value: '41%',
    label: 'of Hampton Roads households rent, and renter households are growing faster than owners',
    source: 'HUD market analysis, 2024',
    url: 'https://www.huduser.gov/portal/publications/pdf/VirginiaBeachNorfolkNewportNewsVA-NC-CHMA-24.pdf',
  },
  pcs: {
    id: 'pcs',
    value: '40%',
    label: 'of military household moves happen in peak season, roughly May 15 to August 31',
    source: 'GAO-20-295',
    url: 'https://www.gao.gov/products/gao-20-295',
  },
  pcsLease: {
    id: 'pcsLease',
    value: '55.1-1235',
    label: 'Virginia law lets servicemembers with PCS orders end a lease early, so turns arrive on short notice',
    source: 'Code of Virginia',
    url: 'https://law.lis.virginia.gov/vacode/title55.1/chapter12/section55.1-1235/',
  },
} satisfies Record<string, Fact>;

// Rent default for the vacancy calculator.
export const defaultRent = 1519;
