import React, { useEffect } from 'react';

export default function AddQuestionModal({
  show,
  closeModal,
}) {
  const close = (e) => {
    if ((e.type === 'click' && e.target.classList.contains('modal-close'))
    || e.key === 'Enter') {
      closeModal(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [show]);

  if (!show) return null;
  return (
  // Reason: There exists an accessible button to close the modal.
    /*  eslint-disable-next-line
        jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */
    <div className="qa modal-bg modal-close" onClick={close}>
      <div className="qa modal-fg">
        <div className="qa modal-header">
          <h4 className="qa modal-title">Add a Question</h4>
        </div>
        <div className="qa modal-body">
          Content
        </div>
        <div className="qa modal-footer">
          <button
            className="qa modal-btn modal-close"
            type="button"
            tabIndex={0}
            onKeyUp={close}
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
