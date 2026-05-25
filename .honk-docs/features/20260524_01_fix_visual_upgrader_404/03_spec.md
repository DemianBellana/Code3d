# Spec: Fix VisualUpgrader 404

## Delta
| Type | Path | Description |
|------|------|-------------|
| MODIFIED | `web3d/model-XX/*.html` | Change `../visual-upgrader.js` to `/web3d/visual-upgrader.js` |

## CAs
### CA-001: Carga exitosa de VisualUpgrader en Módulos Web3D
Given: El navegador carga `http://localhost:3000/web3d/model-01/index.html` (o cualquier modelo del 01 al 10).
When: El script de tipo module intenta importar `VisualUpgrader`.
Then: El servidor retorna el archivo `visual-upgrader.js` con status 200 desde la ruta `/web3d/visual-upgrader.js`.

### CA-002: Prevención de error 404 en rutas sin trailing slash
Given: El usuario accede a `http://localhost:3000/web3d/model-01` (sin barra final).
When: El navegador procesa la importación de `VisualUpgrader`.
Then: El navegador resuelve la ruta como `/web3d/visual-upgrader.js` y no se genera error 404 en la consola.

## Contracts
| Name | Method | Input | Output Success | Output Error |
|------|--------|-------|--------------|--------------|
| GET VisualUpgrader | GET /web3d/visual-upgrader.js | None | JavaScript Module (200) | 404 Not Found |

## Edge Cases
| Edge | Covered by CA |
|------|--------------|
| Acceso a subpáginas (page-02.html) | CA-001 |
| Acceso vía index.html explícito | CA-001 |

## Restrictions
1. Mantener compatibilidad con ESM (type="module").
2. No usar bundlers (mantener Vanilla).

## Open Questions
1. ¿Es seguro usar rutas absolutas `/web3d/...` si el proyecto se despliega en un subdirectorio en el futuro? (Para este fix se asume despliegue en root `/`).
