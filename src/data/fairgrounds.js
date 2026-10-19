import { asset } from './asset.js';

// Content for the Fairgrounds (year-round events and venue rentals) side.

export const MENU_FG = [
  { to: '/fairgrounds', label: 'Home' },
  { to: '/fairgrounds/events', label: 'Upcoming Events' },
  { to: '/fairgrounds/venues', label: 'Venues' },
  { to: '/fairgrounds/rentals', label: 'Rental Opportunities' },
  { to: '/fair', label: 'New York State Fair' },
];

export const MENU_FG_SECONDARY = [
  { to: '/fairgrounds/contact', label: 'Contact Us' },
  { to: '/fairgrounds/terms', label: 'Terms of Services' },
  { to: '/fairgrounds/privacy', label: 'Privacy Policy' },
];

export const MONTHS = [
  { id: '2025-02', year: 2025, month: 1, short: 'Feb', long: 'February' },
  { id: '2025-03', year: 2025, month: 2, short: 'Mar', long: 'March' },
  { id: '2025-04', year: 2025, month: 3, short: 'Apr', long: 'April' },
  { id: '2025-05', year: 2025, month: 4, short: 'May', long: 'May' },
  { id: '2025-06', year: 2025, month: 5, short: 'Jun', long: 'June' },
];

export const EVENT_CATEGORIES = ['Shows & Expos', 'Animals', 'Sports', 'Concerts', 'Community'];

const DOG_SHOW_BODY = {
  intro: 'Show will feature both conformation and obedience classes.',
  bullets: [
    ['Thursday', ' - sponsored by the Central New York Kennel Club'],
    ['Friday', ' - sponsored by the Onondaga Kennel Association'],
    ['Saturday', ' - sponsored by the Finger Lakes Kennel Club, Inc.'],
    ['Sunday', ' - sponsored by the North Country Kennel Club, Inc.'],
  ],
  outro: 'An array of vendors will be available for your canine needs and shopping pleasure. Food trucks will be available the entire cluster weekend.',
};

// Dates are ISO (yyyy-mm-dd); `days` lists every day the event runs.
export const EVENTS = [
  {
    id: 'rv-show', title: 'Spring NYS RV Show', category: 'Shows & Expos', img: 'fg/hero-1.jpg',
    days: ['2025-02-27', '2025-02-28', '2025-03-01', '2025-03-02'], hours: '10:00 am - 6:00 pm', venue: 'Expo Center', admission: '$10 adults • kids 12 & under free', website: 'nysrvshow.com',
    body: { intro: 'Hundreds of new and pre-owned RVs, campers and travel trailers from New York dealers under one roof, plus camping gear and seminars.' },
  },
  {
    id: 'dog-show', title: 'Salt City Cluster Spring Dog Show', category: 'Animals', img: 'fg/hero-2.jpg',
    days: ['2025-03-27', '2025-03-28', '2025-03-29', '2025-03-30'], hours: '7:00 am - 8:00 pm', venue: 'Exhibit Center', admission: 'Free Admission', website: 'raudogshows.com/upcoming-show',
    body: DOG_SHOW_BODY,
  },
  {
    id: 'nasp', title: 'National Archery in the Schools Program (NASP) NYS Bullseye Tournament', category: 'Sports', img: 'fg/hero-3.jpg',
    days: ['2025-03-23'], hours: '8:00 am - 8:00 pm', venue: 'Expo Center', admission: 'Free for spectators', website: 'naspschools.org',
    body: { intro: 'Student archers from across New York compete in the state championship bullseye tournament.' },
  },
  {
    id: 'spring-concert', title: 'Spring Kickoff Concert', category: 'Concerts', img: 'fg/more-events.jpg',
    days: ['2025-04-12'], hours: '7:00 pm - 11:00 pm', venue: 'Chevy Court', admission: 'Tickets from $35', website: 'nysfairgrounds.ny.gov',
    body: { intro: 'An all-ages outdoor show to open the season on the Chevy Court stage.' },
  },
  {
    id: 'home-show', title: 'Syracuse Home & Garden Show', category: 'Shows & Expos', img: 'fg/venues-hero.jpg',
    days: ['2025-04-04', '2025-04-05', '2025-04-06'], hours: '10:00 am - 7:00 pm', venue: 'Exposition Center', admission: '$8 at the door', website: 'syracusehomeshow.com',
    body: { intro: 'Contractors, landscapers and designers with ideas for every room and yard.' },
  },
  {
    id: 'farmers-market', title: 'Regional Farmers Market Opening Day', category: 'Community', img: 'fg/rental-hero.jpg',
    days: ['2025-05-03'], hours: '7:00 am - 2:00 pm', venue: 'Fairgrounds Midway', admission: 'Free Admission', website: 'nysfairgrounds.ny.gov',
    body: { intro: 'Local growers, bakers and makers return to the Fairgrounds for the season.' },
  },
  {
    id: 'horse-show', title: 'Empire State Horse Show', category: 'Animals', img: 'fg/venues.jpg',
    days: ['2025-05-16', '2025-05-17', '2025-05-18'], hours: '8:00 am - 6:00 pm', venue: 'Coliseum', admission: 'Free Admission', website: 'nysfairgrounds.ny.gov',
    body: { intro: 'Hunter, jumper and equitation classes in the Coliseum arena.' },
  },
  {
    id: 'car-show', title: 'Summer Nationals Car Show Preview', category: 'Shows & Expos', img: 'fg/rental.jpg',
    days: ['2025-06-07', '2025-06-08'], hours: '9:00 am - 5:00 pm', venue: 'Fairgrounds Midway', admission: '$15 per car • spectators $5', website: 'nysfairgrounds.ny.gov',
    body: { intro: 'Classic, custom and muscle cars line the Midway for a weekend preview of the Summer Nationals.' },
  },
].map((e) => ({ ...e, img: asset(e.img) }));

