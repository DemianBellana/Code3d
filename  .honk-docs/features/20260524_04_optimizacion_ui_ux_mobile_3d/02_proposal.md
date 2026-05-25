# Proposal: Optimizacion UI/UX y Mobile 3D

## Problem
Síntoma: UI redundante, 3D roto en mobile (recortes, sin touch), código duplicado.
Causa: Diseño desktop-first, valores hardcoded en cámara 3D, boilerplate CSS/JS repetido en modelos.

## Alternatives
| Alt | Pros | Contras | Why |
| :--- | :--- | :--- | :--- |
| Centralización y Responsividad Dinámica | Consistencia global, fácil mantenimiento, fix mobile unificado. | Refactor inicial requiere tocar múltiples archivos. | Seleccionado: cumple con calidad frontend y estabilidad mobile. |
| Parcheo Individual | Bajo riesgo de rotura global inmediata. | Mantenimiento alto, inconsistencia visual, deuda técnica acumulada. | Descartado: no escala y mantiene código duplicado. |

## Selected
Centralización + Layouts Distintivos: Unificar lógica de cámara responsiva y estilos core, pero divergir en layouts visuales (estilo Stripe/Vercel/Apple) para evitar clones.

## Scope
**IN:**
- `web3d.html` → Swipe support (touch) para slider hangar. Ajuste dinámico de portal-views.
- `web3d/3d-style.css` (NUEVO) → Centralizar temas glass, tipografías y HUD core.
- `web3d/model-*.html` (02,03,05,07-10) →
    - Migrar inline styles a `3d-style.css`.
    - Diferenciar layouts (02/05 Sidebar, 03/07 Central HUD, 08/09 Apple Minimal, 10 Abstract).
    - Fix Mobile: Cámara dinámica `camera.position.z = Math.max(20, 20 / (innerWidth/innerHeight))`.
- `VisualUpgrader` → Ajuste de pixelRatio y performance en mobile.

**OUT:**
- Páginas 01, 04, 06 (Lógica/Escena 3D) → Se mantienen intactas según req.
- Backend PHP.

## Rollback
Git revert: Revertir cambios en archivos modificados y borrar `3d-style.css`.

## Impact
mod: 8 new: 1 tests: 0
