import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TradeForm = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState()

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
        <>
            <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-errors">
                            {errors.name && <p>{errors.name}</p>}
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
        </>
    );
};

export default TradeForm;
