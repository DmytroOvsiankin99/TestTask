import {auth, firestore} from "./firebase";
import {storage} from "./firebase";

export const getGoodsFB = (callback) => {
    let array = [];
    firestore.collection('goods').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                array.push({...doc.data()});
            })
            callback(array);
        });
}
export const addNewGoodFB = (callback, object) => {
    firestore.collection('goods').add(object).then(doc => {
        firestore.collection('goods').doc(`${doc.id}`).update('id', doc.id).then(() => {
            callback({...object, id: doc.id});
        });
    })
}
export const deleteGoodFB = (callback, id) => {
    firestore.collection("goods").doc(`${id}`).delete().then(function () {
        callback(id);
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
export const uploadPhotoFB = (callback, object) => {
    if(object.photoURL){
        const uploadTask = storage.ref(`goodImages/${object.photoURL.name}`).put(object.photoURL);
        uploadTask.on('state_changed', (snapshot) => {
                console.log(`${Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}%`);
            },
            (error) => {
                console.log('some error');
            },
            () => {
                storage.ref('goodImages').child(object.photoURL.name).getDownloadURL().then(
                    url => {
                        addNewGoodFB(callback, {...object, photoURL: url});
                    })
            })
    }
    else{
        addNewGoodFB(callback, {...object, photoURL: ''});
    }
}
export const preventUpload = (image, setFile, setProgress) => {
    const uploadTask = storage.ref(`temp/temp`).put(image);
    uploadTask.on('state_changed',
        (snapshot) => {
            let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
        (error) => {
            console.log('some error')
        }, () => {
            storage.ref('temp').child('temp').getDownloadURL().then(
                url => {
                    console.log(url);
                    setFile(url);
                    setProgress('done')
                }
            );
        });

}
const editExistGoodFBWithImg = (callback, id, editingFields) =>{
    firestore.collection('goods').doc(`${id}`).update(editingFields).then(() => {
        let array = [];
        firestore.collection('goods').get().then((snapshot) => {
            snapshot.forEach(doc => {
                array.push({...doc.data()});
                callback(array);
            })
        });
    });
}
export const editExistGoodFB = (callback, id, editingFields) =>{
    if(!editingFields.photoURL){
        editExistGoodFBWithImg(callback,id,editingFields);
    }
    else{
        console.log('new file? then wait');
        console.log(typeof editingFields.photoURL);
        firestore.collection('goods').get().then((snapshot)=>{
            snapshot.forEach(doc=>{
                if(id===doc.id){
                    storage.refFromURL(doc.data().photoURL).delete().then(()=>{
                        let uploadTask = storage.ref(`goodImages/${editingFields.photoURL.name}`).put(editingFields.photoURL);
                        uploadTask.on('state_changed',
                            (snapshot)=>{
                                console.log(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                            },
                            (error)=>{
                                console.log(error);
                            },
                            (url)=>{
                                storage.ref('goodImages').child(editingFields.photoURL.name).getDownloadURL()
                                    .then(url=>{
                                        let newEditingFields={...editingFields, photoURL: url}
                                        firestore.collection('goods').doc(`${id}`).update({photoURL: url})
                                            .then(()=>{
                                                editExistGoodFBWithImg(callback,id,newEditingFields);
                                            });
                                    });
                            });
                    }).catch(()=>{
                        console.log('some error');
                    });

                }
            })
        });
    }
}
export const signInFB = ({email, password},callback) =>{
    auth.signInWithEmailAndPassword(email, password)
        .then(res=>{
            callback({email: auth.currentUser.email, id: auth.currentUser.uid});
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}
export const signOutFB = (callback) =>{
    auth.signOut().then(() => {
            callback();
        }
    )
}
//email='maxim19295@gmail.com', password='vTePJ7dMnFx8gzj'