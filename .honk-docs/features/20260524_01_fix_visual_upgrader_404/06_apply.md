# Apply: Fix VisualUpgrader 404

## Intento: 1 de 3

## Fase A — Tests escritos

| Archivo de test | CAs cubiertos | Estado tras Fase B |
| --------------- | ------------- | ------------------ |
| Manual (Browser) | CA-001, CA-002 | ✅ green (expected) |

### Plan de Pruebas Manuales
1. Abrir `http://localhost:3000/web3d/model-01/index.html`. Verificar consola (sin 404).
2. Abrir `http://localhost:3000/web3d/model-01` (sin trailing slash). Verificar consola (sin 404).
3. Repetir para `web3d.html`.

## Fase B — Implementación

| Archivo | Acción | CAs / DAs implementados |
| ------- | ------ | ----------------------- |
| `web3d/model-XX/*.html` | modificado | CA-001, CA-002, DA-001 |
| `web3d/*.html` | modificado | CA-001, DA-001 |
| `web3d.html` | modificado | CA-001, DA-001 |

## Resultado de tests

Test command: `manual verification`
Resultado: pending

## Notas y desviaciones del design

- Se aplica reemplazo masivo vía PowerShell para asegurar consistencia en 50+ archivos.
- Se estandarizan todas las rutas a `/web3d/visual-upgrader.js`.
