// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others) that
// the site's pages changed, so they recrawl sooner. Google does not use
// IndexNow; it reads the sitemap submitted in Search Console instead.
//
// Run after a production deploy:   npm run indexnow
// Only the URLs in the live sitemap are sent.
//
// The key is public by design: IndexNow proves ownership by fetching
// https://<site>/<key>.txt and checking that it contains the same key.

const SITE = (process.env.SITE_URL || "https://scl-inc.vercel.app").replace(/\/$/, "");
const KEY = "97215fb101b54fa5e2a3ee0b4d12ebde";

const host = new URL(SITE).host;

const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
const keyText = keyCheck.ok ? (await keyCheck.text()).trim() : "";
if (keyText !== KEY) {
  console.error(`The key file ${SITE}/${KEY}.txt is not live yet (status ${keyCheck.status}). Deploy first, then run this again.`);
  process.exit(1);
}

const sitemap = await fetch(`${SITE}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`Could not read ${SITE}/sitemap.xml (status ${sitemap.status}).`);
  process.exit(1);
}
const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (urls.length === 0) {
  console.error("The sitemap has no URLs; nothing to submit.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});

// 200 = accepted, 202 = accepted and the key is still being checked.
if (response.status === 200 || response.status === 202) {
  console.log(`IndexNow accepted ${urls.length} URLs (HTTP ${response.status}):`);
  for (const url of urls) console.log(`  ${url}`);
} else {
  console.error(`IndexNow returned HTTP ${response.status}: ${await response.text()}`);
  process.exit(1);
}
