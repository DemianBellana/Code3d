# Spec: Fix Global Navigation Paths

## Delta
| Type | Path | Description |
|------|------|-------------|
| MODIFIED | `web3d.html` | Change `link` in `models` array to root-relative. |
| MODIFIED | `web3d/model-XX/*.html` | Change "HUB" links to `/web3d.html`. |

## CAs
### CA-001: Navegación desde el Hub a Modelos
Given: El usuario está en `http://localhost:3000/web3d` (Hub).
When: El usuario hace clic en una tarjeta de modelo.
Then: El navegador carga `/web3d/model-XX/index.html` sin duplicar el prefijo `web3d/`.

### CA-002: Retorno al Hub desde Modelos
Given: El usuario está en cualquier página de un modelo (ej. `page-02.html`).
When: El usuario hace clic en "← HUB".
Then: El navegador carga `/web3d.html` con status 200.

## Contracts
N/A

## Edge Cases
Ninguno.

## Restrictions
Mantener rutas absolutas desde el root `/`.
