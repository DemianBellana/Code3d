# 04 — Code Standards

Estándares de codificación y convenciones de desarrollo para CodeNoFrontier.

## Naming Conventions
- **Archivos:** `kebab-case.html`, `kebab-case.css`, `kebab-case.js`.
- **Variables/Funciones JS:** `camelCase`.
- **Clases CSS:** Mezcla de estilos funcionales y BEM simplificado.
- **Modelos 3D:** Carpetas numeradas `model-XX`.

## Estructura de Proyecto
```text
/
├── .honk-docs/         # Documentación del sistema
├── phpmailer/          # Librería PHPMailer
├── web3d/              # Recursos y visores 3D
│   ├── model-XX/       # Assets específicos por modelo
│   └── *.html          # Páginas de visualización
├── *.html              # Páginas principales del sitio
└── send-mail.php       # Backend de contacto
```

## Estilo de Desarrollo
1. **Performance First:** Minimizar el uso de librerías pesadas que no aporten valor directo a la experiencia 3D.
2. **Modularidad CSS:** Uso de variables CSS (`:root`) para mantener la consistencia del tema (colores accent, bg, etc.).
3. **Separación de Responsabilidades:** HTML para estructura, CSS para estética cinemática, JS para interacción y 3D.

## Manejo de Errores
- Errores de red/servidor en el formulario deben mostrarse al usuario de forma amigable.
- Fallos en la carga de modelos 3D deben ser registrados en consola y mostrar un fallback visual si es posible.

---
*Ultima actualización: 20260523*
