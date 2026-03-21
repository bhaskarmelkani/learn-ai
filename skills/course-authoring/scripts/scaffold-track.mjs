import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const COURSE_LEVELS = new Set(["conceptual", "builder"]);
const PROFESSIONS = new Set(["foundations", "engineering", "product", "business"]);
const PROFESSION_LABELS = {
  foundations: "Foundations",
  engineering: "Engineering",
  product: "Product",
  business: "Business",
};

function usage() {
  console.log(
    "Usage: node skills/course-authoring/scripts/scaffold-track.mjs --track-id <id> --title <title> --profession <profession> [--level <conceptual|builder>] [--force]"
  );
}

function parseArgs(argv) {
  const args = {
    trackId: "",
    title: "",
    profession: "",
    levels: [],
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--track-id") {
      args.trackId = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (token === "--title") {
      args.title = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (token === "--profession") {
      args.profession = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (token === "--level") {
      const level = argv[index + 1] ?? "";
      if (level) args.levels.push(level);
      index += 1;
      continue;
    }

    if (token === "--force") {
      args.force = true;
      continue;
    }

    if (token === "--help" || token === "-h") {
      usage();
      process.exit(0);
    }
  }

  return args;
}

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { trackId, title, profession, levels, force } = parseArgs(process.argv.slice(2));

  if (!trackId || !title || !profession) {
    usage();
    process.exit(1);
  }

  if (!/^[a-z0-9-]+$/.test(trackId)) {
    console.error("track-id must be kebab-case.");
    process.exit(1);
  }

  if (!PROFESSIONS.has(profession)) {
    console.error(`profession must be one of: ${Array.from(PROFESSIONS).join(", ")}`);
    process.exit(1);
  }

  const resolvedLevels = levels.length > 0 ? levels : ["conceptual", "builder"];
  for (const level of resolvedLevels) {
    if (!COURSE_LEVELS.has(level)) {
      console.error(`level must be one of: ${Array.from(COURSE_LEVELS).join(", ")}`);
      process.exit(1);
    }
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const skillDir = path.resolve(scriptDir, "..");
  const repoRoot = path.resolve(skillDir, "..", "..");
  const templateRoot = path.join(skillDir, "assets", "course-template");
  const outputRoot = path.join(repoRoot, "src", "content", "tracks", trackId);

  const replacements = {
    __TRACK_ID__: trackId,
    __TRACK_TITLE__: title,
    __PROFESSION__: profession,
    __PROFESSION_LABEL__: PROFESSION_LABELS[profession],
  };

  const createdFiles = [];
  const skippedFiles = [];

  for (const level of resolvedLevels) {
    const levelTemplateRoot = path.join(templateRoot, level);
    const outputDirectory = path.join(outputRoot, level);
    const templateFiles = await fs.readdir(levelTemplateRoot);

    await ensureDirectory(outputDirectory);

    for (const templateFile of templateFiles) {
      const templatePath = path.join(levelTemplateRoot, templateFile);
      const outputPath = path.join(outputDirectory, templateFile);

      if (!force && (await pathExists(outputPath))) {
        skippedFiles.push(outputPath);
        continue;
      }

      let fileContents = await fs.readFile(templatePath, "utf8");
      fileContents = fileContents
        .replaceAll("__LEVEL__", level)
        .replaceAll("__LEVEL_LABEL__", level === "conceptual" ? "Conceptual" : "Builder");

      for (const [placeholder, value] of Object.entries(replacements)) {
        fileContents = fileContents.replaceAll(placeholder, value);
      }

      await fs.writeFile(outputPath, fileContents);
      createdFiles.push(outputPath);
    }
  }

  console.log(`Scaffolded track: ${trackId}`);
  console.log(`Profession: ${profession}`);
  console.log(`Levels: ${resolvedLevels.join(", ")}`);

  if (createdFiles.length > 0) {
    console.log("\nCreated:");
    for (const filePath of createdFiles) {
      console.log(`- ${path.relative(repoRoot, filePath)}`);
    }
  }

  if (skippedFiles.length > 0) {
    console.log("\nSkipped existing files:");
    for (const filePath of skippedFiles) {
      console.log(`- ${path.relative(repoRoot, filePath)}`);
    }
  }

  console.log("\nNext steps:");
  console.log("- Update src/content/catalog.ts with the new track metadata.");
  console.log("- Replace scaffold text with real course content.");
  console.log("- Run npm run build.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
