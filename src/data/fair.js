import { asset } from './asset.js';

// Content for The Fair side. Copy follows the Figma file; where the file has
// placeholders ("Label", lorem ipsum) we use plausible stand-ins.

// The 2025 Fair runs 13 days, Wed Aug 20 – Mon Sept 1.
export const FAIR_DAYS = [
  'Wed, Aug 20', 'Thu, Aug 21', 'Fri, Aug 22', 'Sat, Aug 23', 'Sun, Aug 24', 'Mon, Aug 25', 'Tue, Aug 26',
  'Wed, Aug 27', 'Thu, Aug 28', 'Fri, Aug 29', 'Sat, Aug 30', 'Sun, Aug 31', 'Mon, Sept 1',
].map((date, i) => ({ id: `day-${i + 1}`, index: i, date, label: `Day ${i + 1}` }));

export const HOME_TILES = [
  { to: '/fair/tickets', img: 'fair/tile-tickets.png', label: 'Buy Tickets' },
  { to: '/fair/map', img: 'fair/tile-map.png', label: 'Fair Finder Map' },
  { to: '/fair/schedule', img: 'fair/tile-schedule.png', label: 'Daily Schedule' },
  { to: '/fair/concerts', img: 'fair/tile-music.png', label: 'Chevrolet Music Series' },
  { to: '/fair/stories', img: 'fair/tile-stories.png', label: 'Fair Stories' },
  { to: '/fair/activities', img: 'fair/tile-activities.png', label: 'In-App Activities' },
  { to: '/fair/plan', img: 'fair/tile-plan.png', label: 'Plan Your Visit' },
  { to: '/fair/updates', img: 'fair/tile-realtime.png', label: 'Real-Time Updates' },
].map((t) => ({ ...t, img: asset(t.img) }));

export const SPONSORS = [
  { name: 'Chevrolet', img: asset('fair/sponsor-chevrolet.png') },
  { name: 'Ambassador', img: asset('fair/sponsor-ambassador.png') },
  { name: 'Toyota', img: asset('fair/sponsor-toyota.png') },
  { name: 'Taste NY' },
  { name: 'NYS Agriculture & Markets' },
  { name: 'I LOVE NY' },
];

export const MENU_FAIR = [
  { to: '/fair', label: 'Home' },
  { to: '/fair/tickets', label: 'Buy Tickets' },
  { to: '/fair/map', label: 'Fair Finder Interactive Map' },
  { to: '/fair/schedule', label: 'Daily Schedule' },
  { to: '/fair/concerts', label: 'Chevrolet Music Series' },
  { to: '/fair/updates', label: 'Real-Time Updates' },
  { to: '/fair/activities', label: 'Activities & AG Facts' },
  { to: '/fair/plan', label: 'Plan Your Visit' },
  { to: '/fair/news', label: 'Fair News' },
  { to: '/fair/favorites', label: 'My Favorites' },
  { to: '/fairgrounds', label: 'New York State Fairgrounds' },
];

export const MENU_FAIR_SECONDARY = [
  { to: '/fair/contact', label: 'Contact Us' },
  { to: '/fair/terms', label: 'Terms of Services' },
  { to: '/fair/privacy', label: 'Privacy Policy' },
];

// ---- Chevrolet Music Series ------------------------------------------------
export const CONCERT_GENRES = ['All Genres', 'Rock', 'Pop', 'Tribute', 'Country', 'R&B'];
export const CONCERT_STAGES = ['All Concerts', 'Chevy Court', 'Suburban Park'];

