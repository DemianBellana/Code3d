# Design: Optimizacion UI/UX y Mobile 3D | scope:moderate | BCs:1

## Complexity
scope:moderate | BCs:1 | decomposition:no

## Components
| C | Action | Justification |
| :--- | :--- | :--- |
| `3d-style.css` | NEW | Centralizar tema glass, tipografía y HUD core para eliminar redundancia. |
| `web3d.html` | MOD | Implementar swipe support para slider. Resolver inaccesibilidad en mobile. |
| `model-*.html` | MOD | (02,03,05,07-10) Refactor a CSS externo, layouts diferenciados y cámara responsiva. |
| `VisualUpgrader` | MOD | Optimizar renderizado en viewports pequeños (mobile performance). |

## Structure
- `web3d/3d-style.css`: Reglas compartidas para HUD, botones y efectos glass.
- `web3d.html`: Lógica de slider GSAP + Touch events.
- `web3d/model-XX.html`: Implementación de layouts específicos (Stripe/Vercel/Apple).

## DAs
### DA-001: Tema CSS Centralizado
**Decision:** Migrar estilos de HUD y UI de los HTML a un archivo `3d-style.css` único.
**Rationale:** Reducir duplicación en 7 archivos. Permitir actualizaciones de marca (colores, bordes) en un solo punto.
**Discarded:** Inline styles → Imposible de escalar y mantener coherencia visual.
**Consequences:** +Mantenibilidad, +Coherencia / -Requiere importación en cada HTML.

### DA-002: Posicionamiento de Cámara Dinámico
**Decision:** Ajustar `camera.position.z` en el evento `resize` usando el ratio de pantalla.
**Rationale:** Los objetos 3D se cortan en pantallas estrechas (mobile portrait).
**Discarded:** Media Queries CSS → No afectan el campo de visión (FOV) o posición de Three.js de forma nativa.
**Consequences:** +Visibilidad total en mobile / -Overhead mínimo en resize.

### DA-003: Soporte Táctil (Swipe) Nativo en Hub
**Decision:** Implementar listeners `touchstart`/`touchend` en `web3d.html` para disparar `updateSlider()`.
**Rationale:** El evento `wheel` actual es inútil en dispositivos móviles.
**Discarded:** Librería externa (Swiper.js) → Mantener filosofía Vanilla y evitar peso extra.
**Consequences:** +Usabilidad mobile / +Lógica manual de gestos.

## Contracts
- `{IF-001}`: `TouchHandler` → `SliderEngine` | in: `touchDeltaX` | out: `targetIndex` | err: N/A
- `{IF-002}`: `ResizeHandler` → `ThreeCamera` | in: `aspectRatio` | out: `camera.z` | err: N/A

## Mapping
| CA-ID | Components | DA |
| :--- | :--- | :--- |
| CA-001 | `web3d.html` | DA-003 |
| CA-002 | `model-*.html` | DA-002 |
| CA-003 | `3d-style.css`, `model-*.html` | DA-001 |
| CA-004 | `model-*.html` | N/A |
| CA-005 | `model-*.html` | DA-001 |

## Performance
- Reducción de `pixelRatio` en mobile extremo.
- `VisualUpgrader` renderiza a menor resolución si `width < 500px`.

## Security
N/A

## Deps
- Three.js r160
- GSAP 3.x
