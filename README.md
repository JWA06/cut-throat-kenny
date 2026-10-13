# Cut Throat Kenny website

A redesign of [cutthroatkenny.co.uk](https://www.cutthroatkenny.co.uk/) for Cut Throat Kenny, a traditional men's barbers at 96–98 Rochdale Road, Royton, Oldham.

It's a single-page static site: plain HTML, CSS and JavaScript with no build step. It can be hosted anywhere that serves static files (Netlify, Vercel, GitHub Pages, cPanel hosting and so on).

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Page sections

| Section | Anchor | Notes |
| --- | --- | --- |
| Hero | `#top` | Headline, live open/closed status, booking button, review score |
| Price list | `#prices` | Haircuts, shaves and beards, plus a combo offer |
| The cut-throat shave | `#shave` | The four steps of the signature shave |
| Our story | `#story` | Jason's story, from Oldham town centre to Royton |
| Barbers | `#team` | One card per barber, each with its own "Book with…" link |
| Recent work | `#work` | Six-photo gallery, linking to Facebook |
| Reviews | `#reviews` | Average score and three review cards |
| Find us | `#visit` | Address, phone, opening hours (today highlighted) and map |
| Booking | `#book` | Booking call to action (see below) |

On phones, a bar with **Call** and **Book now** buttons stays fixed at the bottom of the screen.

## Online booking (Squire now, Booksy later)

Every booking button on the page has a `data-book` attribute. One setting in `assets/js/config.js` controls all of them.

The site is currently connected to the shop's Squire page:

```js
booking: {
  url: "https://getsquire.com/discover/barbershop/cut-throat-kenny-royton-oldham",
  barbers: { jason: "", magnus: "", travis: "" },
  newTab: true,
},
```

To move to Booksy:

1. Open `assets/js/config.js`.
2. Replace `booking.url` with the shop's Booksy page link (it looks like `https://booksy.com/en-gb/123456_cut-throat-kenny_barber-shop_...`).
3. Optional: if each barber has their own booking link, add it under `booking.barbers`. Any barber left blank uses the main link.

Don't paste a link that ends in `?rwg_token=...`. That token is added by Google for one visit, so remove it and keep the address before the `?`.

If `url` is left empty, the booking buttons scroll to the booking section instead, which says online booking is coming soon and shows the phone number. With a link set, every button opens the booking page in a new tab and the booking section shows a "Book online" button.

To use Booksy's own widget button as well, paste the `<script>` tag Booksy provides inside `<div id="booksy-widget">` in `index.html`. The div stays hidden while it's empty.

## Adding photos

Every photo frame shows a labelled placeholder until its image file exists. Drop the files into `assets/photos/` with these names and they appear automatically:

| File | Where it shows | Shape |
| --- | --- | --- |
| `hero.jpg` | Hero, arched frame | Portrait 4:5 (e.g. 1200×1500) |
| `shop.jpg` | Our story | Portrait 4:5 |
| `team-jason.jpg` | Barbers | Portrait 4:5 |
| `team-magnus.jpg` | Barbers | Portrait 4:5 |
| `team-travis.jpg` | Barbers | Portrait 4:5 |
| `work-1.jpg` … `work-6.jpg` | Recent work | Square 1:1 (e.g. 1000×1000) |

Compress the photos before uploading (aim for under 300 KB each) and update each `alt` text in `index.html` to describe the actual photo. `hero.jpg` is also used as the social sharing image.

## Content to confirm with the shop before launch

The current site couldn't be loaded while this was built, so the content comes from public listings (the shop's own pages, Fresha, Squire and search results). Please check these points with Jason:

- **Address.** The shop's site says 96–98 Rochdale Road, but Fresha lists 86 Rochdale Road. Both give OL2 6QF.
- **Prices.** Public listings showed ranges (haircut £25–30, beard trim £15–20, combo around £35), so the site shows "from" prices. Other services such as head shaves, buzz cuts and haircut-plus-shave packages had unclear prices and are left off for now.
- **Opening hours.** These come from the shop's own site. Fresha shows different Saturday hours.
- **Team.** Jason, Magnus and Travis are taken from a booking listing. Confirm the current team, their roles and a short line about each.
- **Review score.** "5.0 from 300+ reviews" is based on Fresha (317 reviews). Squire showed 5.0 from 193 reviews. Update the figure once reviews move to Booksy.
- **Reviews.** The three review cards are marked placeholders. Replace them with real reviews, with the client's permission.
- **Social links.** Only Facebook was found. Add Instagram or TikTok links in the footer if the shop uses them.
- **Logo.** The wordmark and razor badge are new. Swap in the shop's existing logo if they want to keep it.

## Files

```
index.html             page markup, SEO tags and LocalBusiness structured data
assets/css/styles.css  all styles (colour and type tokens at the top)
assets/js/config.js    booking settings
assets/js/main.js      booking links, phone menu, opening-hours status, photo slots
assets/img/favicon.svg
assets/photos/         put the shop's photos here
```

Opening hours are entered once, in the hours table in `index.html` (`data-open` / `data-close` on each row). The open/closed status and today's highlight are worked out from that table using UK time. If the hours change, also update the footer summary and the `openingHoursSpecification` block in the page `<head>`.
