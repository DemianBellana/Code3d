# Explore: Fix Model Navigation 404

## Req

Internal navigation between model pages (index -> page-02 -> page-03) fails with 404.

## Modules

| Module | Path | Why affected |
| ------ | ---- | ------------ |
| `web3d/model-XX/*.html` | `web3d/model-01/index.html` etc. | Relative links `href="page-XX.html"` broken without trailing slash in URL. |

## Deps

| Module | Consumes | Produces | Constraint |
| ------ | -------- | -------- | ---------- |
| Browser | HTML `<a>` tags | Navigation | Path resolution depends on current URL base. |

## Debt

| Item | Area | Impact |
| ---- | ---- | ------ |
| Relative navigation | UI | High → 404 errors if URL is not "perfect". |

## Risks

| Risk | Prob | Impact | Mitigation |
| ---- | ---- | ------ | ---------- |
| Broken links on refactor | Med | High | Use root-relative paths. |

## Prior art

- 20260524_01_fix_visual_upgrader_404: Same root cause (path resolution).

## Questions

1. ¿Estandarizar a `/web3d/model-XX/page-XX.html` o usar `/web3d/model-01/` en el Hub?
