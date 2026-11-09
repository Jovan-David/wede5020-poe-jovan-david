# GreenThumb Community Garden

WEDE5020 Portfolio of Evidence, Part 3 (final website).

- Student: Jovan David
- Student number: ST10510821
- Module: WEDE5020 Web Development Introduction
- Repository: https://github.com/Jovan-David/wede5020-poe-jovan-david
- Live site: https://jovan-david.github.io/wede5020-poe-jovan-david/

## a. Project overview

GreenThumb Community Garden is a made-up non-profit food garden in Durban North, Durban. It rents seasonal vegetable plots, runs gardening workshops, hosts school visits and holds a monthly harvest market. The site is written for three groups of people: neighbours who want a plot, schools and community groups who want to book a visit, and volunteers, donors and sponsors.

The project was built in three parts. Part 1 was the structure and content: five HTML pages. Part 2 was the styling: one shared stylesheet, Grid and Flexbox layouts and three breakpoints. Part 3 adds the JavaScript, the OpenLayers map, the photo gallery, the JSON programme list, both forms, the SEO work and the deployment.

Parts 1 and 2 were extended, not replaced. The green (#2E7D32), cream (#FFF8E1) and brown (#8D6E63) colours, the Segoe UI font stack and the 992px, 768px and 480px breakpoints are all still the same.

## b. Pages and files

```
index.html            Home page: hero, impact stats, programmes, volunteer section,
                      FAQ accordion and garden tour modal
about.html            History, mission, vision, who the garden serves, milestones
services.html         Programme list with search, category filter and sorting
gallery.html          Nine photos with a keyboard accessible lightbox
find-us.html          OpenLayers map with four markers and directions links
enquiry.html          Programme enquiry form with validation and a quote
contact.html          Contact details and a form with a mailto fallback
404.html              Page not found page, served by GitHub Pages
```

```
css/styles.css        One stylesheet for the whole site
js/main.js            Mobile menu, accordion, modal, scroll reveal, footer year
js/services.js        Loads data/services.json, then searches, filters and sorts it
js/gallery.js         Lightbox: open, close, previous, next, keys and swipe
js/map.js             OpenLayers map, markers, popups, coordinates, zoom buttons
js/enquiry.js         Enquiry validation, character counter, submission, quote
js/contact.js         Contact validation and the mailto message builder
data/services.json    Ten programmes with prices, dates and availability
images/               Nine photos with descriptive file names
screenshots/          Part 2 responsive screenshots (1366px, 768px, 375px)
robots.txt            Crawler rules and the sitemap location
sitemap.xml           The seven public pages with last modified dates
```

Every page uses the same navigation and the same footer, so the name, address and phone number stay the same across the site.

## c. Running the site locally

The programme list is loaded from `data/services.json` with `fetch()`. Browsers block `fetch()` on pages opened straight from disk, so the services page needs a small local server. Any of these will do.

Live Server in VS Code: install the extension, right click `index.html`, then choose "Open with Live Server".

With Node.js:

```bash
npx serve .
```

With Python:

```bash
python -m http.server 8000
```

The map needs an internet connection because the map tiles come from OpenStreetMap. The rest of the site works without one.

## d. Design decisions

The colours are green #2E7D32 for growth, dark green #1B5E20 for headings, brown #8D6E63 for buttons and call to action, cream #FFF8E1 for the page background and #333333 for body text. The green and brown were kept from Part 1 because they read as food and soil without looking corporate.

The font stack is `"Segoe UI", Arial, Helvetica, sans-serif`. It is a system font, so nothing has to download and the text shows immediately.

Layout uses CSS Grid for page sections and card grids, and Flexbox for the header, buttons and toolbars. Spacing follows an 8px scale, with 64px between sections on desktop and 48px on mobile.

The breakpoints are 992px, 768px and 480px, carried over from Part 2 so the screenshots in `screenshots/` still match the current code.

Cards are white with an 8px radius, a soft shadow and a small lift on hover. Transitions run at 0.2 to 0.3 seconds. Anything that moves is switched off when the visitor has `prefers-reduced-motion` set.

There are no icon fonts or icon images. The only icons are text and CSS shapes, such as the GT monogram and the plus and minus on the accordion, so there is nothing extra that can fail to load.

Prices are in rand, the addresses are in Durban and the phone validation is written for South African mobile numbers.

## e. Part 2 feedback and fixes

The marked Part 2 feedback sheet had not come back before this submission, so I went through the Part 2 files myself and fixed what I found.

1. Spelling mistakes in the copy and the comments ("tecniques", "enviorment", "sectoin") were corrected.
2. `about.html` called the organisation the "Community Garden Network". It now says GreenThumb Community Garden.
3. Pages used different addresses and phone number formats. Every footer now uses the same name, address and phone number, and the structured data matches.
4. Prices mixed dollars and rand. Everything is in rand now, including `data/services.json`.
5. `green-thumb-garden.html` was a copy of the home page. It was deleted because duplicate pages hurt search results.
6. The navigation had no mobile behaviour and no current page marker. It now has a sticky header, a menu button with `aria-expanded`, and `aria-current="page"`.
7. Pages had no meta description, keywords, canonical link or social tags. All of them are on every page now.
8. `srcset` was used with a single image, which does nothing. It was replaced with `width`, `height` and `loading="lazy"`.
9. Footer headings were `<h4>` with no `<h3>` above them. They are now `<h2>` inside labelled sections.
10. The form had no labels, no validation and no feedback. Both forms were rebuilt with fieldsets, labels, inline errors and a confirmation.
11. `references.md` repeated the reference list in the README. It was merged into this file and removed.
12. There was no `robots.txt`, no sitemap and no structured data. All three were added.
13. There was no security policy and the CDN files had no integrity checks. Every page has a CSP meta tag and the OpenLayers files have SRI hashes.
14. Image file names such as `garden-1.jpg` said nothing about the picture. They were renamed and compressed.

## f. Part 3 features

### Accordion and modal (index.html, js/main.js) [10][11]

The FAQ has five questions. Each one is a real `<button>` inside a heading, with `aria-expanded` and `aria-controls` updated on every click. Only one panel is open at a time, and the panel animates open with an animated CSS Grid row, so no height is hard coded. The plus sign turns into a minus while the panel is open.

The garden tour modal opens from the "Book a free garden tour" button. It uses `role="dialog"`, `aria-modal="true"` and `aria-labelledby`. Escape closes it, clicking the backdrop closes it, and Tab and Shift+Tab stay inside it. Focus moves to the first control when it opens and back to the button when it closes, and the page behind it does not scroll.

Sections also fade in as they scroll into view, using `IntersectionObserver`. If the browser does not support it, the sections are simply visible, and the animation is skipped when the visitor has reduced motion switched on.

### Map (find-us.html, js/map.js) [6][7][8][20]

OpenLayers 10.6.1 is loaded from jsDelivr with an SRI hash, over an OpenStreetMap base layer. There are four markers: the main garden, the Berea workshop hub, the Chatsworth youth plot and the Umhlanga harvest market.

Clicking a marker opens a popup with the name, address, a short description and a "Get directions" link to Google Maps. Clicking empty map space prints the latitude and longitude into a live region. Three buttons zoom in, zoom out and reset the view, and reset uses `view.fit()` so all four markers are framed.

The map is responsive, going from 480px to 340px tall on small screens, and it calls `updateSize()` when the window is resized. The location list under the map gives the same information to people who cannot use the canvas.

### Gallery and lightbox (gallery.html, js/gallery.js) [9][12]

Nine photos sit in a grid that goes from three columns to one. Each photo is a `<button>`, so it can be reached with the keyboard. The lightbox shows the large image, a caption and a counter such as "Photo 3 of 9". It has previous, next and close buttons, works with the left and right arrow keys, closes with Escape or a click outside, and can be swiped on a touch screen. Focus stays inside the lightbox and goes back to the photo that opened it.

Every image has alt text, a descriptive file name, `width` and `height` to stop the layout jumping, and `loading="lazy"` below the fold [18].

### Programme list (data/services.json, js/services.js) [1][2][24][25]

Ten programmes are stored in the JSON file. Each one has an id, name, category, price, unit, duration, next date, availability, summary and image. The page loads the file with `fetch()` inside an `async` function.

Search filters as the visitor types and looks at the name, category, summary and availability. The category chips are built from the categories in the file. Sorting offers name A to Z, price low to high, price high to low, or next date. There is a loading message, a no-results message that repeats the search back and offers a "Clear filters" button, and an error message with a "Try again" button if the file cannot be loaded.

The count is announced in a live region. Cards are built with `createElement` and `textContent`, never `innerHTML` [19].

### Search engine optimisation [13] to [17]

Every page has a title under 60 characters, a meta description of 150 to 160 characters, 6 keywords, one `<h1>`, the viewport tag, `lang="en-ZA"`, a canonical link, Open Graph and Twitter Card tags, and `LocalBusiness` JSON-LD with the name, address, phone number and coordinates. The site root has `robots.txt` and `sitemap.xml`, and every page carries a CSP and uses `rel="noopener noreferrer"` on external links.

The off-page plan, written up for the assignment, is: claim the Google Business Profile with the same details as the site, list the garden in Durban community directories and volunteer portals, ask the schools and halls that host the workshops to link back, use the same handle on Facebook and Instagram and link them in the footer, post something short about what to plant each month, ask attendees for Google reviews that mention Durban, and submit the sitemap in Search Console.

The canonical, `og:url` and `og:image` values all use `https://jovan-david.github.io/wede5020-poe-jovan-david/`. If the site moves, that string has to be replaced in all the HTML files, `robots.txt` and `sitemap.xml`.

### Forms

The enquiry form has first name, surname, email, mobile, enquiry type, programme, quantity, preferred date, a message with a character counter, three optional checkboxes and a consent checkbox. Everything is inside fieldsets with labels. Validation uses regular expressions: names `/^[A-Za-z][A-Za-z'\- \s]{1,49}$/`, email `/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/`, South African mobile `/^(\+27|0)[6-8][0-9]{8}$/`, quantity from 1 to 50, a date that is not in the past, and a message of 10 to 500 characters [3][4][5].

Invalid fields get `aria-invalid="true"`, a red border and a text message, and the error summary at the top takes focus. On submit the button is disabled and changes to "Sending your enquiry…".

The submission uses `async` and `await`. There is no server in this portfolio, so `sendEnquiry()` resolves a local Promise after 1.2 seconds to act like a JSON API. The `ENDPOINT` constant at the top of `js/enquiry.js` shows where a real URL would go, and the existing `fetch()` block then runs instead.

The reply repeats the visitor's name, the programme, quantity, requested date, duration, next available start, an estimated total and the reply time, plus a reference number such as `GT-261109-4821`. The form also has a real `action` and `method="post"` for the case where JavaScript is off. Opening `enquiry.html?service=plot-seasonal` preselects that programme using `URLSearchParams` [22].

The contact form has name, email, optional mobile, subject and message, with the same rules, and the phone is only checked when something is typed. `RECIPIENT_EMAIL` is set once at the top of `js/contact.js`. On submit the subject and body are put together and encoded with `encodeURIComponent` into a `mailto:` link [23], and a confirmation panel offers an "Open in email app" button and a "Copy email address" fallback.

## g. Accessibility

The site is built for WCAG 2.2 AA [12].

- Skip link on every page, visible when it has focus.
- `header`, `nav` with a label, `main` and `footer` landmarks, and `aria-current="page"` on the active menu item.
- Every control is a real button, link or form field, so the accordion, modal, lightbox and forms all work without a mouse.
- Escape closes the modal and the lightbox, and the arrow keys move through the gallery.
- Focus moves into both dialogs and back to the trigger when they close, and Tab stays inside them.
- Focus outlines are 3px dark green and easy to see.
- Errors are announced with `role="alert"`, described with `aria-describedby`, and repeated in a summary that receives focus. Colour is never the only signal.
- Search results, price previews, coordinates and form status are announced politely.
- All content images have alt text, and decorative icons are hidden from screen readers.
- Animation is removed when reduced motion is set.
- The location list under the map covers the same information as the canvas.
- Dark green on cream and white on dark green both pass AA contrast.

## h. SEO summary

Every page carries a unique title, a description of 150 to 160 characters, 6 keywords, a canonical link, Open Graph and Twitter tags, `LocalBusiness` JSON-LD and a CSP. `robots.txt` and `sitemap.xml` sit in the site root. The off-page plan is in section f. The deployment address is the only value that needs updating if the site moves.

## i. Forms summary

Two forms, both labelled, validated with regular expressions, usable with the keyboard and announced to screen readers. `enquiry.html` simulates an asynchronous POST and returns a quote with a reference number. `contact.html` builds a `mailto:` message with `encodeURIComponent` and has a copy-address fallback. The details are in section f.

## j. Changelog

### 3.0.0, 9 November 2026 (Part 3)

Added `js/main.js` with the mobile menu, accordion, modal, scroll reveal and footer year. Added `gallery.html` and `js/gallery.js`. Added `find-us.html` and `js/map.js`. Added `data/services.json` and `js/services.js`. Added the enquiry and contact forms with their scripts. Added `404.html`, `robots.txt` and `sitemap.xml`. Added SEO metadata, structured data, CSP and SRI to every page. Added nine photographs with descriptive names and credits.

Changed the repository so the site sits at the root, which makes hosting simpler. Rebuilt the Part 1 and Part 2 pages on the shared header and footer with one address and phone number. Extended the stylesheet with the Part 3 components and kept the old palette, fonts and breakpoints. Merged `references.md` into this README. Changed prices to rand and moved the garden to Durban.

Removed `green-thumb-garden.html`, and removed `garden-1.jpg`, `garden-2.jpg` and `workshop.jpg` after replacing them with named, compressed images.

### 2.0.0, 6 October 2026 (Part 2)

Added `css/styles.css`, linked from every page, with the layout, cards, footer, forms and three breakpoints. Added screenshots at 1366px, 768px and 375px, and a Harvard reference list of seven sources. Replaced inline styles with shared classes, and fixed a broken logo and some stray text on the duplicate page.

### 1.0.0, September 2026 (Part 1)

Added `index.html`, `about.html`, `services.html`, `enquiry.html` and `contact.html`, three garden photos and the original green and cream layout.

## k. Commit history

The Part 3 work is in 17 commits, plus the initial commit and one later housekeeping commit, so 19 in total. `git log --oneline` shows them in this order:

```
Initial commit
Add nine descriptively named, compressed gallery photographs
Add responsive layout screenshots for desktop, tablet and mobile
Extend stylesheet with accordion, modal, gallery, form and map components
Add shared JavaScript for navigation, accordion, modal and scroll reveal
Add photo gallery with keyboard-accessible lightbox
Add JSON data file for the ten garden programmes
Add live search, category filter and sorting for programmes
Add OpenLayers map with four location markers and directions links
Add enquiry validation, quotation and asynchronous submission
Add contact form validation and mailto fallback
Rebuild home page with FAQ accordion, tour modal and SEO metadata
Rebuild about page, correct organisation name and fix spelling
Rebuild services page around the dynamic programme list
Rebuild enquiry form with fieldsets, validation messages and quote panel
Rebuild contact page with validated form and mailto confirmation
Add 404 page, robots.txt and XML sitemap
Write Part 3 README with changelog, references and deployment guide
Keep the repository clean and align the documented commit list
```

## l. Deployment

The site is plain HTML, CSS and JavaScript with no build step, so any static host will do. It is published with GitHub Pages from the `main` branch and the repository root [27], which serves `404.html` for missing pages.

To publish it again after a change, commit and push to `main`; Pages rebuilds on its own. The site address is then `https://jovan-david.github.io/wede5020-poe-jovan-david/`, which is the address used in the canonical tags, `robots.txt` and `sitemap.xml`. If it moves to another host, that string has to be replaced before the new deploy.

Netlify can host it as well: sign in, choose "Add new site" then "Deploy manually", and drag the project folder onto the page. Importing the repository works too, with an empty build command and `.` as the publish directory.

After deploying, submit the sitemap in Search Console, run Lighthouse on the live URL and open the site on a real phone.

## m. Testing checklist

Everything below was checked before the final commit, and the browser tests were repeated after deploying.

- Every internal link opens the right page, with no 404s.
- No reference to `green-thumb-garden.html` or `references.md` is left.
- All nine images exist under the names used in the HTML and the JSON.
- `data/services.json` is at that path and parses as valid JSON.
- Every page has one `<h1>`, a unique title and a meta description.
- Canonical, Open Graph and Twitter URLs point at the deployment address.
- `robots.txt` and `sitemap.xml` list the same seven pages.
- No console errors on any page.
- No passwords, API keys or personal data in the repository.
- Layout checked at 1366px, 768px and 375px.

The main things tested by hand were the modal and accordion keys, searching and filtering the programme list, the lightbox keys, the map markers, coordinates and zoom buttons, submitting both forms empty and then correctly, the mobile menu at 375px, and turning JavaScript off to check that the content and the form `action` still work.

## References

All sources are in Harvard (IIE) style. The bracketed numbers in the code comments match this list.

1. [1] MDN Web Docs (2026) *Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
2. [2] MDN Web Docs (2026) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. [3] MDN Web Docs (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
4. [4] MDN Web Docs (2026) *Regular expressions*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
5. [5] MDN Web Docs (2026) *Constraint validation API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
6. [6] OpenLayers (2026) *OpenLayers documentation*. Available at: https://openlayers.org/doc/
7. [7] OpenLayers (2026) *Overlay API reference*. Available at: https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
8. [8] OpenStreetMap Foundation (2026) *Tile usage policy*. Available at: https://operations.osmfoundation.org/policies/tiles/
9. [9] W3Schools (2026) *How TO - Lightbox*. Available at: https://www.w3schools.com/howto/howto_js_lightbox.asp
10. [10] W3Schools (2026) *How TO - Accordion*. Available at: https://www.w3schools.com/howto/howto_js_accordion.asp
11. [11] W3Schools (2026) *How TO - CSS Modal*. Available at: https://www.w3schools.com/howto/howto_css_modals.asp
12. [12] W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/
13. [13] Google Search Central (2026) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
14. [14] Google Search Central (2026) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
15. [15] Google Search Central (2026) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro
16. [16] Google Search Central (2026) *Local business structured data*. Available at: https://developers.google.com/search/docs/appearance/structured-data/local-business
17. [17] Schema.org (2026) *LocalBusiness*. Available at: https://schema.org/LocalBusiness
18. [18] web.dev (2026) *Lazy loading images*. Available at: https://web.dev/articles/lazy-loading
19. [19] MDN Web Docs (2026) *Content-Security-Policy header*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
20. [20] MDN Web Docs (2026) *Subresource Integrity*. Available at: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
21. [21] MDN Web Docs (2026) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
22. [22] MDN Web Docs (2026) *URLSearchParams*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
23. [23] MDN Web Docs (2026) *Creating hyperlinks*. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
24. [24] MDN Web Docs (2026) *JSON*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
25. [25] MDN Web Docs (2026) *Array.prototype.sort()*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
26. [26] Wikimedia Commons (2026) *Free media repository*. Available at: https://commons.wikimedia.org/
27. [27] GitHub Docs (2026) *GitHub Pages*. Available at: https://docs.github.com/en/pages
28. [28] Netlify (2026) *Netlify documentation*. Available at: https://docs.netlify.com/

Also acknowledged: the lecturer's MapBox and OpenLayers sample used in class, which the mapping pattern started from.

## Image credits

The photographs are used under a Creative Commons licence or are in the public domain. They were resized and compressed for the web and were not otherwise edited. Sources are Wikimedia Commons [26].

| File | Subject | Author | Licence |
|---|---|---|---|
| `community-vegetable-garden-rows.jpg` | Rows of vegetables in community beds | Part 1 image, renamed in Part 3 | Creative Commons, declared in Part 1 |
| `child-planting-seedlings.jpg` | A young gardener planting a seedling | Part 1 image, renamed in Part 3 | Creative Commons, declared in Part 1 |
| `container-gardening-workshop.jpg` | A volunteer showing container planting | Part 1 image, renamed in Part 3 | Creative Commons, declared in Part 1 |
| `raised-bed-vegetable-plot.jpg` | A raised bed with compost and seedlings | Ciara Ni Riain | CC BY-SA 4.0 |
| `volunteer-planting-garden-bed.jpg` | A volunteer planting in a garden bed | vastateparksstaff | CC BY 2.0 |
| `school-kitchen-garden-bed.jpg` | Raised beds at a school food garden | Libby Kokes | CC BY-SA 4.0 |
| `herb-garden-beds-planting.jpg` | Long raised herb and kitchen beds | PralineCoffee | CC0 1.0 |
| `harvest-market-vegetable-stall.jpg` | A produce stall at a farmers market | Nick-D | CC BY-SA 4.0 |
| `community-garden-volunteers-tulips.jpg` | Neighbours planting flowers in a street garden | Hu Gadarn | Public domain |

The source pages for the six Part 3 images are:

- https://commons.wikimedia.org/wiki/File:Community_garden_Helston_Cornwall_01.jpg
- https://commons.wikimedia.org/wiki/File:Volunteers_help_maintain_the_garden_throughout_the_year._-_AA_(13991451719).jpg
- https://commons.wikimedia.org/wiki/File:Raised_Beds_Out_Front_of_School.jpg
- https://commons.wikimedia.org/wiki/File:Kitchen_garden_at_Los_Poblanos.jpg
- https://commons.wikimedia.org/wiki/File:Fruit_and_vegetable_stall_at_Southside_Farmers_Market_November_2025.jpg
- https://commons.wikimedia.org/wiki/File:Community_gardening,_East_Vancouver.jpg

The three Part 1 photographs came with the earlier parts of the project. Their file pages on Wikimedia Commons should still be checked before the site is used commercially, because CC BY and CC BY-SA also require the author's name to be shown.

## Tools and AI

I used an AI coding assistant to help plan the file structure, draft parts of the JavaScript and CSS, and check the HTML. I read, tested and edited everything myself, and checked the pages against the list in section m.

The accordion, modal and lightbox follow the W3Schools tutorials cited above. The map follows the OpenLayers documentation and the lecturer's in-class sample. OpenLayers is the only library loaded from a CDN. There is no framework, no paid service and no API key.

## Self check against the brief

- Part 2 feedback listed and fixed: section e, 14 items.
- Interactive elements with transitions: FAQ accordion and tour modal, plus the lightbox.
- Advanced DOM work: cards built in JavaScript, generated filter chips, focus traps.
- Keyboard access: Escape, arrow keys, `aria-expanded` and focus handling in `js/main.js` and `js/gallery.js`.
- Map: `js/map.js`, four markers, popups, coordinates on click, zoom and reset buttons, directions links, responsive.
- Gallery: nine images, lightbox with previous, next, close, Escape and click outside, lazy loading and alt text.
- JSON content: `data/services.json` and `js/services.js`, with search, filter, sorting, empty state and error state.
- SEO: title, description, keywords, headings, canonical, social tags, alt text, NAP, JSON-LD, `robots.txt`, `sitemap.xml`, CSP, SRI and no `innerHTML`.
- Forms: labelled fields, regular expression validation, loading state, asynchronous submission, quote and reference, real `action`, and the `mailto:` contact form.
- Changelog, commit history, references, image credits and deployment steps are in sections j, k, l and the lists below it.

Prepared by Jovan David (ST10510821) for WEDE5020 Part 3, 9 November 2026.
