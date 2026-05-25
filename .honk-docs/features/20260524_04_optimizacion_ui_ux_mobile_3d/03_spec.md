# Spec: Optimizacion UI/UX y Mobile 3D

## Delta
| Type | Path | Description |
| :--- | :--- | :--- |
| ADDED | `web3d/3d-style.css` | Unificación de temas glass, tipografías y HUD para modelos 3D. |
| MODIFIED | `web3d.html` | Implementación de soporte táctil (swipe) y ajuste responsivo de portal-views. |
| MODIFIED | `web3d/model-*.html` (02,03,05,07-10) | Migración a CSS externo, layouts diferenciados y cámara dinámica. |

## CAs
### CA-001: Navegación Táctil en Hub
Given: Usuario accede a `web3d.html` desde dispositivo móvil.
When: Usuario realiza swipe horizontal sobre el slider de modelos.
Then: El slider transiciona al modelo siguiente/anterior y actualiza el HUD inferior (SECTOR_ACTIVE).

### CA-002: Ajuste Responsivo 3D (Mobile Fix)
Given: Usuario abre cualquier modelo optimizado (02, 03, 05, 07-10).
When: El aspect ratio del viewport es menor a 1.0 (Mobile Portrait).
Then: La cámara se aleja dinámicamente (`camera.position.z` aumenta) garantizando que el objeto 3D principal sea visible íntegramente sin recortes laterales.

### CA-003: Diferenciación de Layouts (No Clones)
Given: Usuario navega entre modelos optimizados.
When: Las páginas cargan.
Then: Se observan estructuras de HUD distintas (ej. 02 Sidebar vs 03 Center) cumpliendo con los estilos Stripe/Vercel/Apple respectivamente.

### CA-004: Fallback de Estilos
Given: Error en carga de `3d-style.css`.
When: La página de un modelo se renderiza.
Then: El sistema mantiene la visibilidad del botón "RETURN TO HUB" y la escena 3D operativa.

### CA-005: Limpieza de Código (Frontend Quality)
Given: Código fuente de modelos optimizados.
When: Se realiza auditoría de estilos.
Then: Cero bloques `<style>` internos para layout/HUD; el 100% de la estética core reside en `3d-style.css`.

## Contracts
| Name | Method | Input | Output Success | Output Error |
| :--- | :--- | :--- | :--- | :--- |
| `Slider-Touch` | Touch Events | `touchstart`, `touchend` | `updateSlider()` | `console.warn` |
| `Responsive-Cam` | Resize Event | `innerWidth`, `innerHeight` | `camera.position.z` ajustado | N/A |

## Edge Cases
| Edge | Covered by CA |
| :--- | :--- |
| Cambio de orientación rápido (Portrait <-> Landscape) | CA-002 |
| Swipe rápido en Hub | CA-001 |

## Restrictions
- Retrocompatibilidad: No romper el sistema ESM r160 ni el flujo de `VisualUpgrader`.
- Performance: FPS estables en mobile (reducir post-processing si es necesario).

## Open Questions
Ninguna.
