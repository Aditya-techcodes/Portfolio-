import * as THREE from 'three';

/**
 * High-definition procedural canvas textures matching every detail of
 * the AADI #10 Free Fire MAX character reference sheet.
 */

// 1. High-Definition Jersey Texture (1024x1024)
export function createJerseyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base sky blue (Argentina soccer jersey tone #4BA3E3)
    ctx.fillStyle = '#4BA3E3';
    ctx.fillRect(0, 0, 1024, 1024);

    // Precise vertical white stripes
    ctx.fillStyle = '#FFFFFF';
    const stripeWidth = 85;
    const gap = 85;
    for (let x = 20; x < 1024; x += stripeWidth + gap) {
      ctx.fillRect(x, 0, stripeWidth, 1024);
    }

    // Micro fabric mesh texture overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
    for (let y = 0; y < 1024; y += 4) {
      ctx.fillRect(0, y, 1024, 1.5);
    }
    for (let x = 0; x < 1024; x += 4) {
      ctx.fillRect(x, 0, 1.5, 1024);
    }

    // Dark collar trim top & hem bottom
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1024, 36);
    ctx.fillRect(0, 988, 1024, 36);

    // Front Chest #10 (Left chest on the front half of the UV cylinder, ~x: 400, y: 460)
    ctx.save();
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 86px "Arial Black", Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('10', 410, 450);

    // Back Jersey Typography (Around x: 920 and x: 100 for cylinder seam)
    // Arched "AADI"
    ctx.font = '900 76px "Arial Black", Impact, sans-serif';
    ctx.fillText('AADI', 930, 320);

    // Large Back Number "10"
    ctx.font = '900 170px "Arial Black", Impact, sans-serif';
    ctx.fillText('10', 930, 540);
    ctx.restore();

    // Subtle side seam ambient shadows
    const gradLeft = ctx.createLinearGradient(0, 0, 50, 0);
    gradLeft.addColorStop(0, 'rgba(0,0,0,0.2)');
    gradLeft.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradLeft;
    ctx.fillRect(0, 0, 50, 1024);

    const gradMid = ctx.createLinearGradient(670, 0, 720, 0);
    gradMid.addColorStop(0, 'rgba(0,0,0,0)');
    gradMid.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    gradMid.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradMid;
    ctx.fillRect(670, 0, 50, 1024);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

