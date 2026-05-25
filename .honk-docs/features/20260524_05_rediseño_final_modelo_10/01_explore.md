# Explore: Rediseño Final Modelo 10

## Req
Rediseñar Modelo 10 como cierre final premium.
- Composición: objeto 3D como fondo cinematográfico, no bloque central.
- Iluminación: profundidad y volumen, evitar sobreexposición.
- UI/HUD: jerarquía clara (título > subtítulo > acción), estilo elegante.
- Coherencia: alineado con modelos 01-09.
- Performance: optimizado para mobile, estable.

## Modules
| Module | Path | Why affected |
| :--- | :--- | :--- |
| `Model 10` | `web3d/model-10/index.html` | Core redesign target. |
| `Global Style` | `web3d/3d-style.css` | Verify integration, avoid regressions in 01-09. |

## Deps
- Three.js r160
- VisualUpgrader.js
- GSAP

## Debt
- El Modelo 10 actualmente usa un mix de estilos locales que deben ser integrados 100% con la nueva estructura de diseño para asegurar estabilidad.

## Risks
| Risk | Prob | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| Escena 3D intrusiva | Med | High | Ajustar FOV y posición lateral del objeto. |
| Performance Mobile | Low | Med | Mantener pixelRatio controlado y simplificar geometría si es necesario. |

## Prior art
- 20260524_04_optimizacion_ui_ux_mobile_3d: Base de centralización de estilos.

## Questions
1. ¿El objeto 3D (TorusKnot) debe ser sustituido o solo reubicado/re-materializado?
2. ¿Se prefiere un layout de texto a la izquierda (Stripe) o centrado (Vercel) para el cierre final?
