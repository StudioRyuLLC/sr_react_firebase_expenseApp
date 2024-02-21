//get useState hook from React
import {useState} from 'react';

//get function for navigation
//import { useNavigate} from 'react-router-dom';

//enable the ability for user to sign out
//import {signOut} from 'firebase/auth';

//get state of user (logged in/out)
//import {auth} from '../../config/firebase_config'

//enable the ability to add a transaction
import {useAddTransaction} from '../../hooks/useAddTransaction';

//enable the ability to read from db
import {useGetTransactions} from '../../hooks/useGetTransactions';

//get top navigational component
import {TopNav} from '../../layouts/top_nav';

//------------------------------------

export const ExpenseTracker = () => {

    //---

    //create function upon form submittal...
    const {addTransaction} = useAddTransaction();

    //---

    //get transaction data from db
    const {transactions, transactionTotals} = useGetTransactions();

    //---

    //create states for the form to get values of inputs
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);

    //---

    //this state is set to 'expense' by default for radio button group
    const [transactionType, setTransationType] = useState('Expense');

    //---

    //get transaction values
    const {balance, income, expenses} = transactionTotals;

    //---

    //initiate navigate hook
    //const navigate = useNavigate();

    //---

    //form on submit function...
    const onSubmit = (e) => {

        //keep DOM from reloading...
        e.preventDefault();

        //inserting input values from the form...
        addTransaction({

            description,
            transactionAmount,
            transactionType,

        });//end addTransaction

        // //TESTING: Brute forcing data
        // addTransaction({description: "Haircut",transactionAmount: 22,transactionType: "expense",});//end addTransaction

        //clear form amounts
        setDescription("");
        setTransactionAmount("");

    };//end onSubmit

    //---

    // Format the price above to USD using the locale, style, and currency.
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    //---

     //display in DOM...
    return (
        <>

        <TopNav />

            <div className="mb-0 expense_tracker_wrapper">

                <form className=" mb-0 add_transaction" onSubmit={onSubmit}>

                        <div className="radio_input_wrapper text-center">

                            <h5 className="form-check-inline">Transaction Type:</h5>

                            <div className="form-check form-check-inline mb-2">

                                <input 
                                type="radio"  
                                id="expense" 
                                name="transactionType" 
                                className="form-check-input" 
                                value="Expense" 
                                checked={transactionType === "Expense"}
                                onChange={(e) => setTransationType(e.target.value)} 
                                />
                                <label htmlFor="expense" className="form-check-label">Expense</label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                                <input 
                                type="radio"  
                                id="income"  
                                name="transactionType" 
                                className="form-check-input" 
                                value="INCOME"
                                checked={transactionType === "INCOME"}
                                onChange={(e) => setTransationType(e.target.value)} 
                                 />
                                <label htmlFor="income" className="form-check-label">Income</label>
                            </div>

                        </div>

                        <div className="form-group mb-2">
                            <span className="req_aster sr-only">*</span>
                            <label htmlFor="descrp" className="sr-only">Description:</label>
                            <input 
                            id="descrp" 
                            type="text" 
                            className="form-control" 
                            value={description} 
                            placeholder="Description" 
                            onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="form-group mb-2">
                            <span className="req_aster sr-only">*</span>
                            <label htmlFor="amount" className="sr-only">Amount:</label>
                            <input 
                            id="amount" 
                            type="number" 
                            className="form-control" 
                            value={transactionAmount} 
                            placeholder="Amount" 
                            onChange={(e) => setTransactionAmount(e.target.value)} required  />
                        </div>

                        <button className="btn btn-primary btn-block"><i className="fas fa-plus-square"></i> Add Transaction</button>

                </form>

                <table className="table table-striped summary_table">
                    <thead>
                        <tr>
                        <th scope="col" className="text-center"><h5>Your Balance</h5></th>
                        <th scope="col" className="text-center"><h5>Income</h5></th>
                        <th scope="col" className="text-center"><h5>Expenses</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        {balance >= 0 ? (

                        <td className="text-center"><strong>{USDollar.format(balance)}</strong></td>

                        ) : (

                        <td className="text-center"><strong>-{USDollar.format(balance * -1)}</strong></td>

                        )}

                        <td className="text-center"><strong>{USDollar.format(income)}</strong></td>
                        <td className="text-center"><strong>{USDollar.format(expenses)}</strong></td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div className="transactions">

            <h4 className='text-center pb-2 transaction_title'>Transactions</h4>

                <div className="transactions_wrapper">

                    <table className="table table-striped transaction_table">
                        <thead>
                            <tr>
                            <th scope="col"><h6>Description</h6></th>
                            <th scope="col" className='text-right'><h6>Amount</h6></th>
                            <th scope="col" className='text-right'><h6>Category</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {transactions.map((transaction) => {

                                const{description, transactionAmount, transactionType} = transaction;

                                return(

                                    <tr>
                                        <td><strong>{description}</strong></td>
                                        <td className='text-right'>{USDollar.format(transactionAmount)}</td>
                                        <td className='text-right'><span style = {{color: transactionType === "Expense" ? "red" : "green"}}>{transactionType}</span></td>
                                    </tr>

                                )

                            })}
                            
                        </tbody>
                    </table>

                </div>

                {!transactions && 
                    <i class='fas fa-spinner fa-5x  fa-pulse transaction_spinner'></i>
                }

            </div>

        </>

    );//end return

};

/*

$1,140.35	$1,630.00	$489.65

            <div className="transactions">

                <h3>Transactions</h3>

                <ul>

                    {transactions.map((transaction) => {

                        const{description, transactionAmount, transactionType} = transaction;

                        return(

                        <li>
                            <h4>{description}</h4>
                            <p>${transactionAmount} &bull; <label style = {{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
                        </li>

                        )

                    })}
         
                </ul>


            </div>
*/