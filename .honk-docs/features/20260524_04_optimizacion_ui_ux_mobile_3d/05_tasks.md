# Tasks: Optimizacion UI/UX y Mobile 3D

## Fase 1: Fundación

- [x] 1.1 [S] Crear `web3d/3d-style.css` con variables CSS, reset y estilos core (HUD, glass, buttons, typography) — impl DA-001 — refs CA-003, CA-005

## Fase 2: Core

- [x] 2.1 [M] Modificar `web3d.html`: Implementar soporte táctil swipe (touchstart/touchend) para slider — impl DA-003 — refs CA-001
- [x] 2.2 [M] Modificar `web3d/visual-upgrader.js`: Añadir limitador de resolución y pixelRatio para mobile performance — refs CA-002
- [x] 2.3 [L] Refactorizar Modelos 02, 05: Layout Sidebar (Stripe style), migrar a `3d-style.css`, eliminar inline styles — impl DA-001 — refs CA-003, CA-005
- [x] 2.4 [L] Refactorizar Modelos 03, 07: Layout Central (Vercel style), migrar a `3d-style.css`, eliminar inline styles — impl DA-001 — refs CA-003, CA-005
- [x] 2.5 [L] Refactorizar Modelos 08, 09: Layout Minimal (Apple style), migrar a `3d-style.css`, eliminar inline styles — impl DA-001 — refs CA-003, CA-005
- [x] 2.6 [M] Refactorizar Modelo 10: Layout Abstracto, migrar a `3d-style.css`, eliminar inline styles — impl DA-001 — refs CA-003, CA-005
- [x] 2.7 [M] Implementar cámara dinámica en todos los modelos (02, 03, 05, 07-10) — impl DA-002 — refs CA-002

## Fase 3: Validación

- [ ] 3.1 [S] Verificar navegación táctil en Hub (Emulación Mobile) — cubre CA-001
- [ ] 3.2 [S] Verificar responsividad de cámara en todos los modelos optimizados — cubre CA-002
- [ ] 3.3 [S] Auditar eliminación de inline styles en archivos modificados — cubre CA-005
- [ ] 3.4 [S] Test de fallback: Simular fallo de carga CSS y verificar navegación Return — cubre CA-004

## Notas de implementación

- Seguir ADR-002 para mantener integridad del render loop con `VisualUpgrader`.
- Lógica de cámara dinámica: `camera.position.z = initialZ * (innerHeight / innerWidth < 1 ? 1 : 1.5)`.
- No modificar lógica 3D ni shaders en 01, 04, 06.

## Riesgos identificados en planificación

- Refactor manual de múltiples archivos HTML puede causar inconsistencias menores.
- Soporte táctil en Hub requiere ajustes en la sensibilidad para no disparar clicks accidentales.
