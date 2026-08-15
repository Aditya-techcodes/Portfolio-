import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as fs from 'fs';
import * as path from 'path';

(globalThis as any).FileReader = class FileReader {
  private _onload: any = null;
  private _result: any = null;
  private _done = false;

  get result() {
    return this._result;
  }

  get onload() {
    return this._onload;
  }

  set onload(fn: any) {
    this._onload = fn;
    if (this._done && fn) {
      setTimeout(() => fn({ target: this }), 0);
    }
  }

  readAsArrayBuffer(blob: any) {
    blob.arrayBuffer().then((buf: ArrayBuffer) => {
      this._result = buf;
      this._done = true;
      if (this._onload) {
        this._onload({ target: this });
      }
    });
  }

  readAsDataURL(blob: any) {
    blob.arrayBuffer().then((buf: ArrayBuffer) => {
      const base64 = Buffer.from(buf).toString('base64');
      const type = blob.type || 'application/octet-stream';
      this._result = `data:${type};base64,${base64}`;
      this._done = true;
      if (this._onload) {
        this._onload({ target: this });
      }
    });
  }
};

async function test() {
  const scene = new THREE.Scene();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  scene.add(box);

  const exporter = new GLTFExporter();
  console.log('Starting exportAsync...');
  const result = await exporter.parseAsync(scene, { binary: true });
  console.log('Result length:', (result as ArrayBuffer).byteLength);
  const outDir = path.join(process.cwd(), 'public', 'models');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'test.glb');
  fs.writeFileSync(outPath, Buffer.from(result as ArrayBuffer));
  console.log('Wrote file successfully to:', outPath);
}

test();
