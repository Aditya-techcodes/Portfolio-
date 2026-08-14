import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.1,
        1000
      );
      camera.position.z = 6;

      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      
      // Clean container
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const isMobile = window.innerWidth < 768;

      // 3D Objects Group
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. TorusKnot outer wireframe mesh
      const knotRadius = isMobile ? 1.2 : 1.5;
      const tubeRadius = isMobile ? 0.32 : 0.42;
      const tubularSegments = isMobile ? 64 : 120;
      const radialSegments = isMobile ? 12 : 20;

      const geometry = new THREE.TorusKnotGeometry(
        knotRadius,
        tubeRadius,
        tubularSegments,
        radialSegments
      );

      // Wireframe Material with dynamic reflections
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x1B4DFF,
        emissive: 0x1230B3,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.5
      });

      const mesh = new THREE.Mesh(geometry, material);
      mainGroup.add(mesh);

      // 2. Inner floating glowing core particles
      const particleCount = isMobile ? 160 : 350;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color(0x1B4DFF); // Cobalt Blue
      const color2 = new THREE.Color(0xFF5A1F); // Orange

      for (let i = 0; i < particleCount; i++) {
        const radius = (isMobile ? 1.0 : 1.2) + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);

        const mixedColor = color1.clone().lerp(color2, Math.random());
        particleColors[i * 3] = mixedColor.r;
        particleColors[i * 3 + 1] = mixedColor.g;
        particleColors[i * 3 + 2] = mixedColor.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: isMobile ? 0.045 : 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });

      const particlePoints = new THREE.Points(particleGeo, particleMat);
      mainGroup.add(particlePoints);

      // 3. Inner Icosahedron accent core
      const innerCoreGeo = new THREE.IcosahedronGeometry(isMobile ? 0.55 : 0.7, 1);
      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: 0xFF5A1F,
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      mainGroup.add(innerCoreMesh);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x1B4DFF, 4, 20);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFF5A1F, 4, 20);
      pointLight2.position.set(-5, -5, -2);
      scene.add(pointLight2);

      // Mouse and Touch tracking
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const rect = container.getBoundingClientRect();
        targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
        targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      container.addEventListener('touchmove', handlePointerMove, { passive: true });

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Object rotation
        mesh.rotation.x = elapsedTime * 0.22;
        mesh.rotation.y = elapsedTime * 0.32;

        innerCoreMesh.rotation.x = -elapsedTime * 0.35;
        innerCoreMesh.rotation.y = elapsedTime * 0.45;

        particlePoints.rotation.y = -elapsedTime * 0.12;

        // Smooth interactive reaction on both touch and mouse
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        mainGroup.rotation.y = currentX * 0.5;
        mainGroup.rotation.x = -currentY * 0.5;

        // Floating hover effect
        mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;

        renderer?.render(scene, camera);
      };

      animate();

      // Responsive Resize Observer
      const handleResize = () => {
        if (!container || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        window.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('touchmove', handlePointerMove);
        geometry.dispose();
        material.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        innerCoreGeo.dispose();
        innerCoreMat.dispose();
        renderer?.dispose();
        if (container && renderer?.domElement) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error('WebGL Hero 3D initialization failed, showing fallback UI:', err);
      setHasError(true);
    }
  }, []);

  // Fallback UI if WebGL is unavailable
  if (hasError) {
    return (
      <div className="relative w-full h-[280px] sm:h-[400px] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1B4DFF]/20 via-transparent to-[#FF5A1F]/20 rounded-3xl blur-2xl animate-pulse" />
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#1B4DFF]/40 dark:border-[#FF5A1F]/40 flex items-center justify-center animate-spin-slow">
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-[#1B4DFF] to-[#FF5A1F] opacity-80 blur-lg transform rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-black/60 dark:text-white/60">
            [Interactive 3D Preview]
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] xs:h-[340px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-[#1B4DFF]/15 dark:bg-[#1B4DFF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-[#FF5A1F]/15 dark:bg-[#FF5A1F]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-pan-y"
      />

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-6 bg-black/40 dark:bg-white/10 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-white/90 border border-white/10 shadow-lg pointer-events-none flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00C48C] animate-ping" />
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00C48C]" />
        <span>3D Wireframe Canvas</span>
      </div>
    </div>
  );
};
