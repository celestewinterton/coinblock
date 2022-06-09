import { useState } from "react";
import { Modal } from '../../../context/Modal'
import TradeForm from "../TradeForm";

function TradeFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='button trade-modal-button' onClick={() => setShowModal(true)}>Buy / Sell</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TradeForm showModal={showModal} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default TradeFormModal;
