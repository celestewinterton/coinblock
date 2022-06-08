import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TradeForm = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState()
    const [buy, setBuy] = useState(true)
    const [sell, setSell] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('amount', amount)
        formData.append('user_id', user.id)
    }

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <div className="column">
            <div className="row">
                <h6 onClick={e => (setSell(false), setBuy(true))} activeClassName="activeFormTab">Buy</h6>
                <h6 onClick={e => (setSell(true), setBuy(false))} activeClassName="activeFormTab">Sell</h6>
            </div>
            {buy ?
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-errors">
                        {errors.amount && <p>{errors.amount}</p>}
                    </div>
                    <input
                        type='text'
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='$0'></input>
                </div>
                <button id='create-channel' className="green-button" type="submit">Save</button>
            </form>
            : <h6>SELLING</h6>}
        </div>
    );
};

export default TradeForm;
