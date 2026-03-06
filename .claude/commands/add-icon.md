# Add Icon to NDS

Add a new icon to the Nulogy Design System. This is a two-phase workflow across two repos.

## Phase 1: nds-icons

### Step 1 — Gather information

Ask the user for:
- **Material Symbols icon name** in snake_case (e.g. `arrow_split`). Remind the user: prefer Material Symbols (outlined) first, fall back to Material Icons (old) if not found. If unsure, search the [Material Icons library](https://fonts.google.com/icons).

**Default NDS name:** Convert the Material Symbols name to camelCase (e.g. `arrow_split` → `arrowSplit`). Use this unless the user explicitly asks for a different name.

Ask the user: **"Should the NDS icon name be `{camelCaseMaterialName}`, or do you need a different name?"**

Only rename if there's a clear reason (e.g. the Material name is confusing or conflicts with existing icons). If renamed, note the reason for the PR.

Verify the chosen name does not already exist in the `IconName` type list at `/Users/nikolap/NDS/design-system/node_modules/.pnpm/@nulogy+icons@*/node_modules/@nulogy/icons/dist/index.d.ts`.

### Step 2 — Get the SVG

Ask the user: **"Do you have a custom SVG, or should I find one from Material Symbols?"**

**Option A — Custom SVG:**
Ask the user to paste the SVG content directly in the chat. Before saving, validate it against these requirements and flag any issues to the user:

- **Canvas**: `width="24" height="24" viewBox="0 0 24 24"`
- **Padding**: Icon content must stay within a **20×20 safe zone** — keep all paths within the region from `(2, 2)` to `(22, 22)`. This is 2px padding on each side, matching the Material Design icon grid.
- **Style**: Outlined/unfilled strokes — no solid filled shapes. Matches NDS's current icon direction.
- **Paths**: Remove any `fill="none"` bounding-box paths (e.g. `<path d="M0 0h24v24H0z" fill="none"/>`) before saving — these are invisible and stripped by the build script anyway.

**Option B — Material Symbols (default):**

> **Important:** Do NOT use the `google/material-symbols` GitHub repo directly — it lags behind the published npm package and many icons will 404. Always use jsDelivr to serve from the npm package instead.

Fetch the outlined SVG from jsDelivr:
```
https://cdn.jsdelivr.net/npm/@material-symbols/svg-400/outlined/{snake_case_name}.svg
```

> **Note on viewBox:** Material Symbols SVGs use a 960px internal coordinate system (`viewBox="0 -960 960 960"`). This is correct and intentional — do not change the viewBox. Only set `width="24" height="24"` on the `<svg>` element.

If jsDelivr 404s, try the old Material Icons library:
```
https://raw.githubusercontent.com/google/material-design-icons/master/src/{snake_case_name}/materialiconsoutlined/24px.svg
```

If neither source works, fall back to Option A and ask the user to provide the SVG.

### Step 3 — Clone nds-icons

```bash
git clone git@github.com:nulogy/nds-icons.git /tmp/nds-icons
```

### Step 4 — Create a branch

```bash
cd /tmp/nds-icons
git checkout -b feat/add-{camelCaseName}-icon
```

### Step 5 — Add the SVG

Save the SVG content to `/tmp/nds-icons/assets/{camelCaseName}.svg`.

The SVG must be clean:
- Keep all `<path>` elements except any with `fill="none"` (those are transparent bounding boxes)
- Preserve the `viewBox` attribute on the `<svg>` element
- Do not add or remove any paths beyond this

### Step 6 — Commit and push

```bash
cd /tmp/nds-icons
git add assets/{camelCaseName}.svg
git commit -m "feat: add {camelCaseName} icon"
git push origin feat/add-{camelCaseName}-icon
```

### Step 7 — Create PR in nds-icons

Use `gh pr create` targeting the `master` branch:
- Title: `feat: add {camelCaseName} icon`
- Body: include icon name, source (Material Symbols, Material Icons, or custom), and a note about the outlined style direction
- Reviewers: `nikola-nulogy` (design review) and `jherdman` (technical review)

Ask the user for the **intended usage** of the icon before creating the PR (e.g. "To be used for split proposals in Supplier Collaboration").

```bash
gh pr create \
  --repo nulogy/nds-icons \
  --base master \
  --title "feat: add {camelCaseName} icon" \
  --body "## Summary

Adds the \`{camelCaseName}\` icon.

**Source:** [{source display name}]({link to icon on fonts.google.com})

{If the NDS name was renamed from the Material Symbols camelCase default, add this line:
**NDS name:** \`{camelCaseName}\` (renamed from \`{originalCamelCaseName}\` — {reason})
Otherwise omit this line entirely.}

**Intended usage:** {intended usage from user}" \
  --reviewer nikola-nulogy \
  --reviewer jherdman
```

For the source link, use:
- Material Symbols: `https://fonts.google.com/icons?selected=Material+Symbols+Outlined:{snake_case_name}`
- Material Icons: `https://fonts.google.com/icons?selected=Material+Icons+Outlined:{snake_case_name}`
- Custom SVG: omit the link, just write `Custom SVG`

Show the user the PR URL.

---

## Phase 2: design-system (manual — wait for user confirmation)

After creating the nds-icons PR, tell the user:

> "Phase 1 is done! Once your nds-icons PR is merged, semantic release will automatically publish a new `@nulogy/icons` version to npm. Come back and let me know when it's merged and I'll take care of the design-system PR."

**Do not proceed until the user explicitly says the nds-icons PR has been merged.**

When the user confirms the merge, check the latest published version:
```bash
npm view @nulogy/icons version
```

Then proceed with the following steps.

### Step 1 — Update the dependency

```bash
cd /Users/nikolap/NDS/design-system
pnpm update @nulogy/icons@{newVersion}
```

### Step 2 — Create a branch and PR

```bash
cd /Users/nikolap/NDS/design-system
git checkout -b feat/update-icons-{newVersion}
git add package.json pnpm-lock.yaml
git commit -m "feat: update @nulogy/icons to {newVersion} (adds {camelCaseName} icon)"
git push origin feat/update-icons-{newVersion}
gh pr create \
  --repo nulogy/design-system \
  --base main \
  --title "feat: update @nulogy/icons to {newVersion}" \
  --body "## Description

Updates \`@nulogy/icons\` to \`{newVersion}\`, adding the \`{camelCaseName}\` icon. {intended usage}

**nds-icons PR:** {link to merged nds-icons PR}

## Changes include

- [ ] breaking change: a change that is not backwards-compatible and/or changes current functionality
- [ ] fix: a non-breaking change that solves an issue
- [x] feature: a non-breaking change that adds functionality
- [ ] chore: contains no changes affecting the library, such as documentation or test updates

## Feature checklist

- [ ] Appropriate tests have been added
- [x] Documentation has been updated
- [x] Accessibility has been considered" \
  --reviewer nikola-nulogy \
  --reviewer jherdman
```

Show the user the PR URL.

---

## Cleanup (after both PRs are merged)

Delete the nds-icons feature branch:
```bash
git push origin --delete feat/add-{camelCaseName}-icon --repo nulogy/nds-icons
```
