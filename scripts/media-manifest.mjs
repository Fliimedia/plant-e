// Lists every file to copy from WordPress: all uploads from the exports plus every /media/... path the site references.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["data", "src/content", "src/components", "src/views"];
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
roots.forEach(walk);
const set = new Set(JSON.parse(readFileSync("data/media-wp.json", "utf8")));
for (const f of files) {
  if (f.endsWith("media-manifest.json") || f.endsWith("media-wp.json")) continue;
  for (const m of readFileSync(f, "utf8").matchAll(/\/media\/([\w@.\-/ ()%]+?\.(?:jpe?g|png|gif|webp|svg|pdf|mp4))/gi)) set.add(m[1]);
}
writeFileSync("data/media-manifest.json", JSON.stringify([...set].sort(), null, 0));
console.log(`media manifest: ${set.size} files`);
