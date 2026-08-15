// IndexedDB Persistent Storage for User 3D Models (.glb / .gltf)
const DB_NAME = 'Portfolio3DDB';
const DB_VERSION = 1;
const STORE_NAME = 'models';
const MODEL_KEY = 'active_hero_character';

interface StoredModelRecord {
  id: string;
  name: string;
  buffer: ArrayBuffer;
  timestamp: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveModelToStorage(buffer: ArrayBuffer, name: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record: StoredModelRecord = {
        id: MODEL_KEY,
        name,
        buffer,
        timestamp: Date.now()
      };

      const putRequest = store.put(record);

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = () => {
        reject(putRequest.error);
      };
    });
  } catch (error) {
    console.error('Failed to save 3D model to IndexedDB:', error);
  }
}

export async function getModelFromStorage(): Promise<{ buffer: ArrayBuffer; name: string } | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(MODEL_KEY);

      getRequest.onsuccess = () => {
        const result = getRequest.result as StoredModelRecord | undefined;
        if (result && result.buffer) {
          resolve({ buffer: result.buffer, name: result.name });
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  } catch (error) {
    console.warn('Could not read 3D model from IndexedDB:', error);
    return null;
  }
}

export async function clearModelFromStorage(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const deleteRequest = store.delete(MODEL_KEY);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(deleteRequest.error);
      };
    });
  } catch (error) {
    console.error('Failed to clear model from IndexedDB:', error);
  }
}
