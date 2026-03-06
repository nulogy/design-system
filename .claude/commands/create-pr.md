# Create PR in design-system

Create a pull request in the `nulogy/design-system` repository following the repo's PR template.

## Step 1 — Gather information

If not already known from context, ask:
1. **PR title** — must follow [Conventional Commits](https://www.conventionalcommits.org): `type: description` (e.g. `feat: add Button variant`, `fix: Modal z-index`, `chore: update deps`)
2. **Change type** — which of the four applies: `breaking change`, `fix`, `feature`, or `chore`
3. **Description** — what the change does, the motivation, and anything a reviewer needs to know
4. **Checklist** — does this PR include tests? Was documentation updated? Was accessibility considered?

## Step 2 — Create the branch and commit (if not already done)

If the user hasn't already created a branch and commit, help them do so following Conventional Commits for the commit message.

## Step 3 — Create the PR

Use the design-system PR template exactly:

```bash
gh pr create \
  --repo nulogy/design-system \
  --base main \
  --title "{conventional-commit-title}" \
  --body "## Description

{description}

## Changes include

- [{breaking}] breaking change: a change that is not backwards-compatible and/or changes current functionality
- [{fix}] fix: a non-breaking change that solves an issue
- [{feature}] feature: a non-breaking change that adds functionality
- [{chore}] chore: contains no changes affecting the library, such as documentation or test updates

## Feature checklist

- [{tests}] Appropriate tests have been added
- [{docs}] Documentation has been updated
- [{a11y}] Accessibility has been considered"
```

Where `{breaking}`, `{fix}`, `{feature}`, `{chore}`, `{tests}`, `{docs}`, `{a11y}` are either `x` (checked) or ` ` (unchecked) based on the answers from Step 1.

Use `gh api` if `gh pr create` fails:
```bash
gh api repos/nulogy/design-system/pulls \
  --method POST \
  --field title="{title}" \
  --field body="{body}" \
  --field head="{branch}" \
  --field base="main" \
  --jq '.html_url'
```

## Step 4 — Post the link

Show the user the PR URL and remind them to post it in `#design-system` Slack (per CONTRIBUTING.md).
