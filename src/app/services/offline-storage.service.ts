import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OfflineStorageService {

  constructor(private storage: Storage) { }

  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await this.storage.set(storageKey,encryptedValue);
    }
  
    // Get the value
    async get(storageKey: string) {
      const ret = await this.storage.get(storageKey );
      return ret === null ? ret : JSON.parse(unescape(atob(ret)));
    }
  
    async removeStorageItem(storageKey: string) {
      await this.storage.remove(storageKey);
    }
  
    // Clear storage
    async clear() {
      await this.storage.clear();
    }
}
