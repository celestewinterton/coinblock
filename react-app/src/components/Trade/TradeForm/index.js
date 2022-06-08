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

    console.log(user)

    return (
        <div className="column">
            <div className="row">
                <h6 onClick={e => (setSell(false), setBuy(true))} className="padded">Buy</h6>
                <h6 onClick={e => (setSell(true), setBuy(false))} className="padded">Sell</h6>
            </div>
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
                <div>
                    <label>{buy ? "Pay with" : "Add to"}</label>
                    <input
                        type='text'
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='$0'></input>
                </div>
                <button id='create-channel' className="green-button" type="submit">Save</button>
            </form>
        </div>
    );
};

export default TradeForm;
