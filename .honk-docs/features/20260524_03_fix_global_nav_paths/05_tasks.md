# Tasks: Fix Global Navigation Paths

## Fase 1: Fundación

- [x] 1.1 [S] Identificar todos los `href="../../web3d.html"` en modelos — refs CA-002

## Fase 2: Core

- [x] 2.1 [S] Actualizar `web3d.html`: `link: 'web3d/model-XX/index.html'` → `link: '/web3d/model-01/index.html'` — impl DA-001 — refs CA-001
- [x] 2.2 [M] Actualizar todos los modelos: `href="../../web3d.html"` → `href="/web3d.html"` — impl DA-001 — refs CA-002

## Fase 3: Validación

- [x] 3.1 [S] Verificar navegación Hub -> Modelo 01 -> Hub — cubre CA-001, CA-002
- [x] 3.2 [S] Verificar navegación Hub -> Modelo 10 -> Hub — cubre CA-001

## Notas de implementación

- Usar script Python para el reemplazo masivo de `../../web3d.html`.
- En `web3d.html`, el reemplazo es puntual en el array `models`.

## Riesgos identificados en planificación

None.
