import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { postTransaction } from "../../../store/transactions";
import axios from "axios"
import { loadCrypto } from "../../../store/crypto";
import { currency, round } from "../../../utils/calc";
import { authenticate } from "../../../store/session"

// Dummy Data...
// const coins = {
//     1: {id: '1', symbol: 'btc', name: 'Bitcoin', price: '30000'},
//     2: {id: '2', symbol: 'eth', name: 'Ethereum', price: '1800'},
// }

const TradeForm = ({showModal, setShowModal}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const coins = useSelector(state => state.crypto)
    const ownedCoins = Object.values(coins).filter(coin => Object.keys(user.balances).includes(`${coin.id}`))
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState()
    const [cryptoId, setCryptoId] = useState(1)
    const [bank, setBank] = useState("Cash (USD)")
    const [type, setType] = useState("buy")
    const [price, setPrice] = useState(10);


    useEffect(() => {
        dispatch(loadCrypto());
    }, [dispatch])

    const coin = coins[cryptoId]?.name.toLowerCase()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`

    useEffect(() => {
        axios.get(url).then((response) => {
            setPrice(response.data[coin].usd)
        }).catch((error) => {
            console.log(error)
        })
    }, [url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('user_id', user.id);
        if (type !== "transfer") formData.append('crypto_id', cryptoId)
        formData.append('price', price); //get current price
        formData.append('type', type);
        formData.append('quantity', (type === "sell" ? -amount/price : type === "buy" ? amount/price : amount)); //amt / current price
        formData.append('credit', (type === "buy" ? coins[cryptoId].symbol : "cash"));
        formData.append('debit', (type === "sell" ? coins[cryptoId].symbol : type === "transfer" ? "bank" : "cash"));

        errors = await dispatch(postTransaction(formData))
        if (errors) {
            setErrors(errors.errors)
            return
        }

        await dispatch(authenticate());
        setErrors({})
        setAmount('')
        if (showModal) setShowModal(false)
    }

    useEffect(() => {
        setErrors(errors)
    }, [errors]);

    // Cases to control for...
    // user can't sell crypto they don't own (filter dropdown list)
    // user can only buy up to their buying power, then show errors!!
    // add num validation so users can't enter negatives
    // for Add Funds, should there be a way to transfer out too??

    return (
        <div className="transaction-form-container column">
            <div className="row">
                <NavLink to="#" className="buy-tab" style={type === "buy" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("buy")}>Buy</NavLink>
                <NavLink to="#" className="sell-tab" style={type === "sell" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("sell")}>Sell</NavLink>
                <NavLink to="#" className="fund-tab" style={type === "transfer" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("transfer")}>Add Funds</NavLink>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>{type === "transfer" ? null : `Current Price: ${currency(price)}`}</div>
                <div>{type === "sell" ? `${coins[cryptoId]?.name} qty: ${round(user.balances[cryptoId])}, value: ${currency(user.balances[cryptoId]*price)}` : `Cash Balance: ${currency(user.balances.cash)}`}</div>
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
                    {type != "transfer" &&
                    <label>{type === "buy" ? "Buy" : "Sell"}
                    <select
                        type='text'
                        value={cryptoId}
                        required
                        onChange={(e) => setCryptoId(e.target.value)}
                        placeholder='$0'>
                            {type === "buy" ? Object.values(coins).map(coin => (<option key={coin.id} value={coin.id}>{coin.name}</option>))
                            : Object.values(ownedCoins).map(coin => (<option key={coin.id} value={coin.id}>{coin.name}</option>))}
                    </select>
                    </label>}
                    {type === "transfer" &&
                    <label>From
                    <select
                        type='text'
                        value={cryptoId}
                        required
                        onChange={(e) => setBank(e.target.value)}>
                            <option key="bank1" value="Bank of Satoshi">Bank of Satoshi</option>
                            <option key="bank2" value="Bank of America">Bank of America</option>
                            <option key="bank3" value="Chase">Chase</option>
                    </select>
                    </label>}
                </div>
                <div>
                    <label>{type === "buy" ? "Pay with" : "Add to"}
                    <select
                        type='text'
                        required>
                            <option>Cash (USD)</option>
                    </select>
                    </label>
                </div>
                <button className="wide top-margin" type="submit">{type === "transfer" ? "Deposit Funds" : type === "buy" ? `Buy ${coins[cryptoId]?.name}` : `Sell ${coins[cryptoId]?.name}`}</button>
            </form>
            {true && <form></form>}
        </div>
    );
};

export default TradeForm;
