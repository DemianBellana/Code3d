# 06 — Infra

Documentación de infraestructura, entornos y despliegue de CodeNoFrontier.

## Entornos

| Entorno | URL / Host | Propósito |
| :--- | :--- | :--- |
| **Local** | `localhost` | Desarrollo de nuevas features y ajustes visuales. |
| **Producción** | `codenofrontier.com` | Sitio público de la agencia. |

## Plataforma de Hosting
- Servidor web compatible con PHP y archivos estáticos.
- Certificado SSL activo para navegación segura (HTTPS).

## Requisitos de Servidor
- **Runtime:** PHP 8.x o superior.
- **Módulos:** cURL, OpenSSL (para SMTP).
- **Conectividad:** Acceso de salida al puerto 587 (SMTP TLS) para envío de correos.

## Configuración Sensible
Las credenciales SMTP están actualmente "hardcoded" en `send-mail.php`. Se recomienda migrar a variables de entorno o un archivo `.env` si se escala el sistema.

- **SMTP Host:** `smtp.gmail.com`
- **Puerto:** `587` (STARTTLS)
- **User:** `codenofrontier@gmail.com`

---
*Ultima actualización: 20260523*
