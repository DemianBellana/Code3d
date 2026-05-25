---
concepts: [path-resolution, esm-imports, web3d, 404-error]
type: bugfix
---

## [explore] 20260524

### Observación

- Imports en `web3d/model-XX/*.html` usan `../visual-upgrader.js`.
- Fallo 404 → browser busca en `/visual-upgrader.js` (root) si URL no tiene trailing slash.
- `web3d/model-XX.html` (legacy?) usa `./visual-upgrader.js` → OK.
- Unificación previa movió archivos a directorios pero mantuvo imports relativos que dependen de trailing slash.

### Decisiones registradas

- ninguna (explore = solo lectura)

### Patrones descartados

- ninguno

### Alertas para features similares

- RIESGO: Cambios en estructura directorios → romper imports ESM.
- DEUDA: Duplicidad `model-XX.html` vs `model-XX/index.html`.

## [archive] 20260524

### Observación

- Feature `fix-visual-upgrader-404` completado. Tipo: bugfix. CAs: 2. DAs: 1. ADRs elevados: 1 (ADR-003).
- Implementación masiva en 50+ archivos mediante script de automatización.
- Verificación manual confirma resolución de 404 en navegación profunda y sin trailing slash.

### Decisiones registradas

- DA-001 elevado a ADR-003: Estandarización de rutas absolutas para módulos core.

### Patrones descartados

- ninguno

### Alertas para features similares

- Mantener consistencia en el uso de `/web3d/` como prefijo para recursos compartidos en ESM.

## [archive] 20260524-02

### Observación

- Feature `fix-model-nav-404` completado. Tipo: bugfix. CAs: 2. DAs: 1.
- Corregida la navegación interna (DEEPER) que fallaba sin trailing slash en la URL del directorio.
- Se aplicó la misma estrategia de rutas absolutas que en el fix de VisualUpgrader.

### Decisiones registradas

- DA-001: Extensión de la estrategia de rutas absolutas a la navegación interna de modelos.

### Patrones descartados

- ninguno

### Alertas para features similares

- Toda navegación interna entre niveles de profundidad variable debería usar rutas raíz-relativas para evitar problemas de resolución del browser.

## [archive] 20260524-03

### Observación

- Feature `fix-global-nav-paths` completado. Tipo: bugfix. CAs: 2. DAs: 1.
- Corregida la navegación desde el Hub (doble prefijo web3d/) y el retorno al HUB desde los modelos.
- Estandarización total a rutas raíz-relativas en toda la experiencia Web3D.

### Decisiones registradas

- DA-001: Consolidación de rutas raíz-relativas para navegación inter-módulo.

### Patrones descartados

- ninguno

### Alertas para features similares

- Revisar siempre el array `models` en `web3d.html` al agregar nuevos sectores para asegurar que sigan el patrón `/web3d/model-XX/...`.
