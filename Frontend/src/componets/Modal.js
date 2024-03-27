import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setModalOpen(false);
    navigate('/signin'); // Navigate to the signin route
  };

  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button>
          <div className="modal-content">Are you sure you want to log out?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="logOutBtn" onClick={handleLogout}>
                Log Out
              </button>
              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

