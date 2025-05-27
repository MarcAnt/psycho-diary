import CryptoJS from "crypto-js";

// const key = process.env.NEXT_PUBLIC_SECRET_KEY;
// const SECRET_KEY = CryptoJS.enc.Utf8.parse(key);
// const iv = CryptoJS.enc.Base64.parse(key);

// export const encryptedStorage: PersistStorage<EntryStore> = {
//   getItem: (name: string) => {
//     const encrypted = sessionStorage.getItem(name);
//     return encrypted
//       ? JSON.parse(
//           CryptoJS.AES.decrypt(encrypted, SECRET_KEY, { iv: iv }).toString(
//             CryptoJS.enc.Utf8
//           )
//         )
//       : null;
//   },
//   setItem: (name: string, value) => {
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY, {
//       iv: iv,
//     }).toString();
//     sessionStorage.setItem(name, encrypted);
//   },
//   removeItem: (name: string) => sessionStorage.removeItem(name),
// };

const CRYPTO_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // Use an environment variable in production!

export const secureStorage = {
  getItem: (name: string): string | null => {
    const data = sessionStorage.getItem(name);
    if (!data) return null;
    try {
      const decrypted = CryptoJS.AES.decrypt(data, CRYPTO_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return decrypted || null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    const encrypted = CryptoJS.AES.encrypt(value, CRYPTO_KEY).toString();
    sessionStorage.setItem(name, encrypted);
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};
