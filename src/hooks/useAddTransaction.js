//make relevant functions for db available
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';

//get DB from config file
import {db} from '../config/firebase_config';

//get (logged in) user info
import {useGetUserInfo} from './useGetUserInfo';

//-------------------------------------

export const useAddTransaction = () => {

    //---

    //get the user ID
    //let userId = '123456';
    const {userId} = useGetUserInfo();
    
    //---

    //make reference to database and collection [name]
    const transactionCollectionRef = collection(db, "transactions");

    //---

    //retrieve data from db asynchronously...
    //and set attributes to be added...
    const addTransaction = async ({
        
        description, 
        transactionAmount,
        transactionType

    }) => {

        //once data is received
        await addDoc(transactionCollectionRef, {
        
            userId: userId, //retrieved user ID from login
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
            
        });//end await

    };

    //---

    return {addTransaction};

};//end useAddTransaction

