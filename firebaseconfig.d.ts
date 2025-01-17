// src/firebase/firebaseconfig.d.ts
declare module './src/firebase/firbaseconfig.js' {
    export const imageToUrl: (image: File) => Promise<string>;
    export const ref: any;  // You can specify the correct type, or leave it as 'any'
    export const storage: any;  // Same as above, specifying correct type is preferable
    export const uploadBytes: any;
    export const getDownloadURL: any;
  }
  