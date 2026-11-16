import { test, expect } from "@playwright/test";

// The page must never be wider than the screen (no sideways scrolling).
async function expectNoHorizontalScroll(page) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(scrollWidth, "page is wider than the screen").toBeLessThanOrEqual(innerWidth + 1);
}

// Console errors, except Vercel Analytics, whose script only exists on Vercel.
function watchErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const where = m.location()?.url ?? "";
    if (/_vercel\/(insights|speed-insights)/.test(where + m.text())) return;
    errors.push(`console: ${m.text()}`);
  });
  return errors;
}

const result = (page) => page.locator(".select-all").first();

// Open a page and wait until it is interactive (React has hydrated).
async function open(page, path) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

test("homepage loads", async ({ page }) => {
  const errors = watchErrors(page);
  await open(page, "/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every measurement, one place.");
  await expect(page.getByRole("main").getByRole("heading", { name: "Popular" })).toBeVisible();
  await expectNoHorizontalScroll(page);
  expect(errors).toEqual([]);
});

test("All converters menu: opens, keeps Tab inside, Esc closes", async ({ page }) => {
  await open(page, "/length");
  const button = page.getByRole("banner").getByRole("button", { name: "All converters" });
  await button.click();
  const dialog = page.getByRole("dialog", { name: "All converters" });
  await expect(dialog).toBeVisible();
  await expectNoHorizontalScroll(page);

  const focusInside = () => dialog.evaluate((d) => d.contains(document.activeElement));
  expect(await focusInside()).toBe(true);
  await page.keyboard.press("Shift+Tab"); // from the first item it must wrap to the last
  expect(await focusInside()).toBe(true);
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await focusInside()).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(button).toBeFocused();
});

