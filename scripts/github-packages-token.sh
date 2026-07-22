# shellcheck shell=bash
# Local-dev convenience: hand pnpm a GitHub Packages read token from the gh CLI so the private
# @nulogy/* deps resolve without a hand-made PAT. Guarded so CI (which sets GITHUB_NPM_AUTH_TOKEN
# explicitly) and shells without gh are left untouched.
if [ -z "${GITHUB_NPM_AUTH_TOKEN:-}" ] && command -v gh >/dev/null 2>&1; then
  export GITHUB_NPM_AUTH_TOKEN="$(gh auth token 2>/dev/null || true)"
fi
