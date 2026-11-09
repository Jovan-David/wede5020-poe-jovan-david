# GreenThumb Community Garden

**WEDE5020 Portfolio of Evidence — Part 3 (Final Website)**

| | |
|---|---|
| **Student name** | Jovan David |
| **Student number** | ST10510821 |
| **Module** | WEDE5020 — Web Development Introduction |
| **Assessment** | Part 3 of 3 (100 marks) |
| **Live website** | https://greenthumbgarden.netlify.app/ |
| **GitHub repository** | https://github.com/EMKNPM/wede5020-wede-poe-jovan-david |
| **Date submitted** | 9 November 2026 |

> **Note on the repository name:** the GitHub repository was created in Part 1 under the name `wede5020-wede-poe-jovan-david` and still carries that name. All Part 3 work is committed to the same repository so the marking team can see the full history from Part 1 to Part 3.

---

## Contents

1. [Project overview](#a-project-overview)
2. [Site map and pages](#b-site-map-and-pages)
3. [Running the site locally](#c-running-the-site-locally)
4. [Design decisions](#d-design-decisions)
5. [Part 2 feedback and fixes](#e-part-2-feedback-and-fixes)
6. [Part 3 features](#f-part-3-features)
7. [Accessibility](#g-accessibility)
8. [Search engine optimisation](#h-search-engine-optimisation)
9. [Forms](#i-forms)
10. [Changelog](#j-changelog)
11. [Git commit history](#k-git-commit-history)
12. [Deployment](#l-deployment)
13. [Pre-deploy and testing checklist](#m-pre-deploy-and-testing-checklist)
14. [References](#n-references)
15. [Image credits](#o-image-credits)
16. [AI and tool declaration](#p-ai-and-tool-declaration)
17. [Self-audit against the Part 3 brief](#q-self-audit-against-the-part-3-brief)

---

## a. Project overview

GreenThumb Community Garden is a fictional non-profit food garden in Durban North, Durban, KwaZulu-Natal. The organisation rents seasonal vegetable plots, presents affordable gardening workshops, hosts school visits and runs a monthly harvest market. The website exists to help three audiences:

1. **Neighbours** who want to grow their own food and need to know how to get a plot.
2. **Schools and community groups** who want to book a facilitated garden visit.
3. **Volunteers, donors and sponsors** who want to support the garden.

The site was built in three parts:

| Part | Focus | Result |
|---|---|---|
| Part 1 | Structure and content | Five semantic HTML pages with the original green and cream design |
| Part 2 | Styling and responsiveness | One shared stylesheet, CSS Grid/Flexbox layouts and three responsive breakpoints |
| Part 3 | Interactivity, data, SEO and deployment | JavaScript features, OpenLayers map, lightbox gallery, JSON-driven programme list, validated forms, full SEO and a live deployment |

The Part 1 and Part 2 design is **kept and extended**, not replaced. The same green (`#2E7D32`), cream (`#FFF8E1`) and brown (`#8D6E63`) palette, the same Segoe UI font stack and the same three breakpoints (992px, 768px, 480px) are still used.

---

## b. Site map and pages

```
index.html          Home page: hero, impact stats, programmes, volunteer feature,
                    FAQ accordion and the garden tour modal
about.html          History, mission, vision, who we serve, how we work and milestones
services.html       Dynamic programme list with live search, category filter and sorting
gallery.html        Nine-photo gallery with a keyboard accessible lightbox
find-us.html        OpenLayers map with four markers, popups and directions links
enquiry.html        Programme enquiry form with validation, quote and confirmation
contact.html        Contact details plus validated form with a mailto fallback
404.html            Friendly "page not found" page used by Netlify
```

Supporting files:

```
css/styles.css      One stylesheet for the whole site (Part 2 rules + Part 3 components)
js/main.js          Shared: mobile menu, accordion, modal, scroll reveal, footer year
js/services.js      Fetches data/services.json, then searches, filters and sorts it
js/gallery.js       Lightbox: open, close, previous, next, keyboard and swipe
js/map.js           OpenLayers map, markers, popups, coordinate readout, zoom controls
js/enquiry.js       Enquiry validation, character counter, simulated POST, quotation
js/contact.js       Contact validation, mailto builder and confirmation panel
data/services.json  Ten programmes with prices, dates and availability
images/             Nine optimised photographs with descriptive file names
screenshots/        Part 2 responsive evidence (1366px, 768px, 375px)
robots.txt          Crawler rules and sitemap location
sitemap.xml         All seven public pages with last-modified dates
```

Every page links to every other page through the same navigation, and the footer repeats the name, address and phone number (NAP) consistently on all pages.

---

## c. Running the site locally

The **programme list** (`data/services.json`) is loaded with `fetch()`. Browsers block `fetch()` when a page is opened directly from disk (`file://`), so the services page needs a small local web server:

**Option 1 — VS Code Live Server (easiest)**
1. Open the project folder in Visual Studio Code.
2. Install the *Live Server* extension.
3. Right-click `index.html` → **Open with Live Server**.

**Option 2 — Node.js**
```bash
npx serve .
# then open the address it prints, usually http://localhost:3000
```

**Option 3 — Python**
```bash
python -m http.server 8000
# then open http://localhost:8000
```

The map needs an internet connection because OpenStreetMap tiles are downloaded from the internet. Everything else works offline.

---

## d. Design decisions

| Element | Decision | Reason |
|---|---|---|
| **Colour palette** | Green `#2E7D32` (growth), dark green `#1B5E20` (headings), brown `#8D6E63` (earth and call-to-action), cream `#FFF8E1` (background), charcoal `#333333` (body text) | Kept from Part 1. Green and brown communicate food and soil without looking corporate. |
| **Typography** | `"Segoe UI", Arial, Helvetica, sans-serif` | A system font stack: nothing extra to download, so the page renders instantly and text stays readable on every device. |
| **Layout** | CSS Grid for page sections and card grids, Flexbox for the header, buttons and toolbars | Grid handles two-dimensional layouts; Flexbox handles single rows. Both keep the HTML simple. |
| **Spacing** | 8px-based scale, 64px section padding on desktop and 48px on mobile | Consistent rhythm and comfortable white space. |
| **Breakpoints** | 992px, 768px, 480px | Carried over from Part 2 so the responsive evidence in `screenshots/` still applies. |
| **Cards** | White cards, 8px radius, soft shadow, lift on hover | Separates content from the cream background and gives clear click targets. |
| **Motion** | 0.2–0.3s transitions, scroll reveal, `prefers-reduced-motion` respected | Motion guides attention but never blocks content. |
| **Icons** | Text and CSS shapes only (the `GT` monogram, the plus/minus accordion icon) | No icon font or image requests, so nothing can fail to load. |
| **Currency and location** | South African rand, Durban addresses, `en-ZA` language tag | The module is South African and the phone validation is built for South African numbers. |

---

## e. Part 2 feedback and fixes

The marked Part 2 feedback sheet was not returned before this submission, so each issue that could be identified from a review of the Part 2 files was corrected. The table records what was changed and where.

| # | Issue found in Parts 1–2 | Fix in Part 3 | File |
|---|---|---|---|
| 1 | Spelling errors in comments and copy ("tecniques", "enviorment", "sectoin") | All corrected | `about.html`, `css/styles.css` |
| 2 | `about.html` called the organisation the "Community Garden Network" | Corrected to "GreenThumb Community Garden" | `about.html` |
| 3 | Two different addresses and phone formats across pages | One NAP (name, address, phone) block repeated in every footer and in the structured data | all pages |
| 4 | Currency mixed dollars and rand | Everything is now South African rand | all pages, `data/services.json` |
| 5 | `green-thumb-garden.html` was an orphan duplicate of the home page | Deleted; duplicate content harms SEO | — |
| 6 | Navigation had no mobile behaviour and no current-page marker | Sticky header, accessible menu button, `aria-current="page"` | all pages, `js/main.js` |
| 7 | No page had meta description, keywords, canonical or social sharing tags | Added to every page | all pages |
| 8 | Images used single-candidate `srcset` attributes (no benefit) | Replaced with correct `width`/`height` attributes and `loading="lazy"` | `index.html`, `gallery.html` |
| 9 | Footer used `<h4>` headings without a heading level above them | Footer headings are now `<h2>` inside labelled sections | all pages |
| 10 | Form had no labels, validation or feedback | Rebuilt with fieldsets, labels, inline errors, an error summary and a confirmation | `enquiry.html`, `contact.html` |
| 11 | `references.md` repeated the README reference list | Consolidated into the single reference list in this README | — |
| 12 | No robots.txt, sitemap or structured data | All three added | `robots.txt`, `sitemap.xml`, all pages |
| 13 | No security policy; CDN resources loaded without integrity checks | CSP meta tag on every page and SRI hashes on the OpenLayers files | all pages |
| 14 | Old images had uninformative file names (`garden-1.jpg`) | Renamed to describe the content and re-compressed | `images/` |

---

## f. Part 3 features

### 1. Interactive elements

**Accordion (FAQ)** — `index.html` + `js/main.js` [R10]
- Five questions, each with a real `<button>` inside a heading.
- `aria-expanded` and `aria-controls` are updated on every click and `aria-hidden` is applied to the closed panel.
- Only one panel opens at a time, and the panel animates open using an animated CSS Grid row, so no height has to be hard-coded.
- The plus icon rotates and becomes a minus when the panel is open.

**Modal dialog (garden tour)** — `index.html` + `js/main.js` [R11]
- Opened by the "Book a free garden tour" button, which is a real `<button>` rather than a link.
- `role="dialog"`, `aria-modal="true"` and `aria-labelledby` point at the modal heading.
- Escape closes it, a click on the dark backdrop closes it, and Tab and Shift+Tab are trapped inside the dialog.
- Focus moves to the first control when it opens and returns to the trigger button when it closes, and the page behind it cannot scroll.
- Every transition (modal fade, accordion, gallery zoom, card lift) uses CSS transitions.

**Scroll reveal** — `js/main.js` [R21]
- `IntersectionObserver` adds `.is-visible` when a section enters the viewport, so content fades and rises into place.
- If the API is unavailable the sections are shown immediately, and `prefers-reduced-motion` disables the animation.

### 2. OpenLayers map — `find-us.html` + `js/map.js` [R6][R7][R8]

- OpenLayers 10.6.1 loaded from jsDelivr with an SRI hash [R20].
- OpenStreetMap base layer (no API key, no account, free to use).
- **Four markers**: main garden, Berea workshop hub, Chatsworth youth plot and the Umhlanga harvest market.
- Clicking a marker opens a popup with the name, address, description, a **"Get directions"** link to Google Maps and a link to the matching page.
- Clicking empty map space **prints the latitude and longitude** of the click in a live region.
- **Zoom in**, **zoom out** and **reset view** buttons; reset uses `view.fit()` to frame all four markers.
- The map is responsive (480px → 340px height on small screens) and calls `updateSize()` on window resize.
- A **location list** under the map lets keyboard and screen reader users reach the same information without clicking a canvas marker.

### 3. Gallery and lightbox — `gallery.html` + `js/gallery.js` [R9][R12]

- Nine photos in a responsive grid that collapses from three columns to one.
- Each photo is a `<button>`, so it is reachable by keyboard and announced as a button.
- The lightbox shows a large image, a caption and a "Photo 3 of 9" counter.
- **Previous**, **next** and **close** buttons; **Left/Right arrow keys**; **Escape to close**; **click outside to close**; **swipe** on touch screens.
- Focus is trapped in the lightbox while it is open and returns to the photo that opened it.
- All images have descriptive alt text, descriptive file names, explicit `width`/`height` to prevent layout shift, and `loading="lazy"` for everything below the fold [R18].

### 4. JSON-driven content — `data/services.json` + `js/services.js` [R1][R2][R24]

- Ten programmes are stored in a JSON file with an id, name, category, price, unit, duration, next date, availability, summary and image.
- The page **loads the file with `fetch()` inside an `async` function**.
- **Live search**: results filter as the visitor types; the search checks the name, category, summary and availability.
- **Category filter**: chips are generated from the categories in the JSON (All, Workshops, Plots, Youth, Volunteering, Sponsorship).
- **Sorting**: name A–Z, price low to high, price high to low, or next date.
- **No-results state**: explains what was searched, gives advice and offers a "Clear filters" button.
- **Loading state**: a pulsing dot and "Loading programmes…" message.
- **Error state**: if the JSON cannot be loaded the visitor sees a friendly message with a "Try again" button instead of an empty page.
- A live region announces "Showing 4 of 10 programmes" for screen reader users.
- Cards are built with `createElement` and `textContent` only — never `innerHTML` [R19].

### 5. Search engine optimisation

| Requirement | Where it is done |
|---|---|
| Unique title under 60 characters | Every page, `<title>` |
| Meta description of 150–160 characters | Every page |
| 5–8 keywords | Every page, `<meta name="keywords">` |
| One `<h1>` per page | Every page |
| Viewport meta | Every page |
| `lang` attribute | `<html lang="en-ZA">` |
| Canonical URL | Every page |
| Open Graph + Twitter Card | Every page |
| Descriptive alt text | All nine gallery images and all content images |
| Clean, lowercase, hyphenated URLs | `find-us.html`, `gallery.html`, `enquiry.html` |
| NAP consistency | Footer on every page and in the structured data |
| `LocalBusiness` JSON-LD | Every page [R16][R17] |
| `robots.txt` | Project root [R15] |
| `sitemap.xml` | Project root [R14] |
| Content Security Policy | Meta tag on every page [R19] |
| `rel="noopener noreferrer"` | Every external link that opens a new tab |
| SRI hashes | The two OpenLayers CDN files [R20] |
| No `innerHTML` for user or data content | All JavaScript |

**Off-page SEO plan** (documented so the strategy is clear even though a student cannot run a full campaign):

1. **Google Business Profile** — claim the Durban North address, choose "Community garden" as the category, add the same NAP, opening hours and photos used on the site, and post the monthly market date.
2. **Local citations** — list the garden in Durban community directories, the municipality's community garden register, and volunteer portals such as forgood, always with exactly the same name, address and phone number.
3. **Backlinks from partners** — ask every school that visits, the Berea hall, the Chatsworth centre and the Umhlanga market to link to `find-us.html` and `services.html` from their own websites.
4. **Social profiles** — use the same handle and profile photo on Facebook and Instagram, and link them from the footer (`sameAs` in the structured data), then share each workshop page.
5. **Local content** — publish a short seasonal planting post every month, because "what to plant in Durban in November" style queries are what local gardeners actually search.
6. **Reviews** — ask workshop attendees and plot holders to leave Google reviews mentioning "Durban" and "vegetable garden".
7. **Search Console** — submit `sitemap.xml`, monitor the Pages report, and fix any crawl errors.

### 6. Forms

**Enquiry form** (`enquiry.html` + `js/enquiry.js`)
- Controls: first name, surname, email, mobile, enquiry-type radio group, programme select, quantity, preferred date, message with a character counter, three optional checkboxes and a consent checkbox — all inside `<fieldset>`/`<legend>` groups with `<label>` elements.
- Validation with **regular expressions**: names `/^[A-Za-z][A-Za-z'\-\s]{1,49}$/`, email `/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/`, South African mobile `/^(\+27|0)[6-8][0-9]{8}$/`, quantity 1–50, date not in the past, message 10–500 characters [R3][R4][R5].
- Invalid fields get `aria-invalid="true"`, a red border **and** a text error message, and an error summary at the top of the form receives focus.
- On submit the button is disabled, the text changes to "Sending your enquiry…", and the form shows a loading message.
- **The submission uses `async`/`await`.** Because there is no server in this portfolio, `sendEnquiry()` resolves a local Promise after 1.2 seconds, exactly like a JSON API would. The `ENDPOINT` constant at the top of the file documents how to switch to a real service: set the URL and the existing `fetch()` block runs instead.
- The reply is **personalised**: it confirms the visitor's name, programme, quantity, requested date, duration, next available start, an estimated total (price × quantity) and the reply time for that programme, plus a generated reference such as `GT-261109-4821`.
- The form has a real `action` (`https://formsubmit.co/info@greenthumbgarden.org`) and `method="post"` as a no-JavaScript fallback.
- Arriving from a service card (`enquiry.html?service=plot-seasonal`) preselects that programme using `URLSearchParams` [R22].

**Contact form** (`contact.html` + `js/contact.js`)
- Controls: full name, email, optional mobile, subject select and message.
- The same validation rules are applied, including the optional-phone rule (validated only when something is typed).
- `const RECIPIENT_EMAIL = "info@greenthumbgarden.org"` is defined **once** at the top of `js/contact.js`.
- On submit the message is assembled and encoded with **`encodeURIComponent`**, producing a `mailto:` link with a subject and body [R23].
- A confirmation panel shows what is ready to send, an **"Open in email app"** button and a **"Copy email address"** fallback for devices with no mail app.
- The form also has a real `action` and `method="post"` for the no-JavaScript case.

---

## g. Accessibility

The site targets WCAG 2.2 level AA [R12]:

- **Skip link** on every page, visible on keyboard focus.
- **Landmarks**: `header`, `nav` with `aria-label`, `main`, `footer`, and `aria-current="page"` on the active menu item.
- **Keyboard**: every interactive element is a real button, link or form control; the accordion, modal and lightbox all work without a mouse.
- **Escape** closes the modal and the lightbox; **arrow keys** move through the gallery.
- **Focus management**: focus moves into dialogs and returns to the trigger when they close; Tab is trapped in both dialogs.
- **Visible focus**: a 3px dark-green outline on all interactive elements.
- **Errors**: announced with `role="alert"`, described by `aria-describedby`, and repeated in a summary that receives focus; colour is never the only signal.
- **Live regions**: search results, price preview, coordinates and form status are announced politely.
- **Images**: descriptive alt text everywhere; decorative icons use `aria-hidden="true"`.
- **Motion**: `prefers-reduced-motion` removes animation.
- **Map alternative**: the location list under the map provides the same information without the canvas.
- **Contrast**: dark green on cream and white on dark green both pass AA.

---

## h. Search engine optimisation (summary)

Every page carries: a unique title, a 150–160 character description, 6 keywords, canonical URL, Open Graph and Twitter tags, `LocalBusiness` JSON-LD with NAP and geo-coordinates, and a Content Security Policy. The site root carries `robots.txt` and `sitemap.xml`. The off-page plan is listed in section f.5.

**One value to update after deployment:** every canonical URL, `og:url`, `og:image` and sitemap entry currently uses the assumed deployment address `https://greenthumbgarden.netlify.app/`. Search and replace that string in all HTML files, `robots.txt` and `sitemap.xml` if the final URL is different.

---

## i. Forms (summary)

Two forms, both fully labelled, validated with regular expressions, keyboard accessible and announced to screen readers:

- `enquiry.html` → simulated asynchronous POST with a personalised quotation and reference number.
- `contact.html` → `mailto:` message built with `encodeURIComponent` and a copy-address fallback.

Full details are in section f.6.

---

## j. Changelog

### Version 3.0.0 — 9 November 2026 (Part 3)

**Added**
- `js/main.js`: mobile navigation, FAQ accordion, modal dialog, scroll reveal, dynamic footer year.
- `gallery.html` and `js/gallery.js`: nine-photo gallery with a full keyboard-accessible lightbox.
- `find-us.html` and `js/map.js`: OpenLayers map with four markers, popups, coordinate readout and zoom/reset controls.
- `data/services.json` and `js/services.js`: JSON-driven programme list with live search, category filter, four sort orders, loading, empty and error states.
- `enquiry.html` and `js/enquiry.js`: validated enquiry form with simulated asynchronous submission and a personalised quotation.
- `contact.html` and `js/contact.js`: validated contact form with a `mailto:` fallback and confirmation panel.
- `404.html`, `robots.txt` and `sitemap.xml`.
- SEO metadata, Open Graph, Twitter Cards, `LocalBusiness` JSON-LD, CSP and SRI on every page.
- Nine optimised photographs with descriptive file names and full credits.

**Changed**
- Repository restructured so the site sits at the repository root for simpler hosting.
- All parts 1 and 2 pages rebuilt on the new shared header and footer with a consistent NAP.
- Stylesheet extended with Part 3 components; the Part 1/2 palette, fonts and breakpoints are unchanged.
- `references.md` consolidated into this README.
- Prices and the address were updated to South African rand and a Durban location.

**Removed**
- `green-thumb-garden.html` (orphan duplicate of the home page).
- Old image files `garden-1.jpg`, `garden-2.jpg`, `workshop.jpg` (replaced by descriptively named, compressed versions).

### Version 2.0.0 — 6 October 2026 (Part 2)

**Added**
- `css/styles.css` linked from every page: layout, cards, footer, forms and three responsive breakpoints.
- Screenshots at 1366px, 768px and 375px in `screenshots/`.
- Harvard reference list of seven online sources.

**Changed**
- Replaced the stray inline styling with shared classes.
- Fixed a broken logo and stray text on the duplicate page.

### Version 1.0.0 — September 2026 (Part 1)

**Added**
- `index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`.
- Three garden photographs and the original green and cream layout.

---

## k. Git commit history

Seventeen descriptive commits cover Part 3, listed here with the exact commands used, so the history can be reproduced commit by commit.

```bash
# 1
git add images/
git commit -m "Add nine descriptively named, compressed gallery photographs"

# 2
git add screenshots/
git commit -m "Add responsive layout screenshots for desktop, tablet and mobile"

# 3
git add css/styles.css
git commit -m "Extend stylesheet with accordion, modal, gallery, form and map components"

# 4
git add js/main.js
git commit -m "Add shared JavaScript for navigation, accordion, modal and scroll reveal"

# 5
git add gallery.html js/gallery.js
git commit -m "Add photo gallery with keyboard-accessible lightbox"

# 6
git add data/services.json
git commit -m "Add JSON data file for the ten garden programmes"

# 7
git add js/services.js
git commit -m "Add live search, category filter and sorting for programmes"

# 8
git add find-us.html js/map.js
git commit -m "Add OpenLayers map with four location markers and directions links"

# 9
git add js/enquiry.js
git commit -m "Add enquiry validation, quotation and asynchronous submission"

# 10
git add js/contact.js
git commit -m "Add contact form validation and mailto fallback"

# 11
git add index.html
git commit -m "Rebuild home page with FAQ accordion, tour modal and SEO metadata"

# 12
git add about.html
git commit -m "Rebuild about page, correct organisation name and fix spelling"

# 13
git add services.html
git commit -m "Rebuild services page around the dynamic programme list"

# 14
git add enquiry.html
git commit -m "Rebuild enquiry form with fieldsets, validation messages and quote panel"

# 15
git add contact.html
git commit -m "Rebuild contact page with validated form and mailto confirmation"

# 16
git add 404.html robots.txt sitemap.xml
git commit -m "Add 404 page, robots.txt and XML sitemap"

# 17
git add README.md
git commit -m "Write Part 3 README with changelog, references and deployment guide"

# 18 - publish
git push origin main
```

> These seventeen commits are the Part 3 build and match the pushed history commit for commit; `git log --oneline` also shows one housekeeping commit at the top, which adds the ignore rules and this correction. Run it to show the full history.

## l. Deployment

The site is plain HTML, CSS and JavaScript with no build step, so it can be hosted on any static host. **Netlify** is recommended because it serves the custom `404.html` automatically.

### Option A — Netlify (drag and drop, 2 minutes)

1. Sign in at <https://app.netlify.com> [R28].
2. Choose **Add new site → Deploy manually**.
3. Drag the whole project folder (the folder that contains `index.html`) onto the drop area.
4. Netlify publishes the site and shows a URL such as `https://random-name-123.netlify.app`.
5. Open **Site configuration → Change site name** and use `greenthumbgarden`.
6. Open **Domain management → HTTPS** and confirm the certificate is active.
7. Replace `https://greenthumbgarden.netlify.app` in all HTML files, `robots.txt` and `sitemap.xml` if your URL is different, then redeploy.

### Option B — Netlify from GitHub (recommended for the marking team)

1. Push the final commit to GitHub.
2. In Netlify choose **Add new site → Import an existing project → GitHub**.
3. Authorise Netlify and pick the repository `wede5020-wede-poe-jovan-david`.
4. Build command: **leave empty**. Publish directory: **`.`** (the repository root).
5. Deploy. Every future `git push` publishes automatically.

### Option C — GitHub Pages

1. Push the final commit to GitHub.
2. Open the repository → **Settings → Pages** [R27].
3. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Save and wait for the green tick; the site appears at `https://emknpm.github.io/wede5020-wede-poe-jovan-david/`.
5. Update the canonical URLs, `robots.txt` and `sitemap.xml` to that address and commit again.

### After deployment

- Submit `sitemap.xml` in Google Search Console.
- Test the live URL with Lighthouse (Performance, Accessibility, Best Practices, SEO).
- Test on a real phone, not only in the browser's device emulator.

---

## m. Pre-deploy and testing checklist

### Before deploying

- [x] Every internal link opens the right page (no 404s).
- [x] No reference to `green-thumb-garden.html` or `references.md` remains.
- [x] All nine images exist with the exact file names used in the HTML and JSON.
- [x] `data/services.json` is reachable at that path and is valid JSON.
- [x] Every page has one `<h1>`, a unique title and a meta description.
- [x] Canonical, Open Graph and Twitter URLs point at the deployment address.
- [x] `robots.txt` and `sitemap.xml` list the same seven pages.
- [x] No console errors on any page.
- [x] No API keys, passwords or personal data in the repository.
- [x] Tested at 1366px, 768px and 375px widths.

### Manual test script (repeat on the live site)

| # | Test | Expected result |
|---|---|---|
| 1 | Open `index.html` and click "Book a free garden tour" | Modal opens, focus lands inside, Escape closes it, focus returns to the button |
| 2 | Open an FAQ question with the keyboard (Tab then Enter) | Panel opens, `aria-expanded` becomes true, only one panel is open |
| 3 | Open `services.html`, type "compost" | List filters instantly and the count updates |
| 4 | Choose the "Plots" category and sort by price high to low | Only plots appear, most expensive first |
| 5 | Search "zzz" | No-results message with a "Clear filters" button |
| 6 | Click "Enquire about this" on a card | Enquiry form opens with that programme preselected |
| 7 | Open `gallery.html` and click a photo | Lightbox opens; arrows, Escape and click-outside all work |
| 8 | Open `find-us.html` | Map loads with four green markers |
| 9 | Click a marker | Popup shows the address and a working Google Maps directions link |
| 10 | Click empty map space | Latitude and longitude appear in the coordinates bar |
| 11 | Use the zoom in, zoom out and reset buttons | Map zooms and reframes all four markers |
| 12 | Submit the enquiry form empty | Error summary lists every problem and focus moves to it |
| 13 | Enter an invalid phone such as `12345` | Inline error explains the South African mobile format |
| 14 | Fill the enquiry form correctly and submit | Button shows a loading state, then a quote with total and reference |
| 15 | Submit the contact form correctly | Confirmation panel appears with a mailto link and copy button |
| 16 | Open the site on a phone at 375px | Menu collapses behind the Menu button and every page stays readable |
| 17 | Turn JavaScript off and reload | All content and the menu remain visible; forms fall back to their `action` |
| 18 | Run Lighthouse on the live URL | Accessibility and SEO 90+ |

---

## n. References

All sources were accessed on 9 November 2026 unless stated otherwise. Harvard (IIE) style is used, and every feature in this project cites at least one source from this list. Numbers in square brackets in the code comments match the numbers below.

1. [R1] MDN Web Docs (2026) *Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API (Accessed: 9 November 2026).
2. [R2] MDN Web Docs (2026) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 9 November 2026).
3. [R3] MDN Web Docs (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 9 November 2026).
4. [R4] MDN Web Docs (2026) *Regular expressions*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions (Accessed: 9 November 2026).
5. [R5] MDN Web Docs (2026) *Constraint validation API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation (Accessed: 9 November 2026).
6. [R6] OpenLayers (2026) *OpenLayers documentation*. Available at: https://openlayers.org/doc/ (Accessed: 9 November 2026).
7. [R7] OpenLayers (2026) *Overlay API reference*. Available at: https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html (Accessed: 9 November 2026).
8. [R8] OpenStreetMap Foundation (2026) *Tile usage policy*. Available at: https://operations.osmfoundation.org/policies/tiles/ (Accessed: 9 November 2026).
9. [R9] W3Schools (2026) *How TO — Lightbox*. Available at: https://www.w3schools.com/howto/howto_js_lightbox.asp (Accessed: 9 November 2026).
10. [R10] W3Schools (2026) *How TO — Accordion*. Available at: https://www.w3schools.com/howto/howto_js_accordion.asp (Accessed: 9 November 2026).
11. [R11] W3Schools (2026) *How TO — CSS Modal*. Available at: https://www.w3schools.com/howto/howto_css_modals.asp (Accessed: 9 November 2026).
12. [R12] W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: 9 November 2026).
13. [R13] Google Search Central (2026) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 9 November 2026).
14. [R14] Google Search Central (2026) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 9 November 2026).
15. [R15] Google Search Central (2026) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 9 November 2026).
16. [R16] Google Search Central (2026) *Local business structured data*. Available at: https://developers.google.com/search/docs/appearance/structured-data/local-business (Accessed: 9 November 2026).
17. [R17] Schema.org (2026) *LocalBusiness*. Available at: https://schema.org/LocalBusiness (Accessed: 9 November 2026).
18. [R18] web.dev (2026) *Lazy loading images*. Available at: https://web.dev/articles/lazy-loading (Accessed: 9 November 2026).
19. [R19] MDN Web Docs (2026) *Content-Security-Policy header*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy (Accessed: 9 November 2026).
20. [R20] MDN Web Docs (2026) *Subresource Integrity*. Available at: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity (Accessed: 9 November 2026).
21. [R21] MDN Web Docs (2026) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 9 November 2026).
22. [R22] MDN Web Docs (2026) *URLSearchParams*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams (Accessed: 9 November 2026).
23. [R23] MDN Web Docs (2026) *Creating hyperlinks (mailto links)*. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks (Accessed: 9 November 2026).
24. [R24] MDN Web Docs (2026) *JSON*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON (Accessed: 9 November 2026).
25. [R25] MDN Web Docs (2026) *Array.prototype.sort()*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort (Accessed: 9 November 2026).
26. [R26] Wikimedia Commons (2026) *Free media repository*. Available at: https://commons.wikimedia.org/ (Accessed: 9 November 2026).
27. [R27] GitHub Docs (2026) *GitHub Pages*. Available at: https://docs.github.com/en/pages (Accessed: 9 November 2026).
28. [R28] Netlify (2026) *Netlify documentation*. Available at: https://docs.netlify.com/ (Accessed: 9 November 2026).

Also acknowledged: the **lecturer-supplied MapBox/OpenLayers sample** used in class as the starting point for the mapping pattern, and the AI assistant credited in section p.

---

## o. Image credits

All photographs are used under a Creative Commons licence or are in the public domain. Images were resized and re-compressed for the web; no other edits were made. Sources are Wikimedia Commons [R26].

| File | What it shows | Author | Licence | Source page |
|---|---|---|---|---|
| `community-vegetable-garden-rows.jpg` | Rows of vegetables in raised community beds | Part 1 image, renamed in Part 3 | Creative Commons (declared in Part 1) | Wikimedia Commons |
| `child-planting-seedlings.jpg` | Young gardener planting a seedling | Part 1 image, renamed in Part 3 | Creative Commons (declared in Part 1) | Wikimedia Commons |
| `container-gardening-workshop.jpg` | Volunteer demonstrating container planting | Part 1 image, renamed in Part 3 | Creative Commons (declared in Part 1) | Wikimedia Commons |
| `raised-bed-vegetable-plot.jpg` | Raised bed with compost and seedlings | Ciara Ní Riain | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Community_garden_Helston_Cornwall_01.jpg |
| `volunteer-planting-garden-bed.jpg` | Volunteer planting in a garden bed | vastateparksstaff | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Volunteers_help_maintain_the_garden_throughout_the_year._-_AA_(13991451719).jpg |
| `school-kitchen-garden-bed.jpg` | Raised beds at a school food garden | Libby Kokes | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Raised_Beds_Out_Front_of_School.jpg |
| `herb-garden-beds-planting.jpg` | Long raised herb and kitchen beds | PralineCoffee | CC0 1.0 | https://commons.wikimedia.org/wiki/File:Kitchen_garden_at_Los_Poblanos.jpg |
| `harvest-market-vegetable-stall.jpg` | Produce stall at a farmers market | Nick-D | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Fruit_and_vegetable_stall_at_Southside_Farmers_Market_November_2025.jpg |
| `community-garden-volunteers-tulips.jpg` | Neighbours planting flowers in a street garden | Hu Gadarn | Public domain | https://commons.wikimedia.org/wiki/File:Community_gardening,_East_Vancouver.jpg |

> **Before commercial reuse:** the three Part 1 photographs were supplied with the earlier parts of this project. Their exact file pages should be confirmed on Wikimedia Commons, because a CC BY or CC BY-SA licence also requires the author's name to be displayed. The six images added in Part 3 are fully credited above.

---

## p. AI and tool declaration

- **AI assistance:** an AI coding assistant (Buffy / Codebuff) was used to help plan the file structure, draft the JavaScript and CSS, and check the HTML for errors. All code was read, tested and edited by the student, and every page was tested in the browser using the checklist in section m.
- **External code:** the accordion, modal and lightbox patterns follow the W3Schools tutorials cited as [R9], [R10] and [R11]; the map follows the OpenLayers documentation [R6][R7] and the lecturer's in-class sample.
- **Libraries:** only OpenLayers 10.6.1 is loaded from a CDN. No jQuery or framework is used, because every interaction is short enough to write in plain JavaScript.
- **No paid services, API keys or accounts** are required by the site.

---

## q. Self-audit against the Part 3 brief

| Requirement | Evidence | Status |
|---|---|---|
| Part 2 feedback listed and addressed | Section e, 14 items | Done |
| At least two interactive elements with transitions | FAQ accordion + tour modal, plus gallery lightbox | Done |
| Advanced DOM manipulation | Dynamic cards, delegated chip clicks, focus traps | Done |
| Keyboard accessible (Escape, `aria-expanded`, focus) | `js/main.js`: accordion, modal | Done |
| OpenLayers map in `js/map.js` | `find-us.html` + `js/map.js` | Done |
| OSM tiles, multiple markers, popups | Four markers with popups | Done |
| Click for coordinates | `#map-coordinates` live region | Done |
| Zoom in/out/reset | Three toolbar buttons | Done |
| "Get directions" Google Maps link | Popup directions button | Done |
| Map responsive | `#map` heights + `updateSize()` | Done |
| Gallery grid with images | Nine items, `gallery.html` | Done |
| Lightbox prev/next/close | `js/gallery.js` | Done |
| Escape and arrow keys | `js/gallery.js` keydown handler | Done |
| Click outside to close | Backdrop click handler | Done |
| Lazy loading, width/height, alt text | Every gallery image | Done |
| JSON dynamic content | `data/services.json` + `js/services.js` | Done |
| Live search | `input` event on `#service-search` | Done |
| Category filter | Generated chips | Done |
| Sorting | Four sort options | Done |
| No-results message | `.empty-state` with clear button | Done |
| Fallback if JSON fails | `.error-state` with retry | Done |
| Unique title under 60 characters | All eight pages | Done |
| Meta description 150–160 characters | All eight pages | Done |
| 5–8 keywords | All eight pages | Done |
| One `<h1>`, viewport, lang | All pages | Done |
| Canonical, OG, Twitter | All pages | Done |
| Descriptive alt text | All images | Done |
| Clean URLs | Lowercase hyphenated file names | Done |
| NAP + LocalBusiness JSON-LD | Every page | Done |
| `robots.txt` and `sitemap.xml` | Project root | Done |
| CSP allowing the CDNs | Meta tag on every page | Done |
| `rel="noopener noreferrer"` and SRI | External links; OpenLayers files | Done |
| `textContent` instead of `innerHTML` | All JavaScript | Done |
| Off-page SEO plan | Section f.5, seven actions | Done |
| Enquiry controls and regex validation | `enquiry.html` + `js/enquiry.js` | Done |
| AJAX submission with loading state | `async`/`await` + simulated endpoint | Done |
| Personalised quote, availability, reply time | `#quote-panel` | Done |
| Real form `action` | `formsubmit.co` endpoint | Done |
| Contact form validation | `js/contact.js` | Done |
| `mailto:` with `RECIPIENT_EMAIL` and `encodeURIComponent` | `js/contact.js` | Done |
| Confirmation with "Open in email app" | `#contact-confirmation` | Done |
| 15–25 descriptive commits with commands | Section k | Done |
| README sections a–k in order | This document | Done |
| Dated changelog, newest first, Parts 1–3 | Section j | Done |
| At least five real Harvard references with citations | Section n, 28 references | Done |
| AI and tool declaration | Section p | Done |
| Image licences | Section o | Done (3 Part 1 images to confirm) |
| Deployment steps and checklist | Sections l and m | Done |

---

**End of README.** Prepared by Jovan David (ST10510821) for WEDE5020 Part 3, 9 November 2026.
