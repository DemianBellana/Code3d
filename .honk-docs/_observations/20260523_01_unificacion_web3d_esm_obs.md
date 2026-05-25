---
feature: unificacion-web3d-esm
type: infra
concepts: [Three.js, ESM, Import Map, VisualUpgrader, ADR]
---

## [archive] 20260524

### Observación

Feature Unificación Total Web3D ESM completado. Tipo: infra. CAs: 4. DAs: 3. ADRs elevados: 2 (ADR-001, ADR-002).
Tests manuales definidos en `tests/manual_check.js`. Archivos migrados: 34.

### Decisiones registradas

- DA-001 y DA-002 elevados a ADR: Establecen el estándar de carga de módulos y el patrón de renderizado para todo el proyecto CodeNoFrontier.

### Patrones descartados

- Uso de Bundlers externos (Vite/Webpack) para mantener estrategia Vanilla.

### Alertas para features similares

- La migración del Sector 01 (Landing) está pendiente y debe seguir los mismos ADRs establecidos aquí.
- Los scripts de automatización (PowerShell) requieren cuidado con caracteres de escape al manejar bloques grandes de código HTML.