// Carousel on the Fairgrounds home screen (copy from the Figma file).
export const FEATURED = [
  { id: 'rv-show', img: asset('fg/hero-1.jpg'), date: 'Feb 27, 2025', title: 'Spring NYS RV Show' },
  { id: 'dog-show', img: asset('fg/hero-2.jpg'), date: 'Mar 27, 2025', title: 'Salt City Cluster Spring Dog Show' },
  { id: 'nasp', img: asset('fg/hero-3.jpg'), date: 'Mar 23, 2025', title: 'National Archery in the Schools Program (NASP) NYS Bullseye Tournament' },
];

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDay(iso) {
  const d = parseISO(iso);
  return `${DOW[d.getDay()]}, ${MONTH_ABBR[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// "Fri, Feb 7, 2025 • 8:00 am - 8:00 pm"
export const eventDateLine = (e, iso = e.days[0]) => `${formatDay(iso)} • ${e.hours}`;

export const VENUES = [
  {
    id: 'cs-building', eyebrow: 'Cozy Event Space', detailEyebrow: 'Agriculture Space', title: 'C&S Companies Science & Industry Building', img: asset('fg/venue-cs-building.jpg'),
    summary: 'The C&S Companies Science & Industry Building is just the right size for a smaller event. It has played host in recent years to indie music concerts, boxing matches, a comm...',
    body: 'The C&S Companies Science & Industry Building is just the right size for a smaller event. It has played host in recent years to indie music concerts, boxing matches, a community garage sale and more. It’s also perfect for the event that needs a second building for a special subset of the main event.',
    specs: [['Size', '15,946 sq. ft.'], ['Restrooms', '2 public'], ['Electrical', '110/208 non-commercial']],
  },
  {
    id: 'chevy-court', eyebrow: 'About the Space', detailEyebrow: 'Outdoor Stage', title: 'Chevy Court', img: asset('fg/venue-chevy-court.jpg'),
    summary: 'The Chevy Court stage, located in the heart of the classic section of the Fairgrounds, is a performance stage ideal for concerts, plays and major announcements. During the Fair, th...',
    body: 'The Chevy Court stage, located in the heart of the classic section of the Fairgrounds, is a performance stage ideal for concerts, plays and major announcements. During the Fair, the lawn in front of the stage holds tens of thousands of concertgoers; year-round it suits festivals and community gatherings of every size.',
    specs: [['Capacity', 'Approx. 20,000 standing'], ['Restrooms', 'Adjacent public restrooms'], ['Electrical', '3-phase stage power']],
  },
  {
    id: 'expo-center', eyebrow: 'Largest Indoor Space', detailEyebrow: 'Exhibition Hall', title: 'Exposition Center', img: asset('fg/rental-hero.jpg'),
    summary: 'The Exposition Center is the largest clear-span building in the Northeast, with 136,000 square feet of open floor for trade shows, expos and sporting events...',
    body: 'The Exposition Center is the largest clear-span building in the Northeast, with 136,000 square feet of open floor for trade shows, expos and sporting events. Drive-in doors, a full kitchen and adjacent parking make large load-ins simple.',
    specs: [['Size', '136,000 sq. ft.'], ['Restrooms', '6 public'], ['Electrical', '110/208/480 commercial']],
  },
];

export const PLACEHOLDERS_FG = {
  contact: { title: 'Contact Us', body: 'The New York State Fairgrounds Events Department • 581 State Fair Blvd., Syracuse, NY 13209 • 800.475.FAIR' },
  terms: { title: 'Terms of Services', body: 'Terms of service for the Fairgrounds app will appear here.' },
  privacy: { title: 'Privacy Policy', body: 'The Fairgrounds privacy policy will appear here.' },
};
