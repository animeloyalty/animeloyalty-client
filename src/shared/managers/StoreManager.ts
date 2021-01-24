export class StoreManager {
  getBoolean(key: string, defaultValue: boolean) {
    return /^true$/.test(this.getString(key, String(defaultValue)));
  }
  
  getString(key: string, defaultValue: string) {
    return localStorage.getItem(getKey(key)) ?? defaultValue;
  }

  getStringEnum<T extends string>(key: string, defaultValue: T) {
    return this.getString(key, defaultValue) as T;
  }

  set(key: string, value: boolean | string) {
    localStorage.setItem(getKey(key), String(value));
  }
}

function getKey(key: string) {
  return `animeloyalty.${key}`;
}
