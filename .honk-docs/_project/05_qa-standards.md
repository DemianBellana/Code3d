# 05 — QA Standards

Estándares de calidad y estrategia de pruebas para CodeNoFrontier.

## Estrategia de Calidad
Dado que es un proyecto altamente visual y experiencial, el QA se centra en la **fidelidad visual** y la **disponibilidad funcional**.

## Tipos de Pruebas

| Tipo | Alcance |
| :--- | :--- |
| **Visual QA** | Verificación de efectos de post-procesado, cursor y renderizado de modelos en diferentes resoluciones. |
| **Form Testing** | Validación de envío de correos, manejo de estados de éxito/error y limpieza de inputs. |
| **Performance Check** | Monitorización de FPS en el Hub 3D para asegurar fluidez (objetivo: 60 FPS). |
| **Cross-browser** | Verificación en Chrome, Firefox, Safari y Edge (foco en soporte WebGL). |

## Cobertura Crítica
1. Flujo completo de envío de contacto.
2. Carga correcta de todos los modelos 3D en el Hangar Slider.
3. Responsividad de la UI en dispositivos móviles (ajuste de cámaras Three.js).

## Herramientas de QA
- **Browser DevTools:** Inspección de red, performance y consola.
- **Three.js Inspector:** Depuración de la escena WebGL.
- **Manual Verification:** Testing exploratorio.

---
*Ultima actualización: 20260523*
