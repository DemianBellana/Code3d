# Explore: Unificación Total Web3D ESM

## Req

Migrar sectores model-02 al model-10 a Three.js r160 ESM, inyectando Import Map y activando VisualUpgrader en cada uno, manteniendo estabilidad y performance.

## Modules

| Module | Path | Why affected |
| ------ | ---- | ------------ |
| `model-02` | `web3d/model-02/*.html` | Migration target |
| `model-03` | `web3d/model-03/*.html` | Migration target |
| `model-04` | `web3d/model-04/*.html` | Migration target |
| `model-05` | `web3d/model-05/*.html` | Migration target |
| `model-06` | `web3d/model-06/*.html` | Migration target |
| `model-07` | `web3d/model-07/*.html` | Migration target |
| `model-08` | `web3d/model-08/*.html` | Migration target |
| `model-09` | `web3d/model-09/*.html` | Migration target |
| `model-10` | `web3d/model-10/*.html` | Migration target |
| `VisualUpgrader` | `web3d/visual-upgrader.js` | Integration logic |

## Deps

| Module | Consumes | Produces | Constraint |
| ------ | -------- | -------- | ---------- |
| Three.js | ESM imports | WebGL Rendering | r160 version |
| GSAP | Script tag | Animations | Keep as is |
| Import Map | Script tag | Module resolution | Must be before module scripts |

## Debt

| Item | Area | Impact |
| ---- | ---- | ------ |
| Legacy global THREE | Scripts | High |
| r128 version | Scripts | High |

## Risks

| Risk | Prob | Impact | Mitigation |
| ---- | ---- | ------ | ---------- |
| Shader break | Med | High | Check custom shaders compatibility |
| Performance drop (Bloom) | High | Med | Test 60 FPS |
| Module resolution error | Med | High | Ensure correct Import Map paths |

## Prior art

- skip

## Questions

1. HDRI path local or remote? (Currently remote polyhaven)
2. Bloom strength preference for all sectors?
