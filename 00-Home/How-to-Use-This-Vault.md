---
tags: [home, guide]
created: 2025-07-08
---

# 📖 How to Use This Vault

## Opening the Vault

1. Download or clone this repository: `git clone https://github.com/winnerineast/awesome-redhat.git`
2. Open [Obsidian](https://obsidian.md/)
3. Click **"Open folder as vault"** → select the `awesome-redhat` folder
4. Start with the [[Dashboard]] to explore

## Navigation

### Folder Structure
The vault is organized into numbered folders:
- `00-Home/` — Dashboard, glossary, and this guide
- `01-Learning-Paths/` — Structured learning progressions
- `02-OpenShift/` — Core OpenShift knowledge (the largest section)
- `03` through `12` — Supporting topics and resources

### Key Conventions
- **`_Index.md`** — Every folder has an index file that serves as a table of contents
- **`[[Wikilinks]]`** — Notes are interlinked using Obsidian wikilinks
- **Tags** — Used for cross-cutting categorization (see [[Dashboard#🏷️ Tags Reference]])
- **YAML Frontmatter** — Every note has metadata (tags, dates, status)

### Templates
Use the templates in `Templates/` when creating new notes:
- [[Topic-Note-Template]] — For knowledge articles
- [[Certification-Study-Template]] — For exam prep notes
- [[Lab-Exercise-Template]] — For hands-on exercises
- [[Resource-Link-Template]] — For curated link collections

## Status Indicators

Notes use a `status` field in frontmatter:

| Status | Meaning |
|---|---|
| `stub` | Placeholder — minimal content |
| `draft` | Work in progress |
| `review` | Content complete, needs review |
| `done` | Reviewed and complete |

## Recommended Obsidian Plugins

These community plugins enhance the experience:
- **Dataview** — Dynamic queries across notes
- **Templater** — Advanced template system
- **Calendar** — Track learning progress by date
- **Kanban** — Manage study tasks visually
- **Graph Analysis** — Better graph view exploration

## Graph View Tips

- Use the **Graph View** (Ctrl/Cmd + G) to visualize connections
- Filter by tags or folders to focus on specific areas
- The OpenShift section will show the densest connections
