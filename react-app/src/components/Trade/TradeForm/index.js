import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { NavLink } from "react-router-dom"
import { postTransaction } from "../../../store/transactions";
import axios from "axios"
import { loadCrypto } from "../../../store/crypto";

const coins = {
    1: {id: '1', symbol: 'btc', name: 'Bitcoin', price: '30000'},
    2: {id: '2', symbol: 'eth', name: 'Ethereum', price: '1800'},
}

const TradeForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const test = useSelector(state => state.crypto)
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState()
    const [cryptoId, setCryptoId] = useState(1)
    const [bank, setBank] = useState("Cash (USD)")
    const [type, setType] = useState("buy")
    const [price, setPrice] = useState(10);

    const coin = coins[cryptoId].name.toLowerCase()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`

    useEffect(() => {
        dispatch(loadCrypto(test));
    }, [dispatch])

    useEffect(() => {
        axios.get(url).then((response) => {
            setPrice(response.data[coin].usd)
        }).catch((error) => {
            console.log(error)
        })
    }, [url])

    console.log("Form presubmit... ", test)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();

        if (!amount || typeof amount != "number") setErrors({amount: "Please enter an dollar amount you would like to trade (example: 100)"})

        formData.append('amount', amount);
        formData.append('user_id', user.id);
        formData.append('crypto_id', cryptoId);
        formData.append('price', price); //get current price
        formData.append('type', type);
        formData.append('quantity', (amount/price)); //amt / current price
        formData.append('credit', (type === "buy" ? coins[cryptoId].symbol : "cash"));
        formData.append('debit', (type === "sell" ? coins[cryptoId].symbol : "cash"));

        errors = await dispatch(postTransaction(formData))
        setAmount('')
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
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='$0'></input>
                    <div className="form-errors">
                        {errors.amount && <p>{errors.amount}</p>}
                    </div>
                </div>
                <div>
                    <label>{type === "buy" ? "Buy" : "Sell"}
                    <select
                        type='text'
                        value={cryptoId}
                        required
                        onChange={(e) => setCryptoId(e.target.value)}
                        placeholder='$0'>
                            {Object.values(coins).map(coin => (<option key={coin.id} value={coin.id}>{coin.name}</option>))}
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
                            {/* <option>Bank of Satoshi</option> */}
                    </select>
                    </label>
                </div>
                <button className="" type="submit">{type === "buy" ? `Buy ${coins[cryptoId].name}` : `Sell ${coins[cryptoId].name}`}</button>
            </form>
        </div>
    );
};

export default TradeForm;
