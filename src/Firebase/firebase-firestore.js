import { app } from "./firebase-config";
import {getFirestore} from '@firebase/firestore'

export const db=getFirestore(app)