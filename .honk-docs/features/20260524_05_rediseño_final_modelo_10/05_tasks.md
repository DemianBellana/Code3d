# Tasks: Rediseño Final Modelo 10

## Fase 1: Fundación
- [ ] 1.1 [S] Limpiar `model-10/index.html` de lógica redundante — refs CA-001, CA-002

## Fase 2: Core
- [ ] 2.1 [M] Implementar Layout HUD Asimétrico (Stripe/Apple style) — impl DA-001 — refs CA-002
- [ ] 2.2 [M] Actualizar Material a "Void Crystal" e Iluminación de 3 puntos — impl DA-002, DA-003 — refs CA-003
- [ ] 2.3 [M] Implementar lógica de Cámara Responsiva (Lateral en Desktop, Central en Mobile) — impl DA-001 — refs CA-001, CA-004
- [ ] 2.4 [S] Optimizar sistema de partículas y pixelRatio — refs CA-005

## Fase 3: Validación
- [ ] 3.1 [S] Verificar jerarquía visual y legibilidad HUD — cubre CA-002
- [ ] 3.2 [S] Verificar responsividad y composición en mobile portrait — cubre CA-001, CA-004
- [ ] 3.3 [S] Auditar performance en emulación mobile — cubre CA-005

## Notas de implementación
- HUD debe usar `mix-blend-mode: normal` con gradientes de fondo para máxima claridad.
- El TorusKnot debe desplazarse a la derecha (`centralObj.position.x = 8`) en viewports anchos.

## Riesgos identificados en planificación
- El desplazamiento lateral puede ocultar el objeto en pantallas muy estrechas si no se compensa.
