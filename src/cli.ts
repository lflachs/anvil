#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { init } from "./commands/init.js";
import { status } from "./commands/status.js";

const program = new Command();

const BANNER = `
  ${chalk.bold("ANVIL")} — shape it right
`;

program
  .name("anvil")
  .description("Human-driven product engineering framework")
  .version("0.1.0")
  .addHelpText("before", BANNER);

program
  .command("init")
  .description("Scaffold .anvil/ into the current project")
  .option("--name <name>", "Project name")
  .option("--mode <mode>", "Project mode: mvp or production", "mvp")
  .option("--user <user>", "Your name")
  .option("--lang <lang>", "Communication language", "English")
  .option("-y, --yes", "Skip prompts, use defaults")
  .action(init);

program
  .command("status")
  .description("Show sprint status and project overview")
  .action(status);

program.parse();
