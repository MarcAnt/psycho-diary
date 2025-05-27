import { EntryStore } from "@/stores/entry-store";
import CryptoJS from "crypto-js";
import { PersistStorage } from "zustand/middleware";

const key = process.env.NEXT_PUBLIC_SECRET_KEY;
const SECRET_KEY = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

export const encryptedStorage: PersistStorage<EntryStore> = {
  getItem: (name: string) => {
    const encrypted = sessionStorage.getItem(name);
    return encrypted
      ? JSON.parse(
          CryptoJS.AES.decrypt(encrypted, SECRET_KEY, { iv: iv }).toString(
            CryptoJS.enc.Utf8
          )
        )
      : null;
  },
  setItem: (name: string, value) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY, {
      iv: iv,
    }).toString();
    sessionStorage.setItem(name, encrypted);
  },
  removeItem: (name: string) => sessionStorage.removeItem(name),
};
