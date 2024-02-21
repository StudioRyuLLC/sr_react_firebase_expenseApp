//create state to keep track of transactions
import {useEffect, useState} from 'react';

//invoke needed functions from Firestore DB
import {query, collection, where, orderBy, onSnapshot} from 'firebase/firestore'

//get database from config file
import {db} from '../config/firebase_config';

//get user info
import {useGetUserInfo} from './useGetUserInfo';

//---------------------------------------

export const useGetTransactions = () => {

    //---

    const[transactions, setTransactions] = useState([]);

    //---

    //set transaction vars
    const[transactionTotals, setTransactionTotals] = useState({

        balance: 0.0,
        income: 0.0,
        expenses:0.0,

    });

    //---

    //make reference to database and collection [name]
    const transactionCollectionRef = collection(db, "transactions");

    //---

    //get user id
   // let userId = "123456";
    const {userId} = useGetUserInfo()

    //---

    //function listener for new transactions
    const getTransactions = async () =>{

        //declare ability to close out query from db
        let unsubscribe;

        //query inside db...
        //handle errors inside of this function; 
        //catch any issues while trying to retrieve data
        try{

            //make query
            //specify what query to make
            const queryTransactions = query(

                transactionCollectionRef, 
                where("userId", "==", userId),
                orderBy("createdAt", "desc"),

            );//end queryTransactions

            //track query for changes...
            //'snapshopt' contains data need for the user
            onSnapshot(queryTransactions, (snapshot) => {

                //create array of needed objects to condense the data from db
                let docs = [];

                //set transaction vars
                let totalIncome = 0;
                let totalExpenses = 0;

                //loop through each specific element...
                snapshot.forEach((doc) => {

                    //get data from document...
                    const data = doc.data();

                    //get each document id...
                    const id = doc.id;

                    //filter data
                    docs.push({...data, id});


                    //do math for transactions
                    //be sure to set values to numbers from strings brought in from db
                    if(data.transactionType === "Expense"){

                        totalExpenses += Number(data.transactionAmount);

                    }else{

                        totalIncome += Number(data.transactionAmount);

                    }//end if

                });

                //filter is done
                setTransactions(docs);

                //set transaction values
                let balance = totalIncome - totalExpenses;
                setTransactionTotals({

                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,

                });

            });

        } catch(err){

            //error out so doesn't break code
            console.error(err);

        }//end try

        //close out query(?)
        return () => unsubscribe();

    };//end getTransactions

    //---

    //hook
    useEffect(() => {

        getTransactions();

    });

    //---

    //list of transactions in db
    return{transactions, transactionTotals};//end return

}//end useGetTransactions