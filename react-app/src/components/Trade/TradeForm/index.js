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
    const [amount, setAmount] = useState('')
    const [cryptoId, setCryptoId] = useState(1)
    const [bank, setBank] = useState("Cash (USD)")
    const [type, setType] = useState("buy")
    const [price, setPrice] = useState(10);

    // Warning: Can't perform a React state update on an unmounted component.
    // This is a no-op, but it indicates a memory leak in your application.
    // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    useEffect(() => {
        dispatch(loadCrypto());
    }, [dispatch])

    const coin = coins[cryptoId]?.apiId
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
    // user can only buy up to their buying power, then show errors!!
    // for Add Funds, should there be a way to transfer out too??

    return (
        <div className="transaction-form-container column">
            <div className="row">
                <NavLink to="#" className="buy-tab" style={type === "buy" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("buy")}>Buy</NavLink>
                <NavLink to="#" className="sell-tab" style={type === "sell" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("sell")}>Sell</NavLink>
                <NavLink to="#" className="fund-tab" style={type === "transfer" ? {color: "#0052FF", borderBottom: "none"} : null} onClick={e => setType("transfer")}>Add Funds</NavLink>
            </div>
            <form className="center column trade-form" autoComplete="off" onSubmit={handleSubmit}>
                <div className="amount-input-container">
                    <label className="row amount-label" >$
                    <input
                        className="amount-input"
                        // width={`${2 * 10}px`}
                        type='text'
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='0'></input>
                    <div className="form-errors">
                        {errors.amount && <p>{errors.amount}</p>}
                    </div>
                    </label>
                </div>
                <div className="muted1">{type === "transfer" ? null : `1 ${coins[cryptoId]?.symbol.toUpperCase()} ≈ ${currency(price)}`}</div>
                <div className="muted1">Your current cash balance is {currency(user.balances.cash)}</div>
                <div className="select-inputs">
                    {type !== "transfer" &&
                    <div className="select-field">
                        <label className="muted1">{type === "buy" ? "Buy" : "Sell"}</label>
                        <select
                            type='text'
                            value={cryptoId}
                            required
                            onChange={(e) => setCryptoId(e.target.value)}
                            placeholder='$0'>
                                {type === "buy" ? Object.values(coins).map(coin => (<option key={coin.id} value={coin.apiId}>{coin.name}</option>))
                                : Object.values(ownedCoins).map(coin => (<option key={coin.id} value={coin.id}>{coin.name}</option>))}
                        </select>
                        </div>}
                    {type === "transfer" &&
                    <div className="select-field">
                        <label className="muted1">From</label>
                        <select
                            type='text'
                            value={cryptoId}
                            required
                            onChange={(e) => setBank(e.target.value)}>
                                <option key="bank1" value="Bank of Satoshi">Bank of Satoshi</option>
                                <option key="bank2" value="Bank of America">Bank of America</option>
                                <option key="bank3" value="Chase">Chase</option>
                        </select>
                    </div>}
                    <div className="select-field-last">
                        <label className="muted1">{type === "buy" ? "Pay with" : "Add to"}</label>
                        <select
                            type='text'
                            required>
                                <option>Cash (USD)</option>
                        </select>
                    </div>
                </div>
                <button className="wide top-margin large-button" type="submit">{type === "transfer" ? "Deposit Funds" : type === "buy" ? `Buy ${coins[cryptoId]?.name}` : `Sell ${coins[cryptoId]?.name}`}</button>
                {type !== "transfer" && <div className="top-margin muted1 row space-between">
                    <div>{coins[cryptoId]?.symbol.toUpperCase()} balance</div>
                    <div>{user.balances[cryptoId] ? round(user.balances[cryptoId]) : 0} {coins[cryptoId]?.symbol.toUpperCase()} ≈ {user.balances[cryptoId] ? currency(user.balances[cryptoId]*price) : "$0"}</div>
                </div>}
            </form>
        </div>
    );
};

export default TradeForm;
