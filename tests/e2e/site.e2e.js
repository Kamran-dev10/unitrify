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
  await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
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
  await expect(page).toHaveURL(/\/length\?v=100&from=cm&to=m$/);
  await page.waitForLoadState("networkidle");
  await expect(page.getByLabel("Enter value")).toHaveValue("100");
  await expect(page.getByLabel("From")).toHaveValue("cm");
  await expect(page.getByLabel("To")).toHaveValue("m");
  await expect(page.locator(".select-all").first()).toHaveText("1");
  // The canonical link stays the clean page URL.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/length$/);
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
