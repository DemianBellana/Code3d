# Tasks: Fix Model Navigation 404

## Fase 1: Fundación

- [x] 1.1 [S] Identificar todos los puntos de navegación interna en modelos 01-10 — refs CA-001

## Fase 2: Core

- [x] 2.1 [M] Actualizar `index.html` de cada modelo con path absoluto a `page-02.html` — impl DA-001 — refs CA-001
- [x] 2.2 [M] Actualizar `page-02.html` de cada modelo con path absoluto a `page-03.html` — impl DA-001 — refs CA-002
- [x] 2.3 [M] Actualizar `page-03.html` de cada modelo con path absoluto a `page-04.html` — impl DA-001 — refs CA-002

## Fase 3: Validación

- [x] 3.1 [S] Verificar flujo completo en Modelo 01 (index -> p2 -> p3 -> p4) — cubre CA-001, CA-002
- [x] 3.2 [S] Verificar flujo en Modelo 10 — cubre CA-001

## Notas de implementación

- Usar script Python para automatizar el reemplazo basado en el nombre de la carpeta contenedora.

## Riesgos identificados en planificación

- Errores de tipografía en las rutas absolutas (mitigado por script automático).
