# Tasks: Fix VisualUpgrader 404

## Fase 1: Fundación

- [x] 1.1 [S] Crear backup de archivos afectados — refs CA-001

## Fase 2: Core

- [x] 2.1 [M] Reemplazar `../visual-upgrader.js` por `/web3d/visual-upgrader.js` en todos los archivos `web3d/model-XX/*.html` — impl DA-001 — refs CA-001, CA-002
- [x] 2.2 [S] Reemplazar `./web3d/visual-upgrader.js` por `/web3d/visual-upgrader.js` en `web3d.html` — impl DA-001 — refs CA-001

## Fase 3: Validación

- [x] 3.1 [S] Verificar resolución de ruta en `web3d/model-01/index.html` con servidor local — cubre CA-001
- [x] 3.2 [S] Verificar acceso sin trailing slash en `web3d/model-01` — cubre CA-002
- [x] 3.3 [S] Comprobar consistencia en `web3d.html` y otros sectores (05, 10) — cubre CA-001

## Notas de implementación

- Usar `sed` o comando shell para reemplazo masivo en 50+ archivos.
- Validar que no existan otros imports de `visual-upgrader.js` con variantes (ej. sin extensión, aunque en ESM es obligatoria).

## Riesgos identificados en planificación

- Reemplazo accidental en archivos de backup o fuera de scope (mitigado por glob específico).
