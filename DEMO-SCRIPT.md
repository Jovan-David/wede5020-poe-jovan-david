# What to show in the demo

Live site: https://jovan-david.github.io/wede5020-poe-jovan-david/
Keep it to about five minutes. Open the live URL, not a local file, so the programme list loads.

## 1. The home page (about 30 seconds)

Say: this is a fictional community garden in Durban North. It rents plots, runs workshops and holds a monthly market.

Point at the header and show the menu collapsing when the window is narrowed, then open it with the Menu button.

## 2. FAQ accordion

Open one question. Say the button is a real button, so it works with Tab and Enter, and `aria-expanded` changes. Open a second one to show only one panel stays open at a time.

## 3. Garden tour modal

Click "Book a free garden tour". Say Escape closes it, clicking outside closes it, and Tab stays inside it. Close it with Escape and point out that focus goes back to the button.

## 4. Programmes page (services.html)

- Type "compost" and show the list filtering and the count changing.
- Clear the search and choose the "Plots" category.
- Sort by price high to low.
- Search "zzz" to show the no-results message and the Clear filters button.
- Click "Enquire about this" on a card and point out that the enquiry form opens with that programme already selected.

## 5. Enquiry form (enquiry.html)

Submit it empty first, so the error summary appears and takes focus.

Then fill it in with an invalid phone number such as 12345 to show the inline message, fix it, and submit. The button shows "Sending your enquiry…", then the quote appears with the total, the next date and a reference number.

## 6. Contact form (contact.html)

Submit a short message. The confirmation panel shows the mailto link and the copy button.

## 7. Gallery (gallery.html)

Open a photo. Use the left and right arrow keys, then Escape. Say it can also be closed by clicking outside and swiped on a phone.

## 8. Find us (find-us.html)

Wait for the map to load. Click a marker to show the popup and the directions link. Click empty space to show the coordinates. Use the zoom in, zoom out and reset buttons. Scroll to the location list and say it gives the same information without the map.

## 9. The code (about 30 seconds)

Open `js/services.js` and show the `fetch()`, the filter and the sorting, and point out that cards are built with `createElement` and `textContent`.

Open `js/enquiry.js` and show the regular expressions and the `async` function, and explain that `ENDPOINT` is where a real API URL would go.

## 10. Close

Mention that every page has SEO metadata, `LocalBusiness` structured data, `robots.txt`, `sitemap.xml` and a CSP, and that the site is published with GitHub Pages from the `main` branch.

## If something goes wrong

- No map: check the internet connection and reload. The tiles come from OpenStreetMap.
- No programmes: the JSON is loaded with `fetch()`, so make sure the page was opened from the live URL or a local server, not from disk.
- Asked about hosting: it is static HTML, CSS and JavaScript, so the repository root is the published folder and there is no build step.