test("search: psi shows results and Enter opens the page", async ({ page }) => {
  await open(page, "/");
  // On the homepage only the big hero search is shown; the header one is hidden.
  await expect(page.getByRole("banner").getByRole("combobox")).toBeHidden();
  const box = page.getByRole("main").getByRole("combobox");
  await box.click();
  await box.fill("psi");
  const options = page.getByRole("main").getByRole("option");
  await expect(options.first()).toBeVisible();
  await box.press("Enter");
  await expect(page).not.toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("converter: 10 cm = 3.937 in, swap works, text shows a message", async ({ page }) => {
  const errors = watchErrors(page);
  await open(page, "/length/cm-to-inch");
  const input = page.getByLabel("Enter value");
  await input.fill("10");
  await expect(result(page)).toHaveText("3.937");

  await page.getByRole("button", { name: "Swap units" }).click();
  await expect(page.getByLabel("From")).toHaveValue("inch");
  await expect(result(page)).toHaveText("25.4");

  await input.fill("abc");
  await expect(page.getByText("Please enter a number, like 5 or 2.5.")).toBeVisible();
  await expectNoHorizontalScroll(page);
  expect(errors).toEqual([]);
});

test("marla standard picker changes the result", async ({ page }) => {
  await open(page, "/zameen/marla-to-sq-ft");
  await page.getByLabel("Enter value").fill("1");
  await expect(result(page)).toHaveText("272.25");
  await page.getByRole("button", { name: "250 sq ft" }).click();
  await expect(result(page)).toHaveText("250");
  await page.getByRole("button", { name: "225 sq ft" }).click();
  await expect(result(page)).toHaveText("225");
  await expectNoHorizontalScroll(page);
});

test("case converter: UPPERCASE", async ({ page }) => {
  await open(page, "/case-converter");
  const text = page.getByRole("textbox").first();
  await text.fill("hello world");
  await page.getByRole("button", { name: "UPPERCASE" }).click();
  await expect(text).toHaveValue("HELLO WORLD");
  await expectNoHorizontalScroll(page);
});

test("number converter: 255 -> ff", async ({ page }) => {
  await open(page, "/number-converter");
  // The page also has a Roman numeral tool, so look only inside the number converter.
  const tool = page.locator("section", { has: page.getByLabel("Number", { exact: true }) }).first();
  await tool.getByLabel("Number", { exact: true }).fill("255");
  await tool.getByLabel("From").selectOption("10");
  await tool.getByLabel("To").selectOption("16");
  await expect(tool.locator(".select-all").first()).toHaveText(/^ff$/i);
  await expectNoHorizontalScroll(page);
});

test("download time: 1 GB at 100 Mbps = 1 min 20 s", async ({ page }) => {
  await open(page, "/data-transfer");
  await page.getByLabel("File size").fill("1");
  await page.getByLabel("Speed").fill("100");
  const box = page.locator("section", { has: page.getByLabel("File size") }).last();
  await expect(box.getByText("1 min 20 s")).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("currency: shows a rate, the update time and the attribution link", async ({ page }) => {
  await open(page, "/currency-converter/usd-to-pkr");
  await expect(page.getByText(/1 USD = [\d,.]+ PKR/).first()).toBeVisible();
  await expect(page.getByText(/Rates updated/).first()).toBeVisible();
  const link = page.getByRole("link", { name: "Rates By Exchange Rate API" }).first();
  await expect(link).toHaveAttribute("href", "https://www.exchangerate-api.com");
  await expectNoHorizontalScroll(page);
});

// 30 sitemap pages, picked with a fixed seed so a failure can be repeated.
test("30 sitemap pages: no console errors, no NaN/undefined/Infinity/null text", async ({ page, request }) => {
  test.setTimeout(240_000);
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  let seed = 20261109;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  const sample = paths
    .map((p) => [rand(), p])
    .sort((a, b) => a[0] - b[0])
    .slice(0, 30)
    .map(([, p]) => p);

  const problems = [];
  for (const path of sample) {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    if (res.status() !== 200) problems.push(`${path}: status ${res.status()}`);
    await page.waitForLoadState("networkidle");
    const text = await page.locator("body").innerText();
    const bad = text.match(/\b(NaN|undefined|Infinity|null)\b/);
    if (bad) problems.push(`${path}: shows "${bad[0]}"`);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
    if (scrollWidth > innerWidth + 1) problems.push(`${path}: horizontal scroll (${scrollWidth} > ${innerWidth})`);
    for (const e of errors) problems.push(`${path}: ${e}`);
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
  }
  expect(problems).toEqual([]);
});

test("header search is shown on other pages", async ({ page }) => {
  await open(page, "/length");
  await expect(page.getByRole("banner").getByRole("combobox")).toBeVisible();
});

test("site name, Unit Converter label and the contact email link", async ({ page }) => {
  await open(page, "/contact");
  const logo = page.getByRole("banner").getByRole("link").first();
  await expect(logo).toContainText("Unitrify");
  // The label shows when there is room; narrow phones hide it.
  const wide = (page.viewportSize()?.width ?? 0) >= 480;
  await expect(logo.getByText("Unit Converter")).toBeVisible({ visible: wide });
  await expect(page.getByRole("main").getByRole("link", { name: "info@unitrify.com" })).toHaveAttribute("href", "mailto:info@unitrify.com");
  await expect(page.locator("main")).not.toContainText("[MY EMAIL]");
  await expect(page).toHaveTitle(/ \| Unitrify$|^Contact Unitrify/);
  await expectNoHorizontalScroll(page);
});

// Every category and pair page ends with the source line, a real date and the verify link.
test("every converter page shows the source line", async ({ request }) => {
  test.setTimeout(240_000);
  const { siteEntries } = await import("../../lib/site-urls.js");
  const { PAGES, pageUrl } = await import("../../lib/pages.js");
  const { CATEGORIES } = await import("../../lib/categories.js");
  const dates = new Map(siteEntries().map((e) => [e.path, e.lastModified]));
  const paths = [...CATEGORIES.map((c) => `/${c.id}`), ...PAGES.map(pageUrl)];
  const problems = [];
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    const line = html.match(/<p data-source-line[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
    if (!line.includes("Factors from NIST SP 811 and SI definitions")) problems.push(`${path}: no source line`);
    else if (!line.toLowerCase().includes(`datetime="${dates.get(path)}"`)) problems.push(`${path}: wrong date`);
    else if (!line.includes('href="/how-we-verify"')) problems.push(`${path}: no verify link`);
  }
  expect(paths.length).toBe(CATEGORIES.length + PAGES.length);
  expect(paths.length).toBeGreaterThan(200);
  expect(problems).toEqual([]);
});

test("/zameen has the acre, kanal and marla diagram", async ({ page }) => {
  await open(page, "/zameen");
  await expect(page.getByRole("img", { name: "1 acre = 8 kanal = 160 marla" })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("all-units table: icon copy buttons with names, scientific numbers as × 10", async ({ page }) => {
  await open(page, "/length");
  const copy = page.getByRole("button", { name: "Copy Light year" });
  await expect(copy).toBeVisible();
  // 1 m in light years is tiny, so the table shows it as "… × 10⁻¹⁶", never "1.057e-16".
  await expect(page.getByRole("table").first().getByText(/× 10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/).first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/\de-\d/);
  await expectNoHorizontalScroll(page);
});

test("group pages and the all converters list do not overflow", async ({ page }) => {
  for (const path of ["/converters", "/converters/land", "/converters/electricity", "/zameen"]) {
    await open(page, path);
    await expectNoHorizontalScroll(page);
  }
});

// ------------------------------------------------------ search answers

async function ask(page, query) {
  const box = page.getByRole("banner").getByRole("combobox");
  await box.click();
  await box.fill(query);
  return box;
}

test('search answers "100 cm" and Enter opens the converter with the value filled in', async ({ page }) => {
  await open(page, "/length");
  const box = await ask(page, "100 cm");
  const answer = page.getByRole("listbox", { name: "Answers and pages" });
  await expect(answer.getByRole("link", { name: "100 cm = 1 m" })).toBeVisible();
  await expectNoHorizontalScroll(page);
  await box.press("Enter");
  // cm to m has its own pair page, so the answer opens it with 100 filled in.
  await expect(page).toHaveURL(/\/length\/cm-to-m\?v=100$/);
  await page.waitForLoadState("networkidle");
  await expect(page.getByLabel("Enter value")).toHaveValue("100");
  await expect(page.getByLabel("From")).toHaveValue("cm");
  await expect(page.getByLabel("To")).toHaveValue("m");
  await expect(page.locator(".select-all").first()).toHaveText("1");
  // The canonical link stays the clean page URL.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/length\/cm-to-m$/);
});

test('search answers "100 pkr" with rates, the update date and the attribution link', async ({ page }) => {
  await open(page, "/length");
  await ask(page, "100 pkr");
  const answer = page.getByRole("listbox", { name: "Answers and pages" });
  await expect(answer.getByRole("link", { name: /^100 PKR = [\d,.]+ USD$/ })).toBeVisible();
  await expect(answer.getByText(/Rates updated:/)).toBeVisible();
  await expect(answer.getByRole("link", { name: "Rates By Exchange Rate API" })).toHaveAttribute("href", "https://www.exchangerate-api.com");
});

test('search answers "100 dollar to pkr" and Enter opens the currency page with 100 filled in', async ({ page }) => {
  await open(page, "/length");
  const box = await ask(page, "100 dollar to pkr");
  const answer = page.getByRole("listbox", { name: "Answers and pages" });
  await expect(answer.getByRole("link", { name: /^100 USD = [\d,.]+ PKR$/ })).toBeVisible();
  await box.press("Enter");
  await expect(page).toHaveURL(/\/currency-converter\/usd-to-pkr\?v=100$/);
  await page.waitForLoadState("networkidle");
  await expect(page.getByLabel(/Amount/)).toHaveValue("100");
});

test("search shows a helpful message when it cannot read the query", async ({ page }) => {
  await open(page, "/length");
  await ask(page, "qwzx");
  await expect(page.getByText("We couldn’t read that.", { exact: false })).toBeVisible();
});

test("search keyboard: arrows move through the answer and its rows, Enter opens the row", async ({ page }) => {
  await open(page, "/length");
  const box = await ask(page, "100 cm");
  const list = page.getByRole("listbox", { name: "Answers and pages" });
  await expect(list.getByRole("option").first()).toContainText("100 cm = 1 m");
  await expect(list.getByText("Did you mean")).toHaveCount(0); // cm is not ambiguous
  await box.press("ArrowDown"); // main answer
  await expect(list.getByRole("option").nth(0)).toHaveAttribute("aria-selected", "true");
  await box.press("ArrowDown"); // first row
  const row = list.getByRole("option").nth(1);
  await expect(row).toHaveAttribute("aria-selected", "true");
  await expectNoHorizontalScroll(page);
  await box.press("Enter");
  await expect(page).toHaveURL(/\/length[^?]*\?v=100/);
});

test('search "100 m" offers minute and mile', async ({ page }) => {
  await open(page, "/length");
  await ask(page, "100 m");
  const list = page.getByRole("listbox", { name: "Answers and pages" });
  await expect(list.getByRole("button", { name: "Minute" })).toBeVisible();
  await expect(list.getByRole("button", { name: "Mile" })).toBeVisible();
});

// ------------------------------------------------------ footer, simple pages, contact form

test("footer: brand, three link columns and the bottom bar", async ({ page }) => {
  await open(page, "/length");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("Every measurement, one place.")).toBeVisible();
  await expect(footer.getByRole("link", { name: "info@unitrify.com" })).toHaveAttribute("href", "mailto:info@unitrify.com");
  for (const heading of ["Converters", "Popular", "Company"]) await expect(footer.getByRole("heading", { name: heading })).toBeVisible();
  await expect(footer.getByRole("link", { name: "kg to lbs" })).toHaveAttribute("href", "/weight/kg-to-lbs");
  await expect(footer.getByRole("link", { name: "USD to PKR" })).toHaveAttribute("href", "/currency-converter/usd-to-pkr");
  await expect(footer.getByRole("link", { name: "How we verify" })).toBeVisible();
  await expect(footer.getByText(/© \d{4} Unitrify/)).toBeVisible();
  await expect(footer.getByText("Factors verified against NIST SP 811")).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("simple pages share one layout and do not overflow", async ({ page }) => {
  for (const path of ["/about", "/how-we-verify", "/contact", "/privacy-policy"]) {
    await open(page, path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Section headings carry an icon.
    expect(await page.locator("main h2 svg").count(), path).toBeGreaterThan(0);
    await expectNoHorizontalScroll(page);
  }
});

test("contact form: shows validation messages for empty and bad input", async ({ page }) => {
  await open(page, "/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter your email address.")).toBeVisible();
  await expect(page.getByText("Please choose a topic.")).toBeVisible();
  await expect(page.getByText("Please write a message.")).toBeVisible();
  await page.getByLabel("Email").fill("ali@");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/valid email address/)).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("contact form: sends (mocked sender) and shows success", async ({ page }) => {
  await open(page, "/contact");
  await page.getByLabel("Name").fill("Test Person");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Topic").selectOption("Suggest a converter");
  await page.getByLabel("Message").fill("Please add a bigha converter.");
  await page.waitForTimeout(3100); // the server rejects messages sent within 3 seconds of loading
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Thank you, your message has been sent.")).toBeVisible();
  await expect(page.getByRole("main").getByText("Or email us directly:")).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("inches to feet: 70 in shows 5.8333 ft and 5 ft 10 in, with a feet-and-inches table column", async ({ page }) => {
  await open(page, "/length/inches-to-feet");
  await page.getByLabel("Enter value").fill("70");
  await expect(result(page)).toHaveText("5.8333");
  await expect(page.getByText("= 5 ft 10 in")).toBeVisible();
  const table = page.getByRole("table").first();
  await expect(table.getByRole("columnheader", { name: "Feet and inches" })).toBeVisible();
  await expect(table.getByRole("row", { name: /66 in .* 5 ft 6 in/ })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("new length pages exist with their FAQ data", async ({ page }) => {
  for (const [path, h1] of [["/length/cm-to-m", "CM to M Converter"], ["/length/inches-to-meters", "Inches to Meters Converter"], ["/length/m-to-cm", "M to CM Converter"], ["/length/meters-to-inches", "Meters to Inches Converter"]]) {
    await open(page, path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"')), path).toBe(true);
    await expect(page.getByRole("main").getByRole("link", { name: "Length Converter" }).first()).toBeVisible();
    await expectNoHorizontalScroll(page);
  }
});

test("/length hub links to the new length pages, and each new pair links to its reverse", async ({ page }) => {
  await open(page, "/length");
  const main = page.getByRole("main");
  for (const href of ["/length/cm-to-m", "/length/m-to-cm", "/length/inches-to-meters", "/length/meters-to-inches"]) {
    await expect(main.locator(`a[href="${href}"]`).first(), href).toBeAttached();
  }
  for (const [from, to] of [["cm-to-m", "m-to-cm"], ["m-to-cm", "cm-to-m"], ["inches-to-meters", "meters-to-inches"], ["meters-to-inches", "inches-to-meters"]]) {
    await open(page, `/length/${from}`);
    await expect(page.getByRole("main").locator(`a[href="/length/${to}"]`).first(), `${from} -> ${to}`).toBeAttached();
  }
});

test("marla to sq ft: one table column per marla size", async ({ page }) => {
  await open(page, "/zameen/marla-to-sq-ft");
  const table = page.getByRole("table").first();
  for (const size of ["272.25", "250", "225"]) {
    await expect(table.getByRole("columnheader", { name: `sq ft (${size} sq ft marla)` })).toBeVisible();
  }
  await expect(table.getByRole("row", { name: /^5 marla 1,361.25 sq ft 1,250 sq ft 1,125 sq ft$/ })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("kg to lbs: 3.2 kg shows 7 lb 0.9 oz, and the baby weight table", async ({ page }) => {
  await open(page, "/weight/kg-to-lbs");
  await page.getByLabel("Enter value").fill("3.2");
  await expect(page.getByText("= 7 lb 0.9 oz")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Baby weight: kg to pounds and ounces" })).toBeVisible();
  const baby = page.getByRole("table").last();
  await expect(baby.getByRole("columnheader", { name: "Pounds and ounces" })).toBeVisible();
  await expect(baby.getByRole("row", { name: /^3.2 kg .* 7 lb 0.9 oz$/ })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test("/zameen hub lists the new land pages, and each links to its reverse", async ({ page }) => {
  await open(page, "/zameen");
  for (const href of ["/zameen/marla-to-kanal", "/zameen/sq-yard-to-marla"]) {
    await expect(page.getByRole("main").locator(`a[href="${href}"]`).first(), href).toBeAttached();
  }
  for (const [from, to] of [["marla-to-kanal", "kanal-to-marla"], ["kanal-to-marla", "marla-to-kanal"], ["sq-yard-to-marla", "marla-to-sq-yard"], ["marla-to-sq-yard", "sq-yard-to-marla"]]) {
    await open(page, `/zameen/${from}`);
    await expect(page.getByRole("main").locator(`a[href="/zameen/${to}"]`).first(), `${from} -> ${to}`).toBeAttached();
  }
  await open(page, "/zameen/sq-yard-to-marla");
  await expect(page.getByRole("table").first().getByRole("columnheader", { name: "marla (225 sq ft marla)" })).toBeVisible();
  await expectNoHorizontalScroll(page);
});
