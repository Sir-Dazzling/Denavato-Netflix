import {useEffect, useState, useContext} from 'react';
import {FirebaseContext} from '../context/firebase';

export default function useContent(target){
    const [content, setcontent] = useState([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        firebase
            .firestore()
            .collection(target)
            .get()
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id
                }));
                setcontent(allContent);
            })
            .catch((error) => {
                console.log("Error is ", error.message);
            })
    }, [firebase, target]);

    return { [target]: content};
}