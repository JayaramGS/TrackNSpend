import { useState } from "react"
import { useExpenseContext } from "../../hooks/useExpenseContext";
import axios from "axios";
import Date from '../../assets/date.svg';
import Place from '../../assets/place.svg';
import Amount from '../../assets/amount.svg';

const ExpenseForm = () => {
    const { dispatch } = useExpenseContext()

    const [date, setDate] = useState('')
    const [place, setPlace] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);
    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expense = { date, place, amount }

        const response = await axios.post('api/overview', expense, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(response.status === 200) {
            const result = await response.data
            setDate('');
            setPlace('');
            setAmount('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_EXPENSES', payload: result})
        } 
        else {
            setError(response.data.error);
            setEmptyFields(response.data.emptyFields);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <img src={Date} />
                <label>Date: </label>
                <input type="date" onChange={(e) => setDate(e.target.value)} value={date} 
                    className={emptyFields.includes('Date') ? 'error' : ''} required />
            </div>
            <div>
                <img src={Place} />
                <label>Place: </label>
                <input type="text" onChange={(e) => setPlace(e.target.value)} value={place}
                    className={emptyFields.includes('Place') ? 'error' : ''} required />
            </div>
            <div>
                <img src={Amount} />
                <label>Amount: </label>
                <input type="number" onChange={(e) => setAmount(e.target.value)} value={amount}
                    min="0" className={emptyFields.includes('Amount') ? 'error' : ''} required />
            </div>
            <button>Add Expense</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ExpenseForm;