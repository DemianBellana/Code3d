# Spec: Rediseño Final Modelo 10

## Delta
| Type | Path | Description |
| :--- | :--- | :--- |
| MODIFIED | `web3d/model-10/index.html` | Rediseño total de composición, iluminación y HUD. |

## CAs
### CA-001: Composición Descentralizada
Given: Usuario accede al Modelo 10.
When: La escena carga.
Then: El objeto 3D principal se posiciona lateralmente (derecha), dejando el centro y la izquierda libres para la lectura del HUD.

### CA-002: Jerarquía Visual Premium
Given: UI del Modelo 10 visible.
When: Se evalúa la jerarquía.
Then: El título ("SYSTEM_CORE" o similar) es el elemento dominante, seguido de un subtítulo descriptivo en tipografía mono y un botón de acción (CTA) con animación de hover sofisticada.

### CA-003: Iluminación de Volumen
Given: Escena 3D renderizada.
When: Se observa el objeto central.
Then: El objeto presenta sombras profundas y brillos controlados (rim light), evitando la sobreexposición blanca y resaltando la complejidad de la geometría.

### CA-004: Estabilidad Mobile
Given: Dispositivo móvil portrait.
When: Se visualiza el Modelo 10.
Then: El objeto 3D se reescala o reposiciona centralmente de forma automática para no desbordar el viewport, y la UI se adapta a un layout vertical legible.

### CA-005: Performance Cierre
Given: Navegador móvil.
When: Animación en curso.
Then: El sistema mantiene 60fps estables mediante la optimización de partículas y el uso de un pixelRatio máximo de 1.5 en mobile.

## Contracts
N/A (CAs visuales/UX).

## Edge Cases
| Edge | Covered by CA |
| :--- | :--- |
| Resize de ventana extremo | CA-004 |
| Bajo rendimiento GPU | CA-005 |

## Restrictions
- No modificar archivos fuera de la carpeta `web3d/model-10/` excepto si es estrictamente necesario para la coherencia.
- Mantener compatibilidad con `VisualUpgrader.js`.

## Open Questions
Ninguna.
