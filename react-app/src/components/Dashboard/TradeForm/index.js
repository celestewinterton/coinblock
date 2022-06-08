import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

const TradeForm = ({setShowModal}) => {
    // const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({});
    const [name, setName] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let errors;
        // const formData = new FormData();
        // formData.append('name', name)
        // formData.append('owner_id', user.id)
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
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder='$0'></input>
                    </div>
                      <button id='create-channel' className="green-button" type="submit">Save</button>
            </form>
        </>
    );
};

export default TradeForm;
