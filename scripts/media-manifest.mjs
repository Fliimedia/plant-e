// Lists every /media/... file referenced by the site content, for the one-time migration from WordPress.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["data", "src/content", "src/components", "src/views"];
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
roots.forEach(walk);
const set = new Set();
for (const f of files) {
  if (f.endsWith("media-manifest.json")) continue;
  for (const m of readFileSync(f, "utf8").matchAll(/\/media\/([\w@.\-/ ()%]+?\.(?:jpe?g|png|gif|webp|svg|pdf|mp4))/gi)) set.add(m[1]);
}
writeFileSync("data/media-manifest.json", JSON.stringify([...set].sort(), null, 0));
console.log(`media manifest: ${set.size} files`);
