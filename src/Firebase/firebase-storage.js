import { app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL , deleteObject } from '@firebase/storage'

export function uploadFile(file,id) {
   const storage = getStorage(app, process.env.REACT_APP_FIREBASE_STORAGE)
   let name = ''
   if (file) {
      name = file.name
   }
   const storageRef = ref(storage, 'cv/' +id + name)
   return uploadBytes(storageRef, file)
      .then((snapshot) => {
         return getDownloadURL(storageRef)
            .then(u => { return u })
      })
      .catch(err => {
         return err
      })

}
export function deleteFile(name,id) {
   const storage = getStorage(app, process.env.REACT_APP_FIREBASE_STORAGE)
   const storageRef = ref(storage, 'cv/' +id + name)
   return deleteObject(storageRef)
}
