# Design: Fix VisualUpgrader 404 | scope:simple | BCs:1

## Complexity
scope:simple | BCs:1 | decomposition:no

## Components
| C | Action | Justification |
|---|---|---|
| `web3d/model-XX/*.html` | MODIFIED | Ajustar rutas de importación de VisualUpgrader |
| `web3d/*.html` | MODIFIED | Estandarizar rutas de importación |

## Structure
- `web3d/model-XX/*.html`: Módulos interactivos (50 archivos)
- `web3d/visual-upgrader.js`: Componente post-procesado (consumido por módulos)

## DAs
### DA-001: Absolute Path Strategy
**Decision:** Usar rutas absolutas desde el root (`/web3d/visual-upgrader.js`) en lugar de rutas relativas (`../`).
**Rationale:** Browser resuelve incorrectamente `../` si la URL no termina en `/` (comportamiento estándar de `npx serve` y otros servidores). La ruta absoluta es agnóstica a la profundidad del archivo actual y al estado de la URL.
**Discarded:** Relativo redundante (`../../web3d/...`) → frágil ante cambios de profundidad de carpetas.
**Consequences:** +Estabilidad en navegación / -Requiere que el proyecto se sirva desde el root del dominio.

## Contracts
{IF-001}: Web3D Sector → VisualUpgrader | in:THREE.Renderer, Scene, Camera | out:VU Instance | err:404 if path wrong

## Mapping
| CA-ID | Components | DA |
|-------|-----------|-----|
| CA-001 | `web3d/model-XX/*.html` | DA-001 |
| CA-002 | `web3d/model-XX/*.html` | DA-001 |

## Performance | N/A
## Security | N/A
## Deps | Three.js (r160)
