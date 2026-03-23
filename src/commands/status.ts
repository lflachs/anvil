import path from "path";
import fs from "fs/promises";
import chalk from "chalk";
import { parse } from "yaml";

export async function status() {
  const cwd = process.cwd();
  const anvilPath = path.join(cwd, ".anvil");

  try {
    await fs.access(anvilPath);
  } catch {
    console.log(
      chalk.red("No .anvil/ found.") +
        chalk.dim(" Run ") +
        chalk.white("anvil init") +
        chalk.dim(" first.")
    );
    return;
  }

  // Read config
  const configRaw = await fs.readFile(
    path.join(anvilPath, "config.yaml"),
    "utf-8"
  );
  const config = parse(configRaw);

  // Read context
  let context = "";
  try {
    context = await fs.readFile(
      path.join(anvilPath, "CONTEXT.md"),
      "utf-8"
    );
  } catch {
    context = "_No context file._";
  }

  // Count stories
  let storyCount = 0;
  try {
    const stories = await fs.readdir(
      path.join(anvilPath, "output", "stories")
    );
    storyCount = stories.filter((f) => f.endsWith(".md")).length;
  } catch {
    // no stories yet
  }

  // Check which outputs exist
  const outputs = ["prd.md", "design.md", "architecture.md", "sprint-status.md"];
  const existing: string[] = [];
  for (const file of outputs) {
    try {
      await fs.access(path.join(anvilPath, "output", file));
      existing.push(file);
    } catch {
      // doesn't exist
    }
  }

  console.log();
  console.log(chalk.bold(`  ${config.project_name}`) + chalk.dim(` [${config.project_mode}]`));
  console.log();
  console.log(chalk.dim("  Documents:"));
  for (const file of outputs) {
    const icon = existing.includes(file) ? chalk.green("  ✓") : chalk.dim("  ·");
    console.log(`${icon} ${file}`);
  }
  if (storyCount > 0) {
    console.log(chalk.green(`  ✓`) + ` ${storyCount} stories`);
  }
  console.log();
  console.log(chalk.dim("  ---"));
  console.log();
  console.log(context);
}
