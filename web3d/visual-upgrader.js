/**
 * HONKFLOW VISUAL UPGRADER
 * Stage B: ToneMapping & Ambient Lighting
 * Stage C: UnrealBloomPass & HDRI Reflections
 * Stage D: Cinematic Atmosphere & Ambient Particles
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export class VisualUpgrader {
    constructor(renderer, scene, camera, options = {}) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.options = {
            bloomStrength: 0.5,
            bloomRadius: 0.8,
            bloomThreshold: 0.85,
            exposure: 1.15,
            useBloom: options.useBloom !== undefined ? options.useBloom : true,
            hdriPath: options.hdriPath || 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr',
            useAtmosphere: true,
            useParticles: true,
            ...options
        };

        this.composer = null;
        this.particles = null;
        
        try {
            this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
            this.pmremGenerator.compileEquirectangularShader();
            this.init();
        } catch (e) {
            console.error("HonkFlow Visual Upgrader: Initialization failed. Falling back to base renderer.", e);
        }
    }

    init() {
        // Stage B: ToneMapping & Color Management
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = this.options.exposure;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Mobile Optimization (HonkFlow: CA-002)
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            this.options.useBloom = false; // Disable bloom on mobile for performance
        }

        // Ambient Lighting Refinement
        const oldAmbient = this.scene.getObjectByName('honk_ambient');
        if (oldAmbient) this.scene.remove(oldAmbient);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        ambientLight.name = 'honk_ambient';
        this.scene.add(ambientLight);

        const oldHemi = this.scene.getObjectByName('honk_hemi');
        if (oldHemi) this.scene.remove(oldHemi);

        const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0xa855f7, 0.4);
        hemiLight.name = 'honk_hemi';
        this.scene.add(hemiLight);

        // Stage C & D: HDRI, Bloom, Atmosphere
        this.loadHDRI();
        
        if (this.options.useBloom) this.setupBloom();
        if (this.options.useAtmosphere) this.setupAtmosphere();
        if (this.options.useParticles) this.setupParticles();
        
        console.log("HonkFlow Visual Upgrader: Ready.");
    }

    setupAtmosphere() {
        this.scene.fog = new THREE.FogExp2(0x03040a, 0.04);
    }

    setupParticles() {
        const pCount = 200;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 50;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        
        const pMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(pGeo, pMat);
        this.particles.name = 'honk_atmosphere_particles';
        this.scene.add(this.particles);
    }

    loadHDRI() {
        const loader = new RGBELoader();
        loader.load(this.options.hdriPath, (texture) => {
            const envMap = this.pmremGenerator.fromEquirectangular(texture).texture;
            this.scene.environment = envMap;
            texture.dispose();
        }, undefined, (err) => {
            console.warn("HonkFlow Visual Upgrader: HDRI Load Failed.", err);
        });
    }

    setupBloom() {
        try {
            const renderScene = new RenderPass(this.scene, this.camera);
            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                this.options.bloomStrength,
                this.options.bloomRadius,
                this.options.bloomThreshold
            );
            const outputPass = new OutputPass();

            this.composer = new EffectComposer(this.renderer);
            this.composer.addPass(renderScene);
            this.composer.addPass(bloomPass);
            this.composer.addPass(outputPass);

            window.addEventListener('resize', () => {
                if (this.composer) this.composer.setSize(window.innerWidth, window.innerHeight);
            });
        } catch (e) {
            console.error("HonkFlow Visual Upgrader: Bloom setup failed.", e);
            this.composer = null;
        }
    }

    render(t) {
        if (this.particles) {
            this.particles.rotation.y = t * 0.01;
            this.particles.rotation.x = t * 0.005;
        }

        const hemi = this.scene.getObjectByName('honk_hemi');
        if (hemi) {
            hemi.intensity = 0.4 + Math.sin(t * 0.5) * 0.05;
        }

        if (this.composer && this.options.useBloom) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
