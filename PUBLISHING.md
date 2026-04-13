# Publishing

This project supports publishing to both marketplaces:
- Open VSX Registry (for VSCodium, Eclipse Theia, etc.)
- Visual Studio Code Marketplace

## Prerequisites
- Ensure the `publisher` in `package.json` matches a publisher you control on both registries.
- You must have these tokens:
  - Open VSX: a Personal Access Token (PAT)
  - VS Code Marketplace: a Personal Access Token (PAT)

## CI publishing (recommended)
Publishing is automated via GitHub Actions: `.github/workflows/publish.yml`.

Trigger:
- Create a GitHub Release (type: `published`). The workflow will:
  1) Install dependencies and compile
  2) Package the extension once (`*.vsix`)
  3) Publish to Open VSX if `OVSX_PAT` secret is set
  4) Publish to VS Code Marketplace if `VSCE_PAT` secret is set

Required GitHub repository secrets:
- `OVSX_PAT` — Open VSX token (optional, only needed if you want to publish to Open VSX)
- `VSCE_PAT` — VS Code Marketplace token (optional, only needed if you want to publish to VS Code)

How to create tokens:
- Open VSX: Sign in at `https://open-vsx.org/`, go to your account settings → Tokens → Create token
- VS Code Marketplace: Create a Personal Access Token in Azure DevOps (scope: Marketplace publish)

Versioning:
- Bump the `version` in `package.json` before creating a release.
- Tag name typically matches the version (e.g., `v1.2.3`).

## Local publishing (manual)
You can also publish from your machine if needed.

Build and package:
```bash
npm ci
npm run compile
npm run package
```

Publish to Open VSX:
```bash
OVSX_PAT=your_token npx ovsx publish --packagePath "*.vsix"
# or using npm script (publishes from source):
OVSX_PAT=your_token npm run publish:openvsx
```

Publish to VS Code Marketplace:
```bash
VSCE_PAT=your_token npx vsce publish --packagePath "*.vsix"
# or using npm script (publishes from source):
VSCE_PAT=your_token npm run publish
```

## Troubleshooting
- "Missing token" or 401: verify the correct token and that it has publish rights for your `publisher`.
- "Publisher not found": ensure you have created/claimed the publisher and that `package.json#publisher` matches exactly.
- If one registry’s secret is not configured, that publish step will be skipped automatically in CI.
 