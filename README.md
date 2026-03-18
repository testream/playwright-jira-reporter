# Playwright + Testream Reporter

This repository demonstrates how to integrate [Playwright](https://playwright.dev) with [Testream](https://testream.app) so that test results, failure artifacts are automatically uploaded to your Jira workspace after every CI run.

## What is Testream?

[Testream](https://testream.app) is a test reporting tool for Jira teams. It imports CI/CD test results from native reporters (Playwright, Jest, Cypress, and others), giving your team failure inspection, trends, and release visibility directly inside Jira — without manual test case management.

Once configured, every Playwright run streams structured results and artifacts to Testream. Failed tests appear in Jira with the full error message, screenshots, and traces attached, so triage starts with complete context.

## Project structure

```
tests/
  passing.spec.ts   — smoke tests against testream.app (expected to pass)
  failing.spec.ts   — intentionally failing tests that demonstrate artifact capture
playwright.config.ts
.github/workflows/playwright.yml
.env.example
```

`failing.spec.ts` is intentionally wrong — it exists so you can see what a failed test looks like inside Testream and Jira, complete with screenshots, video, and trace.

## Getting started

### 1. Create a Testream project

1. Sign in at [testream.app](https://testream.app) (free plan available).
2. Create a project and copy your API key.

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Configure your API key

```bash
cp .env.example .env
# then set TESTREAM_API_KEY=<your key> in .env
```

### 4. Run the tests

```bash
npm test
```

Results are uploaded to Testream automatically when `TESTREAM_API_KEY` is present. Without a key, tests still run and produce local HTML reports and CTRF output — no upload occurs.

## Testream reporter configuration

The reporter is configured in `playwright.config.ts`. Key points:

- `branch`, `commitSha`, and `repositoryUrl` are **auto-resolved** by the reporter from Git — no manual wiring needed.
- `buildName`, `buildNumber`, and `buildUrl` are read from standard `GITHUB_*` environment variables that GitHub Actions injects automatically.
- Playwright is configured to capture artifacts on failure so Testream can attach them to each result.

## CI with GitHub Actions

The workflow at `.github/workflows/playwright.yml` runs all tests on every push and pull request. The only secret you need to add is your Testream API key:

**Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|---|---|
| `TESTREAM_API_KEY` | your Testream API key |

All other metadata (branch, commit SHA, build URL, workflow name, run number) is resolved automatically — nothing else to configure.

## Viewing results in Jira

After a run completes, open your Testream project and connect it to your Jira workspace. Testream will surface pass/fail trends, flag flaky tests, and let you create Jira issues directly from any failed test with the full failure context pre-filled.

See the [Testream Playwright reporter docs](https://docs.testream.app/reporters/playwright) for the full list of configuration options.

## Troubleshooting

**Results are not uploading**  
Verify `TESTREAM_API_KEY` is set and that `TESTREAM_UPLOAD_ENABLED` is not `false`. In CI, confirm the secret is visible to the workflow job.

**No screenshots after a local run**  
Screenshots only capture on failure. Run `npm run test:failing` to trigger the intentional failures and generate artifacts.

**A selector stopped matching**  
The tests run against live website content. If testream.app copy or layout changes, update the expected text in the relevant spec file.