// 2. Headband Metal Plate with Engraved Leaf Village Symbol & 6 Rivets
export function createHeadbandPlateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Brushed metallic stainless steel gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.15, '#E2E8F0');
    grad.addColorStop(0.5, '#CBD5E1');
    grad.addColorStop(0.85, '#94A3B8');
    grad.addColorStop(1, '#64748B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Brushed metal horizontal streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 45; i++) {
      const y = Math.random() * 256;
      ctx.fillRect(0, y, 512, 1 + Math.random() * 2);
    }

    // Outer beveled border
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 492, 236);

    // Inner highlight rim
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.strokeRect(18, 18, 476, 220);

    // 6 Rivets (3 on left, 3 on right)
    const rivetPositions = [
      { x: 44, y: 55 },
      { x: 44, y: 128 },
      { x: 44, y: 201 },
      { x: 468, y: 55 },
      { x: 468, y: 128 },
      { x: 468, y: 201 }
    ];

    rivetPositions.forEach((r) => {
      // Rivet outer dark socket
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(r.x, r.y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Rivet metal head
      const rGrad = ctx.createRadialGradient(r.x - 3, r.y - 3, 1, r.x, r.y, 10);
      rGrad.addColorStop(0, '#FFFFFF');
      rGrad.addColorStop(0.5, '#CBD5E1');
      rGrad.addColorStop(1, '#334155');
      ctx.fillStyle = rGrad;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Engraved Leaf Village Emblem (Center Spiral + Leaf Triangle)
    const cx = 256;
    const cy = 128;

    // Engraving shadow
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    let rad = 4;
    let ang = 0;
    ctx.moveTo(cx, cy);
    for (let i = 0; i < 45; i++) {
      ang += 0.22;
      rad += 1.15;
      const x = cx + rad * Math.cos(ang);
      const y = cy + rad * Math.sin(ang);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(cx + 68, cy - 8);
    ctx.lineTo(cx + 44, cy + 44);
    ctx.stroke();

    // Inner highlight
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 3. Air Jordan 1 "Chicago" Sneaker Texture Map
export function createSneakerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base white leather
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, 512, 512);

    // Chicago Red panels (Toe wrap, heel counter, eyelets)
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, 0, 210, 512); // Toe & Heel red
    ctx.fillRect(390, 0, 122, 512); // Collar red

    // Black collar and swoosh area
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(210, 360, 180, 152);

    // Nike Swoosh curve
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.moveTo(220, 200);
    ctx.bezierCurveTo(280, 265, 380, 285, 490, 185);
    ctx.bezierCurveTo(390, 235, 290, 225, 220, 200);
    ctx.fill();

    // White sole sidewall
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 460, 512, 52);
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, 498, 512, 14); // Red bottom tread

    // Toe box perforations (vent holes)
    ctx.fillStyle = '#991B1B';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        ctx.beginPath();
        ctx.arc(40 + c * 26, 100 + r * 20, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Stitched seam lines
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(10, 10, 190, 492);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 4. Anime Eyes & Left-Eye Scar Texture
export function createFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Stylized anime skin tone
    ctx.fillStyle = '#F5D0B0';
    ctx.fillRect(0, 0, 512, 256);

    // Eye Positions
    const leftEyeX = 165;
    const rightEyeX = 347;
    const eyeY = 120;

    // Draw both anime eyes
    [leftEyeX, rightEyeX].forEach((ex, idx) => {
      // Sclera (White of eye)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(ex, eyeY, 36, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Iris (Dark Anime Grey / Charcoal gradient)
      const iGrad = ctx.createRadialGradient(ex, eyeY, 2, ex, eyeY, 16);
      iGrad.addColorStop(0, '#334155');
      iGrad.addColorStop(0.7, '#0F172A');
      iGrad.addColorStop(1, '#020617');
      ctx.fillStyle = iGrad;
      ctx.beginPath();
      ctx.arc(ex, eyeY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Pupil & Catchlight (White sparkle)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(ex, eyeY, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ex - 4, eyeY - 4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Sharp Anime Eyeliner & Upper Lash Line
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(ex - 42, eyeY + 4);
      ctx.quadraticCurveTo(ex, eyeY - 24, ex + 42, eyeY - 2);
      ctx.stroke();

      // Lower subtle eye contour
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ex - 28, eyeY + 16);
      ctx.quadraticCurveTo(ex, eyeY + 22, ex + 28, eyeY + 14);
      ctx.stroke();

      // Eyebrow
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(ex - 46, eyeY - 36 + (idx === 0 ? 4 : 0));
      ctx.lineTo(ex + 46, eyeY - 42);
      ctx.stroke();
    });

    // Kakashi's iconic left-eye vertical scar
    ctx.strokeStyle = '#991B1B';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(leftEyeX, eyeY - 70);
    ctx.lineTo(leftEyeX + 3, eyeY + 70);
    ctx.stroke();

    // Scar stitch highlights
    ctx.strokeStyle = '#FCA5A5';
    ctx.lineWidth = 2;
    for (let y = eyeY - 50; y <= eyeY + 50; y += 25) {
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 6, y);
      ctx.lineTo(leftEyeX + 9, y - 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 5. Sci-Fi Pedestal Concentric Glowing Ring Texture (512x512)
export function createPedestalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark metallic turntable surface
    const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    bgGrad.addColorStop(0, '#1E2330');
    bgGrad.addColorStop(0.7, '#0F1219');
    bgGrad.addColorStop(1, '#080A0E');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    const cx = 256;
    const cy = 256;

    // Glowing Neon Rings matching Free Fire MAX UI
    const rings = [
      { r: 242, color: 'rgba(27, 77, 255, 0.95)', width: 8 },
      { r: 215, color: 'rgba(255, 90, 31, 0.85)', width: 4 },
      { r: 175, color: 'rgba(0, 229, 255, 0.9)', width: 6 },
      { r: 120, color: 'rgba(168, 85, 247, 0.85)', width: 5 },
      { r: 60, color: 'rgba(255, 90, 31, 0.95)', width: 6 }
    ];

    rings.forEach(({ r, color, width }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Radial Sci-Fi Tech Ticks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 32; i++) {
      const a = (i * Math.PI * 2) / 32;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 195, cy + Math.sin(a) * 195);
      ctx.lineTo(cx + Math.cos(a) * 210, cy + Math.sin(a) * 210);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 6. Purple Lightning / Chakra Aura Particle Sprite
export function createChakraParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(232, 200, 255, 0.95)'); // Soft violet
    grad.addColorStop(0.45, 'rgba(168, 85, 247, 0.95)'); // Vivid Purple
    grad.addColorStop(0.7, 'rgba(126, 34, 206, 0.5)'); // Deep Violet
    grad.addColorStop(0.9, 'rgba(59, 130, 246, 0.2)'); // Cyan spark fringe
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    // Lightning starburst flares
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(64, 64);
      ctx.lineTo(64 + Math.cos(a) * 50, 64 + Math.sin(a) * 50);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