export const CONCERTS = [
  { id: 'c-abba', stage: 'Chevy Court', title: 'The Concert: A Tribute to ABBA', day: 0, time: '1pm', genre: 'Tribute', img: 'fair/concert-abba.jpg' },
  { id: 'c-steve-miller', stage: 'Chevy Court', title: 'Steve Miller Band', day: 1, time: '8pm', genre: 'Rock', img: 'fair/concert-steve-miller.jpg' },
  { id: 'c-cheap-trick', stage: 'Chevy Court', title: 'Cheap Trick', day: 1, time: '1pm', genre: 'Rock', img: 'fair/concert-cheap-trick.jpg' },
  { id: 'c-red-jumpsuit', stage: 'Chevy Court', title: 'The Red Jumpsuit Apparatus', day: 5, time: '6pm', genre: 'Rock', img: 'fair/news-2.jpg' },
  { id: 'c-chubby', stage: 'Suburban Park', title: 'Chubby Checker and the Band', day: 2, time: '1pm', genre: 'Pop', img: 'fair/news-3.jpg' },
  { id: 'c-country', stage: 'Suburban Park', title: 'Lonestar', day: 3, time: '7pm', genre: 'Country', img: 'fair/hero-concerts.jpg' },
  { id: 'c-boyz', stage: 'Chevy Court', title: 'Boyz II Men', day: 6, time: '8pm', genre: 'R&B', img: 'fair/news-feature.jpg' },
  { id: 'c-24k', stage: 'Chevy Court', title: '24K Magic – The Ultimate Bruno Mars Tribute', day: 12, time: '4pm', genre: 'Tribute', img: 'fair/news-detail-hero.jpg' },
].map((c) => ({ ...c, img: asset(c.img), date: FAIR_DAYS[c.day].date }));

// ---- Daily schedule --------------------------------------------------------
export const SCHEDULE_CATEGORIES = ['All Categories', 'Animals & Agriculture', 'Music', 'Family Fun', 'Shows & Demos'];

const SCHEDULE_POOL = [
  { title: 'State Fair 4-H Dog Show', time: '9 AM', location: 'Toyota Coliseum', category: 'Animals & Agriculture' },
  { title: 'Hollywood Racing Pigs', time: '12:15 PM', location: 'Family Fun Zone', category: 'Family Fun' },
  { title: 'Bandaloni The One Man Band', time: '1:00 PM', location: 'Along Restaurant Row', category: 'Music' },
  { title: 'Dinosaur Expedition', time: '10:00 AM', location: 'Science & Industry Building', category: 'Family Fun' },
  { title: 'Chubby Checker', time: '1:00 PM', location: 'Chevy Court', category: 'Music' },
  { title: 'Butter Sculpture Unveiling', time: '11:00 AM', location: 'Dairy Products Building', category: 'Animals & Agriculture' },
  { title: 'Sea Lion Splash', time: '2:30 PM', location: 'Center of Progress Plaza', category: 'Shows & Demos' },
  { title: 'Draft Horse Pull', time: '6:00 PM', location: 'Coliseum Arena', category: 'Animals & Agriculture' },
  { title: 'Lumberjack Show', time: '4:00 PM', location: 'Lake Park', category: 'Shows & Demos' },
  { title: 'Cooking Demo: Taste NY', time: '3:00 PM', location: 'Center of Progress', category: 'Shows & Demos' },
];

// Each day gets a deterministic rotation of the pool so days feel different.
export const SCHEDULE = FAIR_DAYS.flatMap((day) =>
  Array.from({ length: 7 }, (_, k) => {
    const item = SCHEDULE_POOL[(day.index * 3 + k) % SCHEDULE_POOL.length];
    return { ...item, id: `s-${day.index}-${k}`, day: day.index };
  }).sort((a, b) => toMinutes(a.time) - toMinutes(b.time)),
);

function toMinutes(t) {
  const [, h, m = '0', ap] = t.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
  return ((+h % 12) + (ap.toUpperCase() === 'PM' ? 12 : 0)) * 60 + +m;
}

