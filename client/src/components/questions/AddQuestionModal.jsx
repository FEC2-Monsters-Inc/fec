import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import fetcher from '../../fetchers/questions';

export default function AddQuestionModal({
  show,
  closeModal,
  product_id,
}) {
  const blankForm = {
    name: '',
    body: '',
    email: '',
  };
  const [addForm, setAddForm] = useState(blankForm);

  const close = (e) => {
    if ((e.type === 'click' && e.target.classList.contains('modal-close'))
      || e.key === 'Enter') {
      setAddForm(blankForm);
      closeModal(false);
    }
  };

  const handleChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    if (!product_id) {
      // THROW ERROR, SOMEHOW DOESN'T HAVE PRODUCT_ID ON SUBMIT
    } else {
      // FETCHER POST QUESTION
    }
  };

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [show]);

  if (!show) return null;
  return ReactDOM.createPortal((
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
          <form id="add-question-form" onSubmit={submitForm}>
            <div className="qa add-question">
              <label htmlFor="add-question-form">
                <div className="qa add-label">Question</div>
                <textarea
                  type="text"
                  name="body"
                  value={addForm.body}
                  onChange={handleChange}
                  maxLength="1000"
                  placeholder="Ask your question here"
                />
              </label>
            </div>
            <div className="qa add-personal">
              <div className="qa add-name">
                <label htmlFor="add-question-form">
                  <div className="qa add-label">Nickname</div>
                  <input
                    type="text"
                    name="name"
                    value={addForm.name}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder="Enter your nickname here"
                  />
                </label>
              </div>
              <div className="qa add-email">
                <label htmlFor="add-question-form">
                  <div className="qa add-label">Email</div>
                  <input
                    type="text"
                    name="email"
                    value={addForm.email}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder="Enter your email here"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="qa modal-footer">
          <button
            form="add-question-form"
            className="qa modal-btn modal-close"
            type="submit"
            tabIndex={0}
            onKeyUp={submitForm}
            onClick={submitForm}
          >
            Submit
          </button>
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
    </div>), document.getElementById('modal'));
}
