# Design: Fix Model Navigation 404 | scope:simple | BCs:1

## Complexity
scope:simple | BCs:1 | decomposition:no

## Components
| C | Action | Justification |
|---|---|---|
| `web3d/model-XX/*.html` | MODIFIED | Ajustar `href` de los botones de navegación |

## Structure
- Cada modelo (01-10) tiene una secuencia: `index.html` → `page-02.html` → `page-03.html` → `page-04.html` → `web3d.html`.

## DAs
### DA-001: Root-Relative Internal Links
**Decision:** Cambiar los enlaces relativos `href="page-XX.html"` por enlaces relativos a la raíz `/web3d/model-XX/page-XX.html`.
**Rationale:** Evita dependencia de la URL base del navegador (problema del trailing slash). Garantiza que el botón "DEEPER" siempre apunte al archivo correcto.
**Discarded:** Redirección por JS → añade complejidad innecesaria. Forzar trailing slash → difícil sin configuración de servidor (npx serve no es configurable fácilmente).
**Consequences:** +Robustez en navegación / -Hardcoding del path del modelo en cada archivo.

## Contracts
N/A (Navegación estándar HTML)

## Mapping
| CA-ID | Components | DA |
|-------|-----------|-----|
| CA-001 | `web3d/model-01/index.html` | DA-001 |
| CA-002 | `web3d/model-01/page-02.html` | DA-001 |

## Performance | N/A
## Security | N/A
## Deps | None
