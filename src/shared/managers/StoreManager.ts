export class StoreManager {
  get<T extends string>(key: string, defaultValue: T) {
    return this.getString(key, defaultValue) as T;
  }

  getBoolean(key: string, defaultValue: boolean) {
    return /^true$/.test(this.getString(key, String(defaultValue)));
  }
  
  getString(key: string, defaultValue: string) {
    return localStorage.getItem(getKey(key)) ?? defaultValue;
  }

  set(key: string, value: boolean | string) {
    localStorage.setItem(getKey(key), String(value));
  }
}

function getKey(key: string) {
  return `animeloyalty.${key}`;
}
