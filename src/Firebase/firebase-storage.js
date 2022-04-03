import { app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'

export function uploadFile(file) {
    const storage = getStorage(app,process.env.REACT_APP_FIREBASE_STORAGE)
    const storageRef = ref(storage, 'cv/' + file.name)
    let url=''
    return uploadBytes(storageRef, file)
        .then((snapshot) => {
           return getDownloadURL(storageRef)
                .then(u => {return u})
        })
        .catch(err => {
           return err
        })
    
}
