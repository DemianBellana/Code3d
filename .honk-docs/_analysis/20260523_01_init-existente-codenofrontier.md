# Init: CodeNoFrontier

**Escenario:** EXISTENTE
**Fecha:** 20260523
**Estado:** APROBADO — _project/ generado el 20260523

---

## Resumen del proyecto

CodeNoFrontier es un sitio web profesional de una agencia de desarrollo de software que se especializa en soluciones "sin límites", incluyendo Landing Pages, E-commerce, IA y Aplicaciones Móviles. El proyecto destaca por su fuerte componente visual y experiencial, utilizando tecnologías Web3D para mostrar modelos interactivos.

El sistema funciona como un portfolio y centro de contacto, con una interfaz cinemática que incluye efectos de post-procesado (ruido, viñeta, scanlines) y un cursor personalizado para mejorar la inmersión del usuario.

---

## Lo que irá en cada doc de \_project/

### 01 — Glosario de dominio

| Término    | Definición   |
| ---------- | ------------ |
| CodeNoFrontier | Nombre de la marca/agencia, evocando software sin fronteras técnicas. |
| Web3D Hub | Sección central del sitio que permite explorar diferentes modelos 3D y servicios. |
| Hangar Slider | Interfaz de navegación en 3D para seleccionar entre los diferentes modelos o servicios. |
| Model Viewer | Vista individual donde se carga un modelo 3D específico para su visualización. |

### 02 — Arquitectura

**Estilo arquitectónico:** Monolito estático con backend funcional para servicios específicos (Mail).

**Módulos principales:**
| Módulo | Responsabilidad |
|---|---|
| Landing Principal | Presentación de la marca, servicios y navegación general. |
| Web3D Engine | Gestión de la escena Three.js, carga de modelos y efectos visuales. |
| Contact System | Manejo de formularios y envío de correos vía SMTP con PHPMailer. |
| Model Gallery | Organización y visualización de recursos 3D individuales. |

**Restricciones arquitectónicas:**

- Ejecución en cliente (Client-side heavy) para la parte 3D.
- Stateless: No hay base de datos persistente; la información fluye hacia el correo del administrador.

**Patrones en uso:**
- Singleton para el motor WebGL (implícito en el manejo del canvas único).
- Event-driven para interacciones UI y transiciones de modelos.

### 03 — Tech Profile

- Lenguaje: HTML5, CSS3, JavaScript (Vanilla ES6+), PHP 8.x
- Framework: Three.js (3D), Vanilla JS (Frontend)
- Base de datos: Ninguna
- Runtime: Navegador Web (Frontend), Servidor con soporte PHP (Backend)
- Test command: `[pendiente — no detectado]`
- Build command: `[pendiente — no detectado]`
- Lint command: `[pendiente — no detectado]`

### 04 — Code Standards

- Naming: Kebab-case para archivos, camelCase para variables JS, BEM-ish para clases CSS.
- Estructura de carpetas: Organización por funcionalidad (`web3d/` para 3D, `phpmailer/` para librerías).
- Reglas de error handling: Try/catch en el envío de correos; logs de consola para errores WebGL.
- Documentación inline: Comentarios de sección en HTML/CSS/JS.

### 05 — QA Standards

- Estrategia de testing: Testing manual de compatibilidad de navegadores y visualización 3D.
- Cobertura mínima: 100% de rutas críticas (Landing -> 3D Hub -> Contacto).
- Test framework: Ninguno
- Qué NO se testea: Unit tests de lógica de shaders o geometrías complejas (QA visual).

### 06 — Infra

- Entornos: Producción (hosteado en codenofrontier.com).
- Cloud/plataforma: Servidor web con soporte PHP y SMTP.
- CI/CD: [pendiente — no detectado]
- Variables de entorno requeridas: Credenciales SMTP (configuradas directamente en `send-mail.php`).

### 07 — Conventions

- Git branching: [pendiente — no detectado]
- Commit format: [pendiente — no detectado]
- PR process: [pendiente — no detectado]
- Otros: Uso de Google Fonts para tipografía corporativa (Bebas Neue, Outfit, DM Mono).

---

## Secciones con información pendiente

- Comandos de Build/Test/Lint: No se detectó un pipeline de automatización (npm/composer).
- CI/CD y Git Conventions: El codebase no incluye workflows de GitHub o documentación de branching.

---

## Fuente de información

Inferido del codebase (HTML, CSS, JS, PHP) + Estructura de archivos detectada.
