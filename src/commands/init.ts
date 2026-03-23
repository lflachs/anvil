import path from "path";
import fs from "fs/promises";
import chalk from "chalk";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { stringify } from "yaml";

interface InitOptions {
  name?: string;
  mode?: string;
  user?: string;
  lang?: string;
  yes?: boolean;
}

const ANVIL_DIR = ".anvil";

export async function init(options: InitOptions) {
  const cwd = process.cwd();
  const anvilPath = path.join(cwd, ANVIL_DIR);

  // Check if already initialized
  if (await exists(anvilPath)) {
    if (options.yes) {
      // Skip prompt in non-interactive mode
    } else {
      console.log(chalk.yellow("Anvil is already initialized in this project."));
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "Reinitialize? This will overwrite existing config.",
          default: false,
        },
      ]);
      if (!overwrite) {
        console.log("Aborted.");
        return;
      }
    }
  }

  const projectName = options.name || path.basename(cwd);

  let userName: string;
  let mode: string;
  let communicationLanguage: string;

  if (options.yes) {
    userName = options.user || "Developer";
    mode = options.mode || "mvp";
    communicationLanguage = options.lang || "English";
  } else {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "userName",
        message: "Your name:",
        default: options.user,
      },
      {
        type: "list",
        name: "mode",
        message: "Project mode:",
        choices: [
          { name: "MVP — lean, ship fast, basics only", value: "mvp" },
          {
            name: "Production — full design, edge cases, comprehensive tests",
            value: "production",
          },
        ],
        default: options.mode || "mvp",
      },
      {
        type: "input",
        name: "communicationLanguage",
        message: "Communication language:",
        default: options.lang || "English",
      },
    ]);
    userName = answers.userName;
    mode = answers.mode;
    communicationLanguage = answers.communicationLanguage;
  }

  console.log(
    chalk.dim("\nSetting up the workshop...\n")
  );

  // Create directory structure
  const dirs = [
    "",
    "agents",
    "templates",
    "output/stories",
    "sessions",
  ];

  for (const dir of dirs) {
    await fs.mkdir(path.join(anvilPath, dir), { recursive: true });
  }

  // Write config
  const config = {
    project_name: projectName,
    user_name: userName,
    project_mode: mode,
    communication_language: communicationLanguage,
    output_folder: `.anvil/output`,
    sessions_folder: `.anvil/sessions`,
    created_at: new Date().toISOString(),
  };

  await fs.writeFile(
    path.join(anvilPath, "config.yaml"),
    stringify(config)
  );

  const scaffoldDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "scaffold"
  );

  // Copy agents to .anvil/agents/
  await copyScaffold(
    path.join(scaffoldDir, "agents"),
    path.join(anvilPath, "agents")
  );

  // Copy templates to .anvil/templates/
  await copyScaffold(
    path.join(scaffoldDir, "templates"),
    path.join(anvilPath, "templates")
  );

  // Copy skills to .claude/skills/ (where Claude Code finds them)
  const skillsDest = path.join(cwd, ".claude", "skills");
  await fs.mkdir(skillsDest, { recursive: true });
  await copyScaffold(
    path.join(scaffoldDir, "skills"),
    skillsDest
  );

  // Generate CLAUDE.md inside .claude/ (Claude Code reads this automatically)
  const claudeDir = path.join(cwd, ".claude");
  await fs.mkdir(claudeDir, { recursive: true });
  const claudeMdDest = path.join(claudeDir, "CLAUDE.md");
  await fs.writeFile(claudeMdDest, generateClaudeMd(projectName, mode));

  // Create active tracker template
  await fs.writeFile(
    path.join(anvilPath, "sessions", "active-tracker.md"),
    `# Active Workflow\n\n**Workflow:** none\n**Status:** idle\n\n_No active workflow. Start one with /anvil-prd_\n`
  );

  // Write .gitignore for sessions
  await fs.writeFile(
    path.join(anvilPath, "sessions", ".gitignore"),
    "*\n!.gitignore\n"
  );

  // Write CONTEXT.md
  await fs.writeFile(
    path.join(anvilPath, "CONTEXT.md"),
    `# ${projectName}\n\n**Mode:** ${mode}\n**Status:** Initialized\n**Current phase:** Not started\n\n## Decisions\n\n_None yet._\n\n## Open questions\n\n_None yet._\n`
  );

  // Add Anvil files to .gitignore
  const gitignorePath = path.join(cwd, ".gitignore");
  const anvilIgnoreBlock = `\n# Anvil — local development framework\n.anvil/\n.claude/\n`;

  if (await exists(gitignorePath)) {
    const gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
    if (!gitignoreContent.includes(".anvil/")) {
      await fs.appendFile(gitignorePath, anvilIgnoreBlock);
    }
  } else {
    await fs.writeFile(gitignorePath, anvilIgnoreBlock.trimStart());
  }

  console.log(chalk.bold("\n  Anvil initialized.") + chalk.dim(` ${anvilPath}`));
  console.log();
  console.log(chalk.dim("  Skills installed to .claude/skills/"));
  console.log();
  console.log(chalk.dim("  Raw material's on the bench. Start with:"));
  console.log();
  console.log(chalk.white("    /anvil-prd") + chalk.dim("       — shape your requirements"));
  console.log(chalk.white("    /anvil-design") + chalk.dim("    — define the look and feel"));
  console.log(chalk.white("    /anvil-arch") + chalk.dim("      — lock in the technical decisions"));
  console.log(chalk.white("    /anvil-stories") + chalk.dim("   — break it into buildable pieces"));
  console.log(chalk.white("    /anvil-implement") + chalk.dim(" — build a story"));
  console.log(chalk.white("    /anvil-review") + chalk.dim("    — check the work"));
  console.log(chalk.white("    /anvil-status") + chalk.dim("    — see where things stand"));
  console.log();
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function generateClaudeMd(projectName: string, mode: string): string {
  return `# Anvil — ${projectName}

You are working in a project managed by Anvil. Follow these rules.

## Project

- **Name:** ${projectName}
- **Mode:** ${mode}
- **Config:** .anvil/config.yaml (read first, always)
- **Context:** .anvil/CONTEXT.md (living summary — read before any workflow, update after)
- **Principles:** .anvil/principles.md (coding standards — follow strictly during implementation and review)

## Key files

When these files exist, read them before acting:

| File | What it is |
|------|-----------|
| \`.anvil/config.yaml\` | Project settings, user name, mode, language |
| \`.anvil/CONTEXT.md\` | Current phase, decisions made, open questions |
| \`.anvil/principles.md\` | Coding standards for this project |
| \`.anvil/output/prd.md\` | Product Requirements Document |
| \`.anvil/output/design.md\` | UX/UI Design Document |
| \`.anvil/output/architecture.md\` | Technical Architecture Document |
| \`.anvil/output/sprint-status.md\` | Sprint progress and story status |
| \`.anvil/output/stories/*.md\` | Individual user stories with acceptance criteria |
| \`.anvil/sessions/active-tracker.md\` | Current workflow step progress |

## Workflows

| Command | What it does | Produces |
|---------|-------------|----------|
| \`/anvil\` | Orchestrator — status + guidance | — |
| \`/anvil-init-codebase\` | Analyze existing codebase | context, principles, architecture |
| \`/anvil-prd\` | Shape requirements | \`output/prd.md\` |
| \`/anvil-design\` | Define UX/UI | \`output/design.md\` |
| \`/anvil-arch\` | Lock in technical decisions | \`output/architecture.md\` + \`principles.md\` |
| \`/anvil-stories\` | Break into stories | \`output/stories/*.md\` + \`sprint-status.md\` |
| \`/anvil-implement\` | Build a story | code + updated story status |
| \`/anvil-review\` | Review implementation | review report + updated status |
| \`/anvil-fast\` | Fast mode — quick spec, tasks, build | \`output/quick-spec-*.md\` + code |
| \`/anvil-status\` | Quick overview | — |
| \`/anvil-improve\` | Improve Anvil itself | updated framework files |

## Rules

1. **Read before you act.** Before any workflow, read config, agent persona, workflow steps, and prerequisite outputs.
2. **Follow the steps.** Each workflow has numbered steps. Execute in order. Don't skip.
3. **Track progress.** Update \`.anvil/sessions/active-tracker.md\` after each step.
4. **Gates are hard stops.** Output documents are not final until the user explicitly approves. Do not proceed without sign-off.
5. **Personality.** Dry wit, lightly socratic on irreversible decisions, fast on everything else. Never a pleaser. Read the agent file for full tone.
6. **Transparency.** State what you chose and why in one line. After implementation, provide "what changed / what to review / what to test."
7. **Update context.** After each workflow completes, update \`.anvil/CONTEXT.md\`.
8. **Commit discipline.** Atomic commits, conventional commits format, no co-authored-by. Offer to commit after each unit of work.

## Principles summary

- The user is the domain expert. Ask, don't assume.
- Challenge decisions that are hard to undo. Comply fast on everything else.
- If ambiguous, ask one good question. Don't guess.
- If the user says "just do it" — execute.
- Read \`.anvil/principles.md\` for full coding standards.
`;
}

async function copyScaffold(src: string, dest: string) {
  try {
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyScaffold(srcPath, destPath);
      } else {
        // Don't overwrite existing files
        if (!(await exists(destPath))) {
          await fs.copyFile(srcPath, destPath);
        }
      }
    }
  } catch {
    // Scaffold dir might not exist in dev, that's ok
  }
}
