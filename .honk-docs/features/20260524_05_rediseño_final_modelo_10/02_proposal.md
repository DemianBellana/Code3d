# Proposal: Rediseño Final Modelo 10 Transcendence

## Problem
Síntoma: El Modelo 10 compite visualmente entre la UI y el objeto 3D, rompiendo la jerarquía de "cierre premium".
Causa: Posicionamiento centralizado del objeto, iluminación plana en versiones previas, y HUD con jerarquía débil.

## Alternatives
| Alt | Pros | Contras | Why |
| :--- | :--- | :--- | :--- |
| **Composición Cinemática Lateral** | Objeto 3D actúa como ancla visual derecha; HUD domina izquierda con jerarquía clara. | Requiere ajuste de cámara preciso para no perder el objeto en mobile. | **Seleccionado:** Proporciona el acabado "Premium Final Boss" solicitado. |
| Rediseño Centrado Minimalista | Enfoque Apple total, mucha elegancia. | Puede sentirse vacío o similar al Modelo 08. | Descartado: Se busca impacto de cierre. |

## Selected
**Enfoque Cinemático Lateral (Stripe-Vercel Hybrid):** Reubicar el objeto 3D a la derecha/fondo con material de alta refracción. HUD a la izquierda con tipografía escalada y jerarquía visual estricta.

## Scope
**IN:**
- `web3d/model-10/index.html` →
    - Reposicionamiento de `centralObj` (x: 5-8) para despejar el centro.
    - Material "Void Crystal" (negro traslúcido con iridiscencia sutil).
    - Iluminación de tres puntos (Key, Fill, Rim) con colores fríos.
    - HUD: Título masivo, subtítulo explicativo, CTA premium "TERMINATE PROTOCOL".
    - Animaciones de entrada GSAP coordinadas.
- Performance: Optimización de conteo de partículas y pixelRatio.

**OUT:**
- Cambio de geometría core (se mantiene TorusKnot por coherencia con el Hub).
- Modificación de modelos 01-09.

## Rollback
Git revert del archivo `web3d/model-10/index.html`.

## Impact
mod: 1 new: 0 tests: 0
