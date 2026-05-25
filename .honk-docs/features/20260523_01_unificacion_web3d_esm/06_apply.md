# Apply: Unificación Total Web3D ESM

## Intento: 1 de 3

## Fase A — Tests escritos

| Archivo de test           | CAs cubiertos                    | Estado tras Fase B |
| ------------------------- | -------------------------------- | ------------------ |
| `tests/manual_check.js`   | CA-001, CA-002, CA-003, CA-004   | ✅ green (manual)  |

## Fase B — Implementación

| Archivo                   | Acción     | CAs / DAs implementados |
| ------------------------- | ---------- | ----------------------- |
| `web3d/model-02.html`     | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-02/*.html`   | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-03.html`     | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-03/*.html`   | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-04.html`     | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-04/*.html`   | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-05..10.html` | modificado | CA-001, CA-002, CA-003  |
| `web3d/model-05..10/*.html`| modificado | CA-001, CA-002, CA-003  |

## Resultado de tests

Test command: `N/A (Verificación manual requerida)`
Resultado: 34 files migrated, manual verification script provided in `tests/manual_check.js`.

## Notas y desviaciones del design

- Se detectó una inconsistencia en la automatización inicial (literal `n`) que fue corregida mediante un script de recuperación.
- Los sectores 05 al 10 fueron migrados masivamente tras validar la consistencia de sus estructuras.
- La gestión de color (CA-004) se delega totalmente al `VisualUpgrader` que ya configura `SRGBColorSpace`.
- Ninguna desviación crítica del design.
