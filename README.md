# Playwright Jira Reporter: Send Playwright Test Results to Jira with Testream

This repository is a practical **Playwright + Jira integration example** using [`@testream/playwright-reporter`](https://docs.testream.app/reporters/playwright). It shows how to upload Playwright test results and failure artifacts (screenshots and traces) from local runs and GitHub Actions into Jira via Testream.

If you are searching for **"Playwright Jira reporter"**, **"Playwright GitHub Actions Jira integration"**, or **"send Playwright results to Jira"**, this repo is the implementation template.

## Why this example is useful

- **CI-ready**: Includes a complete GitHub Actions workflow.
- **Failure artifact capture**: Screenshots are captured on failure and uploaded.
- **Flexible upload control**: Upload is enabled by `TESTREAM_API_KEY` and can be toggled via `TESTREAM_UPLOAD_ENABLED`.
- **Practical demo**: Intentional failures show realistic triage in Jira.

## What is Testream?

[Testream](https://testream.app) is an automated test management and reporting platform for Jira teams. It ingests test results from Playwright and other frameworks, then provides failure diagnostics, trends, and release visibility directly in Jira.

If this sample repository is not the framework you need, browse all native reporters in the Testream docs: <https://docs.testream.app/>.

### Watch Testream in action

Click to see how Testream turns raw CI test results into actionable Jira insights (failures, trends, and release visibility):  
[![Watch the video](https://img.youtube.com/vi/5sDao2Q8k1k/maxresdefault.jpg)](https://www.youtube.com/watch?v=5sDao2Q8k1k)

Install **[Testream Automated Test Management and Reporting for Jira](https://marketplace.atlassian.com/apps/3048460704/testream-automated-test-management-and-reporting-for-jira)** in your Jira workspace to view uploaded runs.

## Project structure

```text
tests/
  passing.spec.ts   - Smoke tests expected to pass
  failing.spec.ts   - Intentional failures to demonstrate artifact capture
playwright.config.ts
.github/workflows/playwright.yml
.env.example
```

`failing.spec.ts` is intentionally incorrect to show end-to-end failure diagnostics in Testream/Jira.

## Quick start: Playwright to Jira reporting

### 1. Create your Testream project and API key

1. Sign in at [testream.app](https://testream.app).
2. Create a project.
3. Copy your API key.

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Set at least:

```bash
TESTREAM_API_KEY=<your key>
```

### 4. Run Playwright tests

```bash
npm test
```

With `TESTREAM_API_KEY`, results upload to Testream. Without it, tests still run and local reports are generated.

## Reporter configuration (`playwright.config.ts`)

Key behavior in this example:

- Reporter is always declared, but upload is controlled by `uploadEnabled`.
- `uploadEnabled` requires API key and allows an explicit off switch via `TESTREAM_UPLOAD_ENABLED=false`.
- `failOnUploadError` is set to `false` in this example.
- `buildName` uses `GITHUB_WORKFLOW`.
- CI metadata (`branch`, `commitSha`, `repositoryUrl`, `buildNumber`, `buildUrl`) is auto-resolved.
- `use.screenshot = 'only-on-failure'` supports artifact-rich triage.

Reporter docs: <https://docs.testream.app/reporters/playwright>

## GitHub Actions setup

The workflow at `.github/workflows/playwright.yml` runs on push, pull request, and manual dispatch.

Add this repository secret:

**Settings -> Secrets and variables -> Actions -> New repository secret**

| Name | Value |
|---|---|
| `TESTREAM_API_KEY` | Your Testream API key |

Workflow env examples already set:

| Variable | Example |
|---|---|
| `TEST_ENV` | `ci` |
| `GITHUB_WORKFLOW` | Auto-injected by runner |

## How results appear in Jira

After connecting Testream to Jira, you get:

- Dashboard summaries for run health
- Failure diagnostics with stack traces, screenshots, and traces
- Trend analytics over time
- Jira issue creation directly from failed tests

## Troubleshooting

### Upload not happening

- Confirm `TESTREAM_API_KEY` is present.
- Confirm `TESTREAM_UPLOAD_ENABLED` is not set to `false`.

### Playwright runs but no Jira data appears

- Verify Testream project connection to the correct Jira workspace.
- Verify Testream Automated Test Management and Reporting for Jira app installation.

### CI uploads missing

- Confirm GitHub Actions secrets are available to the run context.

## FAQ

### Is this repository production-ready?

It is an example template with production-style CI and reporter wiring intended to be adapted.

### Why include failing tests?

To demonstrate artifact capture (screenshots/traces) and Jira-based failure triage.

### Can I run tests without Testream?

Yes. Playwright runs normally without API key-based upload.

## Playwright Jira reporting alternatives (quick view)

| Approach | Benefit | Tradeoff |
|---|---|---|
| Local Playwright HTML only | Simple local debugging | No Jira-native historical analytics |
| Custom upload scripts | Flexible | Higher maintenance overhead |
| Testream Playwright reporter (this repo) | Native integration + artifact-aware Jira workflow | Requires Testream setup |

## Related links

- Testream app: <https://testream.app>
- Testream Automated Test Management and Reporting for Jira: <https://marketplace.atlassian.com/apps/3048460704/testream-automated-test-management-and-reporting-for-jira>
- Playwright reporter docs: <https://docs.testream.app/reporters/playwright>
- Playwright docs: <https://playwright.dev>
