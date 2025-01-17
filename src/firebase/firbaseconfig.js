// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSV8DOc8JK_mkwGKYpMjSGNJyZujRqeUY",
  authDomain: "ecommerce-web-bafe4.firebaseapp.com",
  projectId: "ecommerce-web-bafe4",
  storageBucket: "ecommerce-web-bafe4.appspot.com",
  messagingSenderId: "949352532092",
  appId: "1:949352532092:web:68b35a86f3f321db6321f9",
  measurementId: "G-PNYFEE6KJ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

const imageToUrl = async (image) => {
  const storageRef = ref(storage, `img/${image.name}`);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  console.log(url);
  return url;
};

export { ref, storage, uploadBytes, getDownloadURL, imageToUrl };
