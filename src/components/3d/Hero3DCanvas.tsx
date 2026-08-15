import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, OrbitControls } from '@react-three/drei';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useTheme } from '../../context/ThemeContext';
import { RotateCw, Box, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { saveModelToStorage, getModelFromStorage } from '../../utils/modelStorage';

const DIRECT_MODEL_PATHS = [
  '/models/sasuke.glb',
  '/sasuke.glb',
  '/models/sen_you.glb',
  '/sen_you.glb',
  '/models/character.glb',
  '/character.glb',
  '/models/model.glb',
  '/model.glb',
  '/models/avatar.glb',
  '/avatar.glb',
  '/models/senyou.glb',
  '/senyou.glb'
];

// Persistent module-level cache so re-renders or section navigation never unmount/evaporate the model
let globalCachedGLTF: GLTF | null = null;
let globalCachedName: string | null = null;

interface AnimatedCharacterProps {
  gltf: GLTF;
  modelName: string;
}

/**
 * Character Component with @react-three/drei useAnimations hook
 */
function AnimatedCharacter({ gltf, modelName }: AnimatedCharacterProps) {
  const group = useRef<THREE.Group>(null);
  
  // 2. Use useAnimations(gltf.animations, group) from @react-three/drei
  const { actions } = useAnimations(gltf.animations, group);

  // 1. Log the model's available animations to the console first
  useEffect(() => {
    if (gltf?.animations) {
      console.log('🎬 Available gltf.animations in file:', gltf.animations.map((a) => a.name));
    }
  }, [gltf]);

  // 2, 3, 4, 6, 7. Animation playback control
  useEffect(() => {
    if (!actions) return;

    const actionKeys = Object.keys(actions);
    console.log('🎮 Loaded animation actions keys:', actionKeys);

    // 6. Visible warning if no animations found
    if (actionKeys.length === 0) {
      console.warn(
        `⚠️ No animation clips found in ${modelName || 'sasuke.glb'} — the file needs to be re-exported with an animation, e.g. from Mixamo`
      );
      return;
    }

    // 3. Match clip containing "walk" (case-insensitive), or fallback to FIRST clip
    const walkClipKey = actionKeys.find((key) => key.toLowerCase().includes('walk'));
    const targetKey = walkClipKey || actionKeys[0];
    const action = actions[targetKey];

    if (action) {
      console.log(`▶ Playing animation clip: "${targetKey}" for ${modelName}`);
      
      // 4 & 7. action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play()
      action
        .reset()
        .setLoop(THREE.LoopRepeat, Infinity)
        .fadeIn(0.3)
        .play();

      return () => {
        action.fadeOut(0.3);
      };
    }
  }, [actions, modelName]);

  // Auto-normalize bounding box scale and center position
  const { scale, position } = useMemo(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const bbox = new THREE.Box3().setFromObject(gltf.scene);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetHeight = 2.85;
    const scaleFactor = maxDim > 0 ? targetHeight / maxDim : 1;

    return {
      scale: scaleFactor,
      position: [
        -center.x * scaleFactor,
        -bbox.min.y * scaleFactor - 1.65,
        -center.z * scaleFactor
      ] as [number, number, number]
    };
  }, [gltf.scene]);

  return (
    <group ref={group} scale={scale} position={position} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}

/**
 * Modern Geometric Node Placeholder when no external GLB is mounted
 */
function HologramPlaceholder({ isDark }: { isDark: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.3;
      wireRef.current.rotation.z = t * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color={0x1b4dff}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color={0x00e5ff}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.3, 0.02, 16, 64]} />
        <meshBasicMaterial color={0xff5a1f} transparent opacity={0.8} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 64]} />
        <meshBasicMaterial color={0x00e5ff} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Pedestal base and ambient lighting scene elements
 */
function StudioStage({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight
        color={isDark ? 0xffffff : 0xf8fafc}
        intensity={isDark ? 1.8 : 2.2}
      />
      <directionalLight
        position={[4.5, 5.5, 4.5]}
        color={0x1b4dff}
        intensity={isDark ? 3.5 : 4.0}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-4.5, 3.5, -3.5]}
        color={0xff5a1f}
        intensity={isDark ? 3.0 : 3.5}
      />
      <spotLight
        position={[0, 7, 3]}
        color={isDark ? 0xffffff : 0xe0f2fe}
        intensity={isDark ? 4.5 : 5.0}
        angle={Math.PI / 4}
        penumbra={0.5}
      />
      <pointLight
        position={[0, -1.8, 0]}
        color={isDark ? 0x00e5ff : 0x1b4dff}
        intensity={isDark ? 2.5 : 2.0}
        distance={8}
      />

      {/* Pedestal Base */}
      <group position={[0, -1.75, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.6, 1.75, 0.18, 48]} />
          <meshStandardMaterial
            color={isDark ? 0x141a26 : 0xe2e8f0}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <torusGeometry args={[1.45, 0.035, 16, 48]} />
          <meshBasicMaterial color={0x00e5ff} />
        </mesh>
      </group>
    </>
  );
}

