const Modal = ({ onClick }) => {
    return (
        <dialog id="modal" className="modal">
            <h2>Hey duelist,</h2>
            <p>The goal of the game is to click each card just once. Good luck and choose wisely!</p>
            <button className='btn close-btn' onClick={onClick}>OK</button>
        </dialog>
    )
}

export default Modal