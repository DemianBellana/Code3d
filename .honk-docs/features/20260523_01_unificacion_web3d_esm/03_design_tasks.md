# Design & Tasks: Unificación Total Web3D ESM (r160)

## DESIGN

### 1. Flujo de Carga de Módulos
Para garantizar que `window.THREE` esté disponible antes de que los scripts de los modelos intenten acceder a él, se utilizará el siguiente orden de ejecución:
1.  **Import Map**: Define las rutas de los módulos.
2.  **Bridge Module**: Un script `type="module"` que importa `three` y lo exporta a la global `window`.
3.  **Main Application Module**: El script que contiene la lógica de la escena, marcado también como `type="module"`. Al ser módulos, se garantiza que se ejecuten en orden y que puedan importar `VisualUpgrader.js`.

### 2. Patrón de Integración VisualUpgrader
En cada archivo se aplicará el siguiente patrón de refactorización:

```javascript
// ANTES
const r = new THREE.WebGLRenderer({...});
// ...
function anim() {
  requestAnimationFrame(anim);
  r.render(s, c);
}
anim();

// DESPUÉS (en <script type="module">)
import { VisualUpgrader } from './visual-upgrader.js'; // o ../
const r = new THREE.WebGLRenderer({...});
const vu = new VisualUpgrader(r, s, c);
// ...
function anim(time) {
  requestAnimationFrame(anim);
  const t = time * 0.001; // Ajuste si se usa el parámetro de rAF o clock
  vu.render(t);
}
anim(0);
```

### 3. Gestión de Rutas Relativas
- Archivos en `web3d/*.html`: Importan `./visual-upgrader.js`.
- Archivos en `web3d/model-XX/*.html`: Importan `../visual-upgrader.js`.

---

## TASKS

### Sector 02: Corporate Quantum Empire
- [x] Task 02.0: Migrar `web3d/model-02.html`.
- [x] Task 02.1: Migrar `web3d/model-02/index.html`.
- [x] Task 02.2: Migrar `web3d/model-02/page-02.html`.
- [x] Task 02.3: Migrar `web3d/model-02/page-03.html`.
- [x] Task 02.4: Migrar `web3d/model-02/page-04.html`.

### Sector 03: Cosmic Intelligence
- [x] Task 03.0: Migrar `web3d/model-03.html`.
- [x] Task 03.1: Migrar `web3d/model-03/index.html`.
- [x] Task 03.2: Migrar `web3d/model-03/page-02.html`.
- [x] Task 03.3: Migrar `web3d/model-03/page-03.html`.
- [x] Task 03.4: Migrar `web3d/model-03/page-04.html`.

### Sector 04: Neural AI / Omega.04
- [x] Task 04.0: Migrar `web3d/model-04.html`.
- [x] Task 04.1: Migrar `web3d/model-04/index.html`.
- [x] Task 04.2: Migrar `web3d/model-04/page-02.html`.
- [x] Task 04.3: Migrar `web3d/model-04/page-03.html`.
- [x] Task 04.4: Migrar `web3d/model-04/page-04.html`.

### Sectores 05 al 10: Bloque Final
- [x] Task 05: Migrar `web3d/model-05.html` y su directorio `model-05/`.
- [x] Task 06: Migrar `web3d/model-06.html` y su directorio `model-06/`.
- [x] Task 07: Migrar `web3d/model-07.html` y su directorio `model-07/`.
- [x] Task 08: Migrar `web3d/model-08.html` y su directorio `model-08/`.
- [x] Task 09: Migrar `web3d/model-09.html` y su directorio `model-09/`.
- [x] Task 10: Migrar `web3d/model-10.html` y su directorio `model-10/`.

### Optimización Hub y Sector 01 (Honk-Fast-Plan)
- [x] Task 11: Implementar Bridge Module en `web3d.html` y optimizar Scissor Test.
- [x] Task 12: Refactorizar Sector 01 a estructura `model-01/index.html` y actualizar vínculos.
- [x] Task 13: Eliminar archivos legacy y HUDs de desarrollo.
