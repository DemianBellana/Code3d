# Design: Fix Global Navigation Paths | scope:simple | BCs:1

## Complexity
scope:simple | BCs:1 | decomposition:no

## Components
| C | Action | Justification |
|---|---|---|
| `web3d.html` | MODIFIED | Ajustar array `models` |
| `web3d/model-XX/*.html` | MODIFIED | Ajustar enlaces de retorno al HUB |

## Structure
- Unificación de estrategia de rutas absolutas iniciada en ADR-003.

## DAs
### DA-001: Root-Relative Global Links
**Decision:** Usar `/web3d/...` para enlaces a modelos y `/web3d.html` para el retorno al HUB.
**Rationale:** Consistencia con ADR-003. Evita errores de resolución por clean URLs o falta de trailing slash.
**Discarded:** Relativos con más niveles (`../..`) → Frágiles.
**Consequences:** +Estabilidad total en navegación / -Dependencia de root deploy.

## Contracts
N/A

## Mapping
| CA-ID | Components | DA |
|-------|-----------|-----|
| CA-001 | `web3d.html` | DA-001 |
| CA-002 | `web3d/model-XX/*.html` | DA-001 |

## Performance | N/A
## Security | N/A
## Deps | None