// ---- Real-time updates -----------------------------------------------------
export const UPDATES = [
  {
    id: 'u-parking', date: 'Wed, Aug 21 • 6pm', title: 'Parking Alert',
    body: [
      { strong: 'PARKING ALERT:' },
      ' Fairgoer tip! The Brown & Pink Lots are full. Gray Lot has limited availability. Orange Lot and Willis Lot are still open. Opt for Centro? Park-N-Ride locations are available in Downtown Syracuse, Long Branch Park in Liverpool, and Destiny USA.',
    ],
  },
  { id: 'u-lineup', date: 'Wed, Aug 21 • 6pm', title: 'Chevrolet Music Series Lineup Announcement', body: ['The 2025 Chevrolet Music Series lineup has been announced!'] },
  {
    id: 'u-rja', date: 'Wed, Aug 21 • 6pm', title: 'The Red Jumpsuit Apparatus to Perform this Summer',
    body: ['Get ready to embrace the energy and anthems of The Red Jumpsuit Apparatus as they hit the Chevy Court stage on Monday, August 25 at 6 p.m.'],
  },
  {
    id: 'u-24k', date: 'Wed, Aug 21 • 6pm', title: 'Gimme Gimme Gimme That 24K Magic!',
    body: [
      'Magic will be headed to The Great New York State Fair this summer as ABBA tribute and Bruno Mars tribute acts are set to open and close Chevy Court’s entertainment lineup at the 2025 Fair. First up, The Concert: A Tribute to ABBA will kick off The Fair, sharing the pop-icon’s classic tunes on Chevy Court at 1 pm on Wednesday, August 20. Capping off this year’s 13-day run at The Fair, 24K Magic - The Ultimate Bruno Mars Tribute Experience will bring these popular bops to Chevy Court at 4 pm on Monday, September 1.',
    ],
  },
];

// ---- Plan your visit ---------------------------------------------------------
export const DIRECTIONS = {
  intro:
    'The New York State Fairgrounds is immediately adjacent to Route 690 just West of Syracuse. It is easily accessible from the New York State Thruway (Rt. 90) from the West and East, and from Route 81, North and South. Just follow the signs to the Fairgrounds once you enter the Syracuse area. Our street address is: 581 State Fair Blvd., Syracuse, New York 13209 Our GPS coordinates are:',
  gps: '43.073857,-76.215708',
  routes: [
    ['From the West - Buffalo / Rochester Area', 'Take the New York State Thruway (Rt. 90 East) to Exit 39, then follow Rt. 690 East.'],
    ['From the East - Albany / Utica Area', 'Take the New York State Thruway (Rt. 90 West) to Exit 34A, follow Rt. 481 South, then follow Rt. 690 West.'],
    ['From the North - Watertown Area', 'Take Interstate 81 South into Syracuse to Exit 22. Follow Bear Street (Rt. 298) to Rt. 690 West.'],
    ['From the South - Binghamton / Cortland Area', 'Take Interstate 81 North into Syracuse, then follow Rt. 690 West.'],
    ['From the New York City / Downstate Area', 'Take best route to Binghamton, N.Y. then take Interstate 81 North into Syracuse, then follow Rt. 690 West.'],
  ],
  outro:
    "Click here for real time travel information from the New York State Department of Transportation's My 511NY which allows you to get traffic and transit information how you want it, when you want it.",
};

export const PARKING_SECTIONS = [
  { label: 'Parking Lots & Rates', body: 'General parking is $10 per vehicle in the Orange, Brown, Pink and Gray lots. Lots open at 7 am daily; the Orange Lot is closest to the Main Gate.' },
  { label: 'Accessible Parking', body: 'Accessible spaces are available in every lot closest to the gates. A valid state-issued placard or plate is required.' },
  { label: 'RV & Camping', body: 'RV parking and the campground are reserved in advance. The RV lot is currently at full capacity.' },
  { label: 'Park-N-Ride Shuttles', body: 'Centro shuttles run every 15 minutes from Downtown Syracuse, Long Branch Park in Liverpool and Destiny USA. Round trip is $5.' },
  { label: 'Bicycles & Rideshare', body: 'Bike racks are inside Gate 1 and Gate 4. The rideshare drop-off and pick-up zone is at Gate 6 on State Fair Blvd.' },
  { label: 'Lost Vehicle Help', body: 'Stop at any Information Booth or call 315.487.7711. Staff can help locate your vehicle by lot and row.' },
];

