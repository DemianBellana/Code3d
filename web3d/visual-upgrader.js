/**
 * HONKFLOW VISUAL UPGRADER
 * Stage B: ToneMapping & Ambient Lighting
 * Stage C: UnrealBloomPass & HDRI Reflections
 * Stage D: Cinematic Atmosphere & Ambient Particles
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/OutputPass.js';
import { RGBELoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/RGBELoader.js';

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
        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.pmremGenerator.compileEquirectangularShader();
        
        this.init();
    }

    init() {
        // Stage B: ToneMapping & Color Management
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = this.options.exposure;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Ambient Lighting Refinement
        this.scene.remove(this.scene.getObjectByName('honk_ambient'));
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
        ambientLight.name = 'honk_ambient';
        this.scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0xa855f7, 0.6);
        hemiLight.name = 'honk_hemi';
        this.scene.add(hemiLight);

        // Stage C & D: HDRI, Bloom, Atmosphere
        this.loadHDRI();
        
        if (this.options.useBloom) this.setupBloom();
        if (this.options.useAtmosphere) this.setupAtmosphere();
        if (this.options.useParticles) this.setupParticles();
        
        console.log("HonkFlow Visual Upgrader: Cinematic Atmosphere Initialized.");
    }

    setupAtmosphere() {
        // Subtle depth fog for physical presence
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
            console.log("HonkFlow Visual Upgrader: HDRI Loaded.");
        }, undefined, (err) => {
            console.warn("HonkFlow Visual Upgrader: HDRI Load Failed.", err);
        });
    }

    setupBloom() {
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
            this.composer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    render(t) {
        // Stage D: Micro-movement & Particle animation
        if (this.particles) {
            this.particles.rotation.y = t * 0.01;
            this.particles.rotation.x = t * 0.005;
        }

        // Breathing Lighting
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
