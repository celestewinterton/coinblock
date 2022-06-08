import { useState } from "react";
import { Modal } from '../../../context/Modal'
import TradeForm from "../TradeForm";

function TradeFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='button' onClick={() => setShowModal(true)}>Buy / Sell</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TradeForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default TradeFormModal;