export const FAQS = [
  { label: 'What are the Fair hours?', body: 'Grounds open at 10 am and close at 10 pm daily. Buildings close at 9 pm; the Midway stays open until 11 pm on Fridays and Saturdays.' },
  { label: 'Can I bring food into the Fair?', body: 'Yes. Personal food and non-alcoholic beverages are welcome. Glass containers and coolers on wheels are not permitted.' },
  { label: 'Are pets allowed?', body: 'Only service animals are permitted on the grounds during the Fair.' },
  { label: 'Is there re-entry?', body: 'Same-day re-entry is allowed with a hand stamp from the gate you exit through.' },
  { label: 'Where are ATMs located?', body: 'ATMs are inside the Center of Progress, the Horticulture Building and near the Main Gate.' },
  { label: 'What is the bag policy?', body: 'Bags are subject to search at every gate. Clear bags speed up entry; backpacks are allowed.' },
];

// ---- News ------------------------------------------------------------------
const LONG_BODY = [
  'With the 2024 Great New York State Fair in the books, the Department of Agriculture and Markets and the New York State Fair are proud to reveal a number of fun facts, statistics, and figures that demonstrate the Fair’s hugely successful 13-day run. With several exciting new agricultural exhibits and activities, the Fair was able to offer even more opportunities to bring fairgoers closer to New York agriculture, while providing an inclusive, diverse, family-friendly space for fairgoers that was packed with record-setting entertainment and concerts, an increased number of food and beverage options, dozens of new rides on the Midway, and more.',
  '“The Fair is part of the fabric of New York State and has been for nearly two centuries,” said State Agriculture and Markets Commissioner Richard A. Ball. “As one of our state’s most cherished traditions, The Fair is the perfect backdrop for educating visitors on the importance of agriculture to our communities and to our economy while also providing top-notch entertainment, workforce development initiatives, culinary delights, and so much more. The 2024 New York State Fair was one of the most successful Fair’s we’ve ever had, serving as a place where families were able to come together to make unforgettable memories, experience things they may not have an opportunity to try elsewhere, and come together to enjoy the very best of New York all while learning about New York agriculture.”',
  '“I’m so grateful to everyone that played a part in making this year’s Fair a memorable experience,” said Fair Director Julie LaFave. “We heard so many anecdotal stories from fairgoers, vendors, partner agencies, and staff that highlighted the success of our agricultural competitions, exhibits, concerts, grounds entertainment, and more. These statistics and figures not only support those stories, but they also tell us that fairgoers truly enjoyed all that The Great New York State Fair had to offer.”',
  'AGRICULTURE, EDUCATION, AND SO MUCH MORE',
  'As the oldest state fair in the nation, The Great New York State Fair is deeply rooted in agriculture, and we are proud to say it is still one of the biggest draws for fairgoers. From the Butter Sculpture to the Maple Booth, from the 4-H for Horses Exhibit to the brand-new Mobile Dairy Experience, agriculture continues to be front and center at the New York State Fair, giving its more than 868,000 visitors an opportunity to connect directly with farmers and learn more about the animals that are essential to the industry.',
  'As part of Agriculture Career Day, 163 youths ages 10-18 joined FFA and 4-H student members for an educational scavenger hunt with interactive exhibits to learn more about workforce development initiatives and to gain awareness of potential career paths in the agricultural industry. The Fair also worked hard in 2024 to increase the number of agricultural competitions offered and the results speak for themselves. The Agriculture Office at The Fair filed a total of 11,652 total entries for youth, animals, flower, produce, wine, and fine art competitions – up from 10,000, which is an increase of over 11% compared to 2023.',
];

export const NEWS = [
  {
    id: 'measuring-up',
    date: 'Wed, Aug 21 • 1pm',
    title: 'Measuring Up: Statistics and Figures from the 2024 Great New York State Fair',
    dek: 'From an Increase in Agricultural Competitions, Surging Concert Attendance, and Record-Setting Sales at the Midway, the 2024 Fair Set a New Bar. Fairgoers are Encouraged to Complete Survey to Help Inform Future Programming',
    img: asset('fair/news-feature.jpg'),
    hero: asset('fair/news-detail-hero.jpg'),
    body: LONG_BODY,
  },
  {
    id: 'dairy-winners',
    date: 'Wed, Aug 21 • 1pm',
    title: 'Governor Hochul Recognizes Winners of the 2024 Dairy Products Competition',
    dek: 'Cheese, butter, yogurt and milk from across New York took home top honors at this year’s Dairy Products Competition.',
    img: asset('fair/news-hochul.jpg'),
    body: LONG_BODY.slice(0, 3),
  },
  {
    id: 'local-food-goal',
    date: 'Wed, Aug 21 • 1pm',
    title: 'At Great New York State Fair, Governor Hochul Announces State Exceeds 2023 Goal of Sourcing Local Food',
    dek: 'State agencies bought more New York-grown food than ever before, beating the 2023 goal ahead of schedule.',
    img: asset('fair/news-2.jpg'),
    body: LONG_BODY.slice(1, 4),
  },
  {
    id: 'local-food-schools',
    date: 'Wed, Aug 21 • 1pm',
    title: 'At Great New York State Fair, Governor Hochul Announces State Exceeds 2023 Goal of Sourcing Local Food from Farms for Schools',
    dek: 'More New York schools are serving more New York food, thanks to the Farm to School program.',
    img: asset('fair/news-3.jpg'),
    body: LONG_BODY.slice(2, 6),
  },
];

// ---- Interactive map ---------------------------------------------------------
// Pins on the full map illustration (Map_Design.jpg). x/y are the pin's point
// as a percentage of the image. kind 'number' = coloured teardrop with a
// number; kind 'amenity' = navy pin with an icon (see components/MapPin.jsx).
export const MAP_CATEGORIES = ['All Categories', 'Food & Drink', 'Exhibits', 'Entertainment', 'Amenities', 'Parking'];

