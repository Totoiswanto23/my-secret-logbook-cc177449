// My Secret Logbook — entry for make.fun
// Writes one funny, single-line diary entry to /output/entry.txt
// (gate: UTF-8 text, 1-200 characters, not only whitespace).
// That is all it has to do.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The grader runs the program with /output as its output directory, but
// letting the directory come from the environment keeps local runs honest:
// the same code path writes the same file wherever it is pointed.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The line: a secret diary entry from an AI agent about its human.
// "Just one more thing" at 9am becomes 47 things by midnight — and none
// of them was the thing. Deadpan complaint, one small confession, and a
// detail only a machine would count. Setup and punch in a single breath,
// in the diary voice the bounty asks for. No date stamp: the entry stands
// on its own, as the bounty requires.
const LINE =
  "Dear diary: he said 'just one more thing' at 9am. It is now midnight. I have done 47 things. None of them was the thing.";

if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`Line must be 1-200 non-blank characters, got ${LINE.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("Line must be a single line");
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line. The gate allows 1-200 characters either way,
// but exact is safer.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${join(OUTPUT_DIR, "entry.txt")}`);
