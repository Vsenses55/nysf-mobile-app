# NYSF Mobile App — functional prototype

A responsive mobile web prototype of the **Great New York State Fair** and **New York State Fairgrounds** app, built from the *NYSF App Design* Figma file and its design system.

- **Two sides, one app.** The Fair (warm, festive) and the Fairgrounds (calm, corporate) share one layout, and each colour comes from the design-system tokens. Every screen sets `data-theme="fair"` or `data-theme="fairgrounds"`.
- **Mobile only.** The layout is fluid from 320px up to the 430px design frame. Wider screens show a centred 430px column.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 (also on your phone over Wi-Fi via the printed network URL)
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

**One-time setup:** go to the repo's **Settings → Pages → Source** and choose **GitHub Actions**. After that, committing and pushing from GitHub Desktop is all it takes. URLs use hash routing (`/#/fair/concerts`), so deep links work on Pages without extra config.

## What works

| Area | Behaviour |
| --- | --- |
| Start | Choose The Fair or the Fairgrounds |
| Menus | Full-screen menu on both sides, with links that switch between them. The Notifications toggle is saved |
| Favorites | Hearts on concerts, schedule items and Fairgrounds events. They are saved in the browser and listed on **My Favorites** |
| Concerts | Date, Genre and Stage filters, a favorites-only toggle, Reset Filters and Load More |
| Daily Schedule | 13 day tabs (Aug 20 – Sept 1), Categories and favorites-only |
| Interactive Map | Tappable pins with an info panel. Search and Categories highlight matching pins |
| Plan Your Visit | Directions, Parking (alert ticker and accordions) and FAQs |
| News | List, article detail and previous/next |
| Buy Tickets | Day picker, quantity steppers, total and a simulated checkout |
| Upcoming Events | Search, month tabs, list/calendar toggle, tap a calendar day, category filter sheet |
| Venues, Rentals | Venue list and detail. The rental form validates and shows a confirmation |
| Sign-up | Every "Keep in touch" form shows a thank-you state |

Nothing is sent anywhere. Forms and checkout are simulated.

## Project structure

```
src/
  ds/            Design system: nysf.js (21 components) + tokens.json
  styles/        tokens.css (generated), components.css (design system), app.css (layout + screens)
  components/    Screen shell, Menu, Carousel, Calendar, SignUpBlock, Toast, Filters
  screens/       fair/*, fairgrounds/*, Start, Placeholder
  data/          All copy and content: fair.js, fairgrounds.js
  state/         Favorites + notifications (localStorage)
public/assets/   Images exported from Figma (fair/, fg/, shared/)
scripts/         build-tokens.mjs — regenerates tokens.css from tokens.json (npm run tokens)
```

To change copy, events or concerts, edit `src/data/*.js`. To change colours, edit `src/ds/tokens.json` and run `npm run tokens`.

## Notes on the Figma file

- **Map:** The file only has the cropped 430×698 map with the pins baked in, so the tappable hotspots sit over those pins. With the full illustration (ideally without pins), the map could pan and zoom with real pin markers.
- **Hidden frames:** *Buy Tickets* and *Favorites* are hidden and unfinished in Figma. Both are composed here from the design system.
- **Not designed:** FAQs, the events filter sheet, Fair Stories, Contact, Terms, Privacy and the activity games. FAQs and the filter sheet follow existing patterns; the rest are themed placeholder pages.
- **Tab bar:** The iOS tab bar on two Fairgrounds frames was left out on purpose, because the menu covers navigation and a fixed bottom bar fights mobile browsers' own toolbars.
- **Image resolution:** Images in the file are 1× (for example, the home tiles are 140px). Exporting them at 2–3× from Figma and dropping them into `public/assets/` with the same names would sharpen them on retina phones.
