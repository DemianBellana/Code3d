# Explore: Fix Global Navigation Paths

## Req

Double prefix `/web3d/web3d/` in model links from Hub. Broken "Back to HUB" links.

## Modules

| Module | Path | Why affected |
| ------ | ---- | ------------ |
| `web3d.html` | Hub | `models` array uses relative links `web3d/model-XX/...` |
| `web3d/model-XX/*.html` | Model pages | "HUB" links use relative `../../web3d.html` |

## Deps

| Module | Consumes | Produces | Constraint |
| ------ | -------- | -------- | ---------- |
| npx serve | URL | File stream | Clean URLs and trailing slashes break relative resolution. |

## Debt

| Item | Area | Impact |
| ---- | ---- | ------ |
| Relative pathing | Navigation | High → 404 errors. |

## Risks

| Risk | Prob | Impact | Mitigation |
| ---- | ---- | ------ | ---------- |
| Subfolder deploy | High | High | Root-relative `/` assumes root deployment. |

## Prior art

- 20260524_01 & 02: Previous pathing fixes.

## Questions

None.
