import { app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'

export function uploadFile(file) {
    const storage = getStorage(app, "gs://signups-2faef.appspot.com/")
    const storageRef = ref(storage, 'cv/' + file.name)
    let url=''
    uploadBytes(storageRef, file)
        .then((snapshot) => {
            getDownloadURL(storageRef)
                .then(u => url=u)
        })
        .catch(err => {
            console.log(err)
        })
        
}
