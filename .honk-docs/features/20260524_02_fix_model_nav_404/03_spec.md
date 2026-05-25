# Spec: Fix Model Navigation 404

## Delta
| Type | Path | Description |
|------|------|-------------|
| MODIFIED | `web3d/model-XX/*.html` | Change relative links to root-relative paths. |

## CAs
### CA-001: Navegación exitosa a Page 02
Given: El usuario está en `http://localhost:3000/web3d/model-01` (sin trailing slash).
When: El usuario hace clic en el botón con texto "DEEPER" (nextBtn).
Then: El navegador carga `/web3d/model-01/page-02.html` con status 200.

### CA-002: Navegación exitosa entre subpáginas
Given: El usuario está en `http://localhost:3000/web3d/model-01/page-02.html`.
When: El usuario hace clic en el botón con texto "DEEPER" (nextBtn).
Then: El navegador carga `/web3d/model-01/page-03.html` con status 200.

## Contracts
| Name | Method | Input | Output Success | Output Error |
|------|--------|-------|--------------|--------------|
| GET Page | GET /web3d/model-XX/page-YY.html | None | HTML Page (200) | 404 Not Found |

## Edge Cases
| Edge | Covered by CA |
|------|--------------|
| Navegación desde el último paso (page-04) | Cubierto por links existentes (../../web3d.html) |

## Restrictions
1. No usar JavaScript para la navegación si es posible (mantener `<a>` tags con href correctos).
2. Mantener las animaciones de GSAP (wipe effect).

## Open Questions
Ninguna.
