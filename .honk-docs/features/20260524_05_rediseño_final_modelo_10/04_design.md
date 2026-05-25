# Design: Rediseño Final Modelo 10 | scope:moderate | BCs:1

## Complexity
scope:moderate | BCs:1 | decomposition:no

## Components
| C | Action | Justification |
| :--- | :--- | :--- |
| `model-10/index.html` | MOD | Re-estructuración total de UI y escena 3D. Implementación de layout cinemático. |
| `Scene Composition` | NEW | Lógica de desplazamiento lateral del objeto 3D para despejar el centro. |
| `HUD Premium` | NEW | Sistema de tipografía escalada y jerarquía visual (Apple style). |

## Structure
- `web3d/model-10/index.html`: Contenedor único de la experiencia de cierre.

## DAs
### DA-001: Layout Asimétrico (Cinematic)
**Decision:** Posicionar el objeto 3D en `x: 6` y el HUD en `left: 8vw`.
**Rationale:** El centro despejado permite una lectura limpia y se siente más como una interfaz de control profesional ("SYSTEM_CORE").
**Discarded:** Layout centrado (Vercel) por ser redundante con el Modelo 03.
**Consequences:** +Jerarquía, +Espacio negativo / -Requiere lógica de recentrado en mobile.

### DA-002: Material "Void Crystal"
**Decision:** `MeshPhysicalMaterial` con `color: 0x050505`, `iridescence: 1`, `transmission: 0.95`.
**Rationale:** Crea un efecto de cristal oscuro que absorbe y refracta la luz de forma elegante, evitando la sobreexposición blanca previa.
**Discarded:** Material blanco mate por falta de profundidad.
**Consequences:** +Calidad visual, +Profundidad / +Carga GPU moderada.

### DA-003: Rim Lighting Dinámica
**Decision:** Añadir una `Rim Light` (PointLight posterior) con color contrastado.
**Rationale:** Define el contorno del objeto contra el fondo negro, esencial para el volumen.
**Discarded:** Iluminación global (Ambient) por aplanar la escena.
**Consequences:** +Volumen 3D / -Ninguna.

## Contracts
N/A

## Mapping
| CA-ID | Components | DA |
| :--- | :--- | :--- |
| CA-001 | `Scene Composition` | DA-001 |
| CA-002 | `HUD Premium` | DA-001 |
| CA-003 | `Model 10` | DA-002, DA-003 |
| CA-004 | `Scene Composition` | DA-001 |
| CA-005 | `Model 10` | N/A |

## Performance
- Reducción de partículas a 8,000 para balancear con el material costoso.
- PixelRatio dinámico.

## Security
N/A

## Deps
- Three.js
- VisualUpgrader
- GSAP
