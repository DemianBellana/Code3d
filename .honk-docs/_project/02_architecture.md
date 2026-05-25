# 02 — Architecture

Este documento describe la estructura técnica y decisiones arquitectónicas de CodeNoFrontier.

## Estilo Arquitectónico
El proyecto sigue una arquitectura de **Monolito Frontend con Micro-servicios de Utilidad (Backend Stateless)**. La mayor parte de la lógica reside en el cliente para garantizar una experiencia 3D fluida.

## Módulos Principales

| Módulo | Responsabilidad |
| :--- | :--- |
| **Core Landing** | Gestión del DOM principal, navegación entre páginas estáticas y coordinación de la UI general. |
| **Web3D Engine** | Implementación de Three.js. Gestión de escenas, luces, cámaras y carga de archivos GLTF/OBJ. |
| **Post-Processing Layer** | Aplicación de efectos visuales (Noise, Scanlines, Vignette) mediante CSS y Shaders básicos. |
| **Mail Backend** | Script PHP que actúa como puente SMTP para el envío de formularios de contacto. |

## Restricciones Arquitectónicas
1. **Client-Side Heavy:** La renderización 3D depende totalmente de la capacidad de procesamiento del dispositivo del usuario (GPU).
2. **Stateless Backend:** No existe una base de datos centralizada. La persistencia de leads se delega al sistema de correo electrónico del administrador.
3. **Vanilla Strategy:** Minimización de dependencias externas para maximizar el control sobre el rendimiento y la estética cinemática.

## Flujo de Datos
- El usuario interactúa con la UI (HTML/JS).
- Las acciones 3D son procesadas por el motor WebGL.
- Las solicitudes de contacto se envían vía `fetch` (JSON) al endpoint PHP, que procesa y responde con el estado del envío.

## ADR-001: Flujo de Carga de Módulos Web3D ESM (r160)

**Fecha:** 20260524
**Feature de origen:** 20260523_01_unificacion_web3d_esm
**DA de origen:** DA-001

**Contexto:** La migración de Three.js r128 (Global) a r160 (ESM) requiere que las dependencias estén disponibles para scripts heredados que aún esperan `window.THREE`.
**Decisión:** Implementar un flujo de carga en 3 pasos: 1. Import Map (configuración), 2. Bridge Module (exporta THREE a window), 3. Application Module (lógica).
**Consecuencias:** Garantiza orden de ejecución síncrono en un entorno de módulos asíncronos por defecto. Permite retrocompatibilidad con scripts que no pueden ser refactorizados a ESM puro inmediatamente.
**Alternativas descartadas:** Uso de Bundlers (Vite/Webpack) para mantener la simplicidad "Vanilla" del proyecto.

## ADR-002: Patrón de Integración VisualUpgrader

**Fecha:** 20260524
**Feature de origen:** 20260523_01_unificacion_web3d_esm
**DA de origen:** DA-002

**Contexto:** Se requiere una forma estandarizada de inyectar post-procesamiento (Bloom, ToneMapping) en múltiples escenas Web3D independientes.
**Decisión:** Delegar el bucle de renderizado a una clase `VisualUpgrader`. El loop `requestAnimationFrame` debe llamar a `vu.render(t)` en lugar de `renderer.render(s, c)`.
**Consecuencias:** Desacopla la lógica de post-procesamiento de la lógica de la escena. Facilita actualizaciones visuales globales modificando un solo archivo.
**Alternativas descartadas:** Implementación manual de EffectComposer en cada archivo (alta redundancia y difícil mantenimiento).

## ADR-003: Estrategia de Rutas Absolutas para Módulos ESM

**Fecha:** 20260524
**Feature de origen:** 20260524_01_fix_visual_upgrader_404
**DA de origen:** DA-001

**Contexto:** Las importaciones relativas (`../`) en estructuras de directorios profundas fallan si el servidor sirve el directorio sin barra final (trailing slash), ya que el navegador resuelve la ruta base de forma inconsistente.
**Decisión:** Utilizar rutas absolutas relativas a la raíz del dominio (`/web3d/...`) para la importación de módulos core compartidos como `VisualUpgrader`.
**Consecuencias:** +Elimina ambigüedad en la resolución de rutas / -Requiere que el proyecto se sirva desde la raíz del dominio (o ajustar base path).
**Alternativas descartadas:** Forzar redirecciones de trailing slash en el servidor (menos portable).

## ADR-004: Centralización de UI y HUD Web3D

**Fecha:** 20260524
**Feature de origen:** 20260524_04_optimizacion_ui_ux_mobile_3d
**DA de origen:** DA-001

**Contexto:** La duplicación de estilos UI en cada modelo 3D causaba inconsistencias y alta deuda técnica.
**Decisión:** Crear `web3d/3d-style.css` como módulo único de estilos para HUD, tipografía y efectos glass.
**Consecuencias:** +Unificación estética inmediata, +Facilidad de mantenimiento / -Dependencia de un recurso externo adicional por página.
**Alternativas descartadas:** Inline styles o BEM puro por página.

## ADR-005: Cámara Responsiva Dinámica para Web3D

**Fecha:** 20260524
**Feature de origen:** 20260524_04_optimizacion_ui_ux_mobile_3d
**DA de origen:** DA-002

**Contexto:** Objetos 3D se recortan en dispositivos móviles portrait debido a FOV fijo.
**Decisión:** Implementar ajuste dinámico de `camera.position.z` basado en el aspect ratio del viewport (`c.aspect < 1`).
**Consecuencias:** +Visibilidad garantizada en mobile / -Overhead mínimo de cálculo en resize.
**Alternativas descartadas:** Media queries CSS (no afectan cámara 3D).

## ADR-006: Soporte Táctil Nativo para Hangar Slider

**Fecha:** 20260524
**Feature de origen:** 20260524_04_optimizacion_ui_ux_mobile_3d
**DA de origen:** DA-003

**Contexto:** El Hub Web3D era inaccesible en móviles por falta de soporte para gestos.
**Decisión:** Implementar listeners `touchstart`/`touchend` nativos vinculados al motor de slider GSAP.
**Consecuencias:** +Usabilidad mobile 100% / +Mantenimiento de lógica manual de gestos.
**Alternativas descartadas:** Librerías de slider pesadas (Swiper.js).

---
*Ultima actualización: 20260524*
