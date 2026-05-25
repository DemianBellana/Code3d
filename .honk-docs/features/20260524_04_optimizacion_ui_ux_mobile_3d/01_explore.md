# Explore: Optimizacion UI/UX y Mobile 3D

## Req

1. Optimizar páginas no bloqueadas del sistema (02, 03, 05, 07, 08, 09, 10)
2. Mantener intactas las páginas 01, 04 y 06
3. Corregir y validar funcionamiento de la web 3D en mobile
4. Estilo Stripe / Vercel / Apple
5. Evitar layouts repetidos entre páginas
6. Calidad Frontend: eliminar código duplicado, estilos en CSS, HTML semántico, JS modular

## Modules

| Module | Path | Why affected |
| :--- | :--- | :--- |
| `web3d-hub` | `web3d.html` | Core navigation hub, needs mobile touch and responsive adjustments. |
| `model-pages` | `web3d/model-*.html` | Pages 02, 03, 05, 07, 08, 09, 10 need UI/UX upgrade and mobile fixes. |
| `visual-upgrader` | `web3d/visual-upgrader.js` | Performance and mobile rendering logic. |

## Deps

| Module | Consumes | Produces | Constraint |
| :--- | :--- | :--- | :--- |
| `Three.js` | WebGL API | 3D Rendering | v0.160.0 (ESM) |
| `VisualUpgrader` | renderer, scene, camera | Post-processed frame | ADR-002 compliance |
| `GSAP` | Tweening engine | Smooth UI transitions | External CDN |

## Debt

| Item | Area | Impact |
| :--- | :--- | :--- |
| Inline Styles | model-*.html | Hard to maintain, slow updates. |
| Duplicate UI Logic | model-*.html | Inconsistent behavior, redundant code. |
| Hardcoded Camera Pos | model-*.html | Broken layout on mobile (portrait). |
| Missing Touch Support | web3d.html | Unusable hub on mobile devices. |

## Risks

| Risk | Prob | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| 3D Scene Overload | Med | High | Use LOD or reduce particle count on mobile. |
| Breaking Hub Nav | Low | High | Ensure `web3d.html` retains functionality while adding touch. |
| UI Incoherence | Low | Med | Use CSS variables and a shared design system. |

## Prior art

- 20260523_01_unificacion_web3d_esm: Unified ESM loading.
- 20260524_01_fix_visual_upgrader_404: Fixed relative paths.

## Questions

1. ¿Se permite crear un archivo CSS global para los modelos 3D?
2. ¿Qué nivel de interactividad táctil se espera (swipe, pinch-to-zoom)?
3. ¿Las páginas 01, 04 y 06 pueden recibir ajustes de CSS si es para consistencia global?
