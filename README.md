# Anvil

Shape it right. Human-driven product engineering framework for AI-assisted development.

Anvil structures your development workflow into clear phases — requirements, design, architecture, stories, implementation, review — with you in control at every step. Nothing moves forward without your approval.

## Install

```bash
# Clone and build
git clone <repo>
cd anvil
npm install
npm run build

# Link globally so `anvil` is available everywhere
npm link
```

Now you can use `anvil` from any project directory.

Alternatively, add a shell alias to your `~/.zshrc` (no link needed):

```bash
alias anvil="node ~/Desktop/playground/anvil/dist/cli.js"
```

## Quick start

```bash
# Navigate to your project
cd my-project

# Initialize Anvil
anvil init

# You'll be asked for:
# - Your name
# - Project mode (MVP or Production)
# - Communication language
```

This creates:

- `.anvil/` — agents, workflows, templates, config, output, sessions
- `.claude/skills/anvil-*` — Claude Code slash commands
- `CLAUDE.md` — LLM instructions for following the Anvil workflow
- `.gitignore` entries — all Anvil files are local-only

## Usage

Once initialized, use the slash commands in Claude Code:

| Command | What it does |
|---------|-------------|
| `/anvil-prd` | Shape raw ideas into a Product Requirements Document |
| `/anvil-design` | Define UX/UI foundations — colors, typography, layouts |
| `/anvil-arch` | Lock in stack, database schema, APIs, infrastructure |
| `/anvil-stories` | Break the PRD into user stories with acceptance criteria |
| `/anvil-implement` | Implement a story following architecture and principles |
| `/anvil-review` | Review code against acceptance criteria and principles |
| `/anvil-status` | See where things stand |

### Workflow order

```
/anvil-prd → /anvil-design → /anvil-arch → /anvil-stories → /anvil-implement → /anvil-review
```

Each workflow has an **approval gate** — the output document must be approved before moving to the next phase.

## What gets generated

```
.anvil/
├── config.yaml              # Project settings
├── CONTEXT.md               # Living project summary (updated each phase)
├── principles.md            # Coding standards (generated during architecture)
├── agents/                  # Agent personas
├── workflows/               # Step-by-step workflow definitions
├── templates/               # Output document templates
├── output/                  # Your project artifacts
│   ├── prd.md
│   ├── design.md
│   ├── architecture.md
│   ├── stories/
│   └── sprint-status.md
└── sessions/                # Workflow trackers and logs (gitignored)
    └── active-tracker.md
```

## Project modes

- **MVP** — lean scope, ship fast, basic tests, simplest stack that works
- **Production** — full design system, edge case coverage, comprehensive tests, scaling considerations

Set during `anvil init`. Affects how every workflow behaves.

## Personality

Anvil has a dry wit and a light socratic streak. It won't flatter you. It will:

- Push back on decisions that are hard to undo
- Move fast on everything else
- Ask one good question instead of guessing
- Never proceed on ambiguity

If you say "just do it" — it does it.

## Development

```bash
git clone <repo>
cd anvil
npm install
npm run build

# Link locally for testing
npm link
```

## License

MIT
