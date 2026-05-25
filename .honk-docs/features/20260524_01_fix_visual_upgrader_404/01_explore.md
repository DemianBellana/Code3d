# Explore: Fix VisualUpgrader 404

## Req

visual-upgrader.js 404 Not Found in sector model-01 and others

## Modules

| Module | Path | Why affected |
| ------ | ---- | ------------ |
| `web3d/model-XX/*.html` | `web3d/model-01/index.html` to `web3d/model-10/page-04.html` | Broken relative imports `../visual-upgrader.js` |
| `VisualUpgrader` | `web3d/visual-upgrader.js` | File exists but not reached |

## Deps

| Module | Consumes | Produces | Constraint |
| ------ | -------- | -------- | ---------- |
| Browser | `visual-upgrader.js` | Visual features | Depends on correct path resolution |
| npx serve | Filesystem | HTTP stream | Redirects and trailing slashes affect relative paths |

## Debt

| Item | Area | Impact |
| ---- | ---- | ------ |
| Hardcoded paths | Imports | High → path resolution errors |
| Mixed structure | `web3d/model-XX.html` vs `web3d/model-XX/index.html` | Med → confusing import levels |

## Risks

| Risk | Prob | Impact | Mitigation |
| ---- | ---- | ------ | ---------- |
| Path break on subdir | Med | High | Use absolute-from-root or more levels |
| Regression on other models | Low | Med | Verify all models 01-10 |

## Prior art

- 20260523_01_unificacion_web3d_esm: Migración a ESM que introdujo estos imports.

## Questions

1. ¿Usar ruta absoluta `/web3d/visual-upgrader.js` o ajustar `../../web3d/visual-upgrader.js`?
2. ¿Por qué existen `model-XX.html` y `model-XX/index.html` simultáneamente?