export const MAP_PINS = [
  { id: 'p11', kind: 'number', label: '11', color: '#e0379e', x: 48.17, y: 49.17, category: 'Exhibits', title: 'Horticulture Building', body: 'Flower and garden competitions, the Maple Booth and New York-grown produce displays.' },
  { id: 'p19', kind: 'number', label: '19', color: '#7b43e3', x: 52.91, y: 60.24, category: 'Exhibits', title: 'Center of Progress', body: 'The Fair’s largest exhibit hall: vendors, Taste NY samples and the Dairy Products Competition.' },
  { id: 'p27', kind: 'number', label: '27', color: '#3f80e8', x: 52.52, y: 54.09, category: 'Food & Drink', title: '1911 Established Beak & Skiff', body: '1911 Hard Ciders, spirits and wine. NYS labeled craft beers. Food including smoked meats, burgers and fries. Apple cider donuts.' },
  { id: 'p36', kind: 'number', label: '36', color: '#16b21c', x: 59.7, y: 53.63, category: 'Entertainment', title: 'Suburban Park Stage', body: 'Evening concerts in the Chevrolet Music Series and daytime grounds entertainment.' },
  { id: 'p38', kind: 'number', label: '38', color: '#f26b10', x: 43.43, y: 60.08, category: 'Exhibits', title: 'Dairy Products Building', body: 'Home of the famous Butter Sculpture and the 25-cent milk bar.' },
  { id: 'p15', kind: 'number', label: '15', color: '#3a3fae', x: 57.39, y: 62.85, category: 'Entertainment', title: 'Chevy Court', body: 'The main stage of the Chevrolet Music Series — concerts every afternoon and night.' },
  { id: 'p17', kind: 'number', label: '17', color: '#18b6df', x: 63.03, y: 63.16, category: 'Exhibits', title: 'Agriculture & Education Center', body: '4-H exhibits, the Mobile Dairy Experience and Agriculture Career Day.' },
  { id: 'p5', kind: 'number', label: '5', color: '#ef9b12', x: 63.8, y: 46.87, category: 'Entertainment', title: 'The Midway', body: 'Rides, games and the giant Ferris wheel. Open until 11 pm on Fridays and Saturdays.' },
  { id: 'p42', kind: 'number', label: '42', color: '#e5333f', x: 71.36, y: 53.63, category: 'Entertainment', title: 'Toyota Coliseum', body: 'Horse shows, the 4-H Dog Show and the draft horse pull.' },
  { id: 'p8', kind: 'number', label: '8', color: '#0f9b86', x: 83.02, y: 48.4, category: 'Exhibits', title: 'Empire Expo Center', body: 'Antique farm machinery, the Pan-African Village and the Indian Village.' },
  { id: 'food', kind: 'amenity', icon: 'food', x: 71.23, y: 59.32, category: 'Food & Drink', title: 'Restaurant Row', body: 'Classic Fair food: sausage sandwiches, fried dough, roasted corn and more.' },
  { id: 'circus', kind: 'amenity', icon: 'show', x: 77.12, y: 62.39, category: 'Entertainment', title: 'Family Fun Zone', body: 'Hollywood Racing Pigs, magicians and kids’ rides.' },
  { id: 'aid', kind: 'amenity', icon: 'aid', x: 52.52, y: 45.7, category: 'Amenities', title: 'First Aid', body: 'Staffed by medics from open to close. Lost children can be reunited here.' },
  { id: 'access', kind: 'amenity', icon: 'access', x: 48.17, y: 62.24, category: 'Amenities', title: 'Accessibility Services', body: 'Wheelchair and scooter rentals, plus accessible restrooms.' },
  { id: 'cool', kind: 'amenity', icon: 'cool', x: 55.6, y: 52.71, category: 'Amenities', title: 'Cooling Station', body: 'Shade, water refills and misting fans.' },
  { id: 'gate', kind: 'amenity', icon: 'info', x: 48.42, y: 65.77, category: 'Amenities', title: 'Main Gate & Information', body: 'Tickets, maps, lost and found, and stroller rentals.' },
  { id: 'lake', kind: 'amenity', icon: 'info', x: 77.89, y: 45.94, category: 'Entertainment', title: 'Lake Park', body: 'Shady lawns, the Lumberjack Show and picnic tables by the pond.' },
  { id: 'park-orange', kind: 'amenity', icon: 'parking', x: 89.04, y: 61.93, category: 'Parking', title: 'Orange Lot', body: 'Closest general lot to the Main Gate. $10 per vehicle.' },
  { id: 'park-rv', kind: 'amenity', icon: 'parking', x: 63.44, y: 39.4, category: 'Parking', title: 'RV Parking', body: 'Reserved RV parking. Currently at full capacity.' },
  { id: 'park-willis', kind: 'amenity', icon: 'parking', x: 12.5, y: 76.5, category: 'Parking', title: 'Willis Ave. Lot', body: 'Overflow parking with a free shuttle to Gate 1.' },
];

// ---- Tickets (frame is hidden/unfinished in Figma; built from the system) ----
export const TICKETS = [
  { id: 't-ga', title: 'General Admission', note: 'Ages 13 and up • valid any one day', price: 6 },
  { id: 't-kids', title: 'Kids 12 & Under', note: 'Free with a paying adult', price: 0 },
  { id: 't-mega', title: 'Mega Pass', note: '13-day admission + 1 Midway ride wristband', price: 45 },
  { id: 't-parking', title: 'Parking', note: 'Orange, Brown, Pink or Gray Lot • per vehicle', price: 10 },
];

export const PLACEHOLDERS = {
  stories: { title: 'Fair Stories', body: 'Short stories from the people, animals and traditions that make The Fair. Coming soon.' },
  contact: { title: 'Contact Us', body: 'The Great New York State Fair • 581 State Fair Blvd., Syracuse, NY 13209 • 800.475.FAIR' },
  terms: { title: 'Terms of Services', body: 'Terms of service for the NYS Fair app will appear here.' },
  privacy: { title: 'Privacy Policy', body: 'The NYS Fair privacy policy will appear here.' },
  butterizer: { title: 'Butterizer', body: 'Turn your selfie into a butter sculpture. This in-app activity is a placeholder in the prototype.' },
  'fair-match': { title: 'Fair Match', body: 'A Fair-themed matching game. This in-app activity is a placeholder in the prototype.' },
};
