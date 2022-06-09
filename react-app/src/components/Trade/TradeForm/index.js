import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom"
import { postTransaction } from "../../../store/transactions";

const TradeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState()
    const [crypto, setCrypto] = useState("Crypto")
    const [bank, setBank] = useState()
    const [type, setType] = useState("buy")
    const price = "GET PRICE"


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('user_id', user.id);
        formData.append('crypto_id', crypto.id);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('amount', amount);
        formData.append('amount', amount);
        formData.append('amount', amount);

        errors = await dispatch(postTransaction(formData))
    }

    useEffect(() => {
        setErrors(errors)
    }, [errors]);

    console.log(user)

    return (
        <div className="column">
            <div className="row">
                <NavLink to="#" className="buy-tab" style={type === "buy" ? {color: "#0052FF", borderBottom: "none"} : null}><h6 onClick={e => setType("buy")}>Buy</h6></NavLink>
                <NavLink to="#" className="sell-tab" style={type === "sell" ? {color: "#0052FF", borderBottom: "none"} : null}><h6 onClick={e => setType("sell")}>Sell</h6></NavLink>
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
                    <label>{type === "buy" ? "Buy" : "Sell"}
                    <select
                        type='text'
                        value={crypto}
                        required
                        onChange={(e) => setCrypto(e.target.value)}
                        placeholder='$0'>
                            <option>Bitcoin</option>
                            <option>Ethereum</option>
                            <option>Tether</option>
                    </select>
                    </label>
                </div>
                <div>
                    <label>{type === "buy" ? "Pay with" : "Add to"}
                    <select
                        type='text'
                        value={bank}
                        required
                        onChange={(e) => setBank(e.target.value)}
                        placeholder='$0'>
                            <option>Cash (USD)</option>
                            <option>Bank of Satoshi</option>
                    </select>
                    </label>
                </div>
                <button className="" type="submit">{type === "buy" ? `Buy ${crypto}` : `Sell ${crypto}`}</button>
            </form>
        </div>
    );
};

export default TradeForm;
