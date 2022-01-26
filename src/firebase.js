import firebase from 'firebase';
const firebaseConfig = {
	apiKey: 'AIzaSyCj3iRrlS59rwbld-a5E-GqM_MWHHAIDGE',
	authDomain: 'whatsapp-clone-bee29.firebaseapp.com',
	projectId: 'whatsapp-clone-bee29',
	storageBucket: 'whatsapp-clone-bee29.appspot.com',
	messagingSenderId: '550855906246',
	appId: '1:550855906246:web:fa3024e515d75fb39998c7',
	measurementId: 'G-22R5DRL3G8'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
