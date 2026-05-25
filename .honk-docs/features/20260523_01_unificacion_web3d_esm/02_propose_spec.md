# Propose & Spec: Unificación Total Web3D ESM (r160)

## PROPOSE

Se propone una migración sistemática de los sectores 02 al 10 de Three.js r128 (Legacy) a r160 (ESM). La estrategia se centra en la estandarización del entorno de ejecución mediante un Import Map global y la activación del `VisualUpgrader` de HonkFlow para elevar la calidad visual.

### Estrategia de Implementación
1.  **Estandarización de Dependencias**: Sustituir la carga de Three.js vía CDN clásica por un `importmap` que apunte a r160 ESM.
2.  **Puente de Compatibilidad**: Implementar un bloque de script tipo módulo que asigne `THREE` al objeto `window`. Esto permite que los scripts de modelos existentes (que dependen de la global `THREE`) sigan funcionando sin refactorización masiva de su lógica interna.
3.  **Upgrade Visual**: Integrar `VisualUpgrader` en cada loop de animación, delegando el renderizado final al `EffectComposer` del upgrader para aplicar Bloom y gestión de color SRGB.
4.  **Preservación de Shaders**: Los Shaders detectados son de baja complejidad; se mantendrán compatibles asegurando que los uniformes y atributos estándar de Three.js sigan mapeados correctamente.

---

## SPEC

### 1. Inyección de Import Map
Todos los archivos HTML deben incluir el siguiente bloque en el `<head>`:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
```

### 2. Puente de Compatibilidad
Sustituir:
`<script src="...r128/three.min.js"></script>`

Por:
```html
<script type="module">
  import * as THREE from 'three';
  window.THREE = THREE;
</script>
```

### 3. Integración de VisualUpgrader
En el script principal de cada página:
- Cambiar la etiqueta `<script>` a `<script type="module">`.
- Importar `VisualUpgrader`: `import { VisualUpgrader } from '../visual-upgrader.js';` (ajustar ruta según profundidad).
- Instanciar después de crear `renderer`, `scene` y `camera`:
  `const vu = new VisualUpgrader(r, s, c);`
- En la función `anim()` o loop:
  Sustituir `r.render(s, c);` por `vu.render(t);` (donde `t` es el tiempo transcurrido).

### 4. Mitigación de Riesgos (Shaders & Color)
- **Color Management**: Three.js r160 utiliza `SRGBColorSpace` por defecto. `VisualUpgrader` ya configura el renderer correctamente.
- **ShaderMaterial**: Se valida que los shaders actuales no utilizan sintaxis obsoleta de r128 que rompa en r160. Se mantendrá el uso de `gl_FragColor` por compatibilidad WebGL 1/2 automática.
