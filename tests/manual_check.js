/**
 * HonkFlow: CA-001, CA-002, CA-003, CA-004
 * MANUAL VERIFICATION SUITE
 * 
 * Since no test framework is defined, this script provides the verification
 * logic to be checked via Browser Console in each migrated page.
 */

const MigrationTests = {
  checkImportMap: () => {
    const importMap = document.querySelector('script[type="importmap"]');
    console.log(importMap ? "✅ CA-001: Import Map found." : "❌ CA-001: Import Map MISSING.");
    return !!importMap;
  },

  checkThreeBridge: () => {
    const isBridgeOk = window.THREE && typeof window.THREE.Scene === 'function';
    console.log(isBridgeOk ? "✅ CA-002: THREE bridge active." : "❌ CA-002: THREE bridge FAILED.");
    return isBridgeOk;
  },

  checkVisualUpgrader: () => {
    const vuActive = window.vu instanceof VisualUpgrader;
    console.log(vuActive ? "✅ CA-003: VisualUpgrader instance found." : "❌ CA-003: VisualUpgrader MISSING/INVALID.");
    return vuActive;
  },

  checkColorSpace: (renderer) => {
    const isSRGB = renderer.outputColorSpace === 'srgb';
    console.log(isSRGB ? "✅ CA-004: ColorSpace is sRGB." : "❌ CA-004: ColorSpace NOT sRGB.");
    return isSRGB;
  }
};

window.MigrationTests = MigrationTests;