/**
 * Floating Embers / Sparkles
 */
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCyan = new THREE.Color(0x00e5ff);
    const colorBlue = new THREE.Color(0x1b4dff);
    const colorOrange = new THREE.Color(0xff5a1f);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.6;

      const rand = Math.random();
      const c = rand < 0.4 ? colorCyan : rand < 0.7 ? colorBlue : colorOrange;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04;
      pointsRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const Hero3DCanvas: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadedData, setLoadedData] = useState<{ gltf: GLTF; name: string } | null>(() => {
    if (globalCachedGLTF && globalCachedName) {
      return { gltf: globalCachedGLTF, name: globalCachedName };
    }
    return null;
  });
  const [isLoadingDirect, setIsLoadingDirect] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Automatically load sasuke.glb directly on page load
  useEffect(() => {
    let isCancelled = false;
    const loader = new GLTFLoader();

    const initializeDirectModel = async () => {
      // 1. Check memory cache first
      if (globalCachedGLTF && globalCachedName) {
        if (!isCancelled) {
          setLoadedData({ gltf: globalCachedGLTF, name: globalCachedName });
          setIsLoadingDirect(false);
        }
        return;
      }

      // 2. Check IndexedDB persistent storage
      try {
        const stored = await getModelFromStorage();
        if (stored && stored.buffer && !isCancelled) {
          loader.parse(
            stored.buffer,
            '',
            (gltf) => {
              if (!isCancelled) {
                console.log(`💾 Auto-loaded Sasuke 3D model from storage: ${stored.name}`);
                globalCachedGLTF = gltf;
                globalCachedName = stored.name;
                setLoadedData({ gltf, name: stored.name });
                setIsLoadingDirect(false);
              }
            },
            (err) => {
              console.warn('Could not parse stored model:', err);
            }
          );
          return;
        }
      } catch (err) {
        console.warn('Storage check:', err);
      }

      // 3. Auto-load directly from website paths (/models/sasuke.glb)
      const tryDirectPaths = async (index: number) => {
        if (index >= DIRECT_MODEL_PATHS.length || isCancelled) {
          if (!isCancelled) setIsLoadingDirect(false);
          return;
        }
        const path = DIRECT_MODEL_PATHS[index];

        try {
          const res = await fetch(path, { method: 'HEAD' });
          if (res.ok && !isCancelled) {
            loader.load(
              path,
              (gltf) => {
                if (!isCancelled) {
                  const name = path.split('/').pop() || path;
                  console.log(`🎯 Direct auto-loaded: ${path}`);
                  globalCachedGLTF = gltf;
                  globalCachedName = name;
                  setLoadedData({ gltf, name });
                  setIsLoadingDirect(false);
                }
              },
              undefined,
              () => {
                tryDirectPaths(index + 1);
              }
            );
          } else {
            tryDirectPaths(index + 1);
          }
        } catch {
          tryDirectPaths(index + 1);
        }
      };

      tryDirectPaths(0);
    };

    initializeDirectModel();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb') && !file.name.toLowerCase().endsWith('.gltf')) {
      alert('Please select a .glb or .gltf file.');
      return;
    }

    setLoadError(null);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (buffer) {
        const loader = new GLTFLoader();
        loader.parse(
          buffer,
          '',
          async (gltf) => {
            console.log(`✅ Loaded: ${file.name}`);
            globalCachedGLTF = gltf;
            globalCachedName = file.name;
            setLoadedData({ gltf, name: file.name });
            try {
              await saveModelToStorage(buffer, file.name);
            } catch (err) {
              console.error('Storage error:', err);
            }
          },
          (err) => {
            console.error('Parse error:', err);
            setLoadError('Failed to parse 3D file.');
          }
        );
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      className="relative w-full h-[360px] xs:h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none overflow-hidden rounded-3xl"
    >
      {/* Hidden File Input for quick drop/swap */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".glb,.gltf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-[#1B4DFF]/15 dark:bg-[#1B4DFF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#FF5A1F]/15 dark:bg-[#FF5A1F]/20 rounded-full blur-3xl pointer-events-none" />

      {/* React Three Fiber Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0.3, 5.5], fov: 40 }}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-pan-y"
      >
        <Suspense fallback={null}>
          <StudioStage isDark={isDark} />
          <FloatingParticles />

          {loadedData ? (
            <AnimatedCharacter
              key={loadedData.name}
              gltf={loadedData.gltf}
              modelName={loadedData.name}
            />
          ) : (
            <HologramPlaceholder isDark={isDark} />
          )}

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.7}
            dampingFactor={0.08}
            rotateSpeed={0.8}
          />
        </Suspense>
      </Canvas>

      {/* Model Active Tag */}
      {loadedData && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/40 dark:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-mono text-[11px] font-semibold">{loadedData.name}</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Swap model"
            className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      )}

      {loadError && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-600 dark:text-red-400 font-mono text-[11px] flex items-center gap-1.5 backdrop-blur-md">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{loadError}</span>
        </div>
      )}

      {/* Orbit Hint */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-black/50 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/90 border border-white/15 flex items-center gap-1.5">
          <Box className="w-3 h-3 text-[#00E5FF]" />
          <span>{loadedData ? 'Walking Animation Active' : 'Sasuke 3D Stage'}</span>
        </div>

        <div className="bg-black/50 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/90 border border-white/15 flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-[#FF5A1F] animate-spin" />
          <span>360° Drag Orbit</span>
        </div>
      </div>
    </div>
  );
};
