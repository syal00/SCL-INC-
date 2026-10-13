const pages = ["/", "/about", "/services", "/projects", "/projects/interlocking-patio", "/contact", "/missing-page", "/robots.txt", "/sitemap.xml"];

for (const page of pages) {
  const response = await fetch(`http://localhost:3000${page}`);
  const text = await response.text();
  const title = text.match(/<title>([^<]+)<\/title>/)?.[1] ?? text.slice(0, 90).replace(/\s+/g, " ");
  const hasMain = text.includes('id="main"') || page.endsWith(".txt") || page.endsWith(".xml");
  console.log(response.status, page, "|", title, "| main:", hasMain);
}

const empty = await fetch("http://localhost:3000/api/estimate", { method: "POST", body: new FormData() });
console.log("empty", empty.status, JSON.stringify(await empty.json()));

function validForm(startedAt) {
  const form = new FormData();
  form.set("name", "Amina Shah");
  form.set("email", "amina@example.com");
  form.set("phone", "4165550100");
  form.set("service", "Decks");
  form.set("location", "Sample neighbourhood");
  form.set("description", "We would like a new deck across the back of the house, about twenty feet wide.");
  form.set("startedAt", String(startedAt));
  return form;
}

const ready = await fetch("http://localhost:3000/api/estimate", { method: "POST", body: validForm(Date.now() - 5000) });
console.log("unconfigured", ready.status, JSON.stringify(await ready.json()));

const fast = await fetch("http://localhost:3000/api/estimate", { method: "POST", body: validForm(Date.now()) });
console.log("too fast", fast.status, JSON.stringify(await fast.json()));

const home = await fetch("http://localhost:3000/");
const html = await home.text();
const checks = [
  ["skip", html.includes("Skip to content")],
  ["h1", html.includes("Outdoor work, shaped with care.")],
  ["estimate", html.includes("Request a Free Estimate")],
  ["services link", html.includes("/services")],
  ["sample", html.includes("Sample imagery")],
  ["placeholder", html.includes("[Year established]")],
  ["viewport", html.includes("width=device-width")],
  ["lang", html.includes('lang="en"')],
];
for (const [name, ok] of checks) console.log(ok ? "OK" : "MISSING", name);

const contact = await (await fetch("http://localhost:3000/contact")).text();
for (const label of ["Name", "Email", "Phone", "Service needed", "Project location", "Project description", "Photos"]) {
  console.log(contact.includes(label) ? "OK" : "MISSING", "contact label", label);
}
