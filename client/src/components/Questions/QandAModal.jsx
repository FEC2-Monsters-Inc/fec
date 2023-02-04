import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import fetcher from '../../fetchers';

export default function QandAModal({
  type,
  show,
  setShowModal,
  product_id,
  question_id,
}) {
  const blankForm = {
    name: '',
    body: '',
    email: '',
    photos: [],
  };
  const [addForm, setAddForm] = useState(blankForm);

  const close = (e) => {
    if ((e.type === 'click' && e.target.classList.contains('modal-close'))
      || e.key === 'Enter') {
      setAddForm(blankForm);
      setShowModal(false);
    }
  };

  const handleChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (e.type === 'click' || e.key === 'Enter') {
      if (!product_id) {
        // THROW ERROR, SOMEHOW DOESN'T HAVE PRODUCT_ID ON SUBMIT
      }
      switch (type) {
        case 'question':
          fetcher
            .postQuestion({ ...addForm, product_id })
            .catch((err) => console.error('postQuestion: ', err));
          break;
        case 'answer':
          fetcher
            .postAnswer({ ...addForm, question_id }, question_id)
            .catch((err) => console.error('postAnswer: ', err));
          break;
        default:
          break;
      }
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
      {/* TODO escape key */}
      <div className="qa modal-fg">
        <div className="qa modal-header">
          <h4 className="qa modal-title">
            {type === 'question' ? 'Ask your Question' : 'Submit your Answer'}
          </h4>
          {/* TODO: add subtitle 'About the [Product Name Here]' */}
          {/* TODO: add subtitle (for answer) '[Product Name]: [Question Body]' */}
        </div>
        <div className="qa modal-body">
          <form id={`add-${type}-form`} onSubmit={submitForm}>
            <div className="qa add-body">
              <label className="qa add-label" htmlFor={`${type}-bodybox`}>
                {type === 'question' ? 'Question' : 'Answer'}
                <textarea
                  type="text"
                  id={`${type}-bodybox`}
                  name="body"
                  form={`add-${type}-form`}
                  value={addForm.body}
                  onChange={handleChange}
                  maxLength="1000"
                />
              </label>
            </div>
            <div className="qa add-personal">
              <div className="qa add-nickname">
                <label className="qa add-label" htmlFor="nicknamebox">
                  Nickname
                  <input
                    type="text"
                    id="nicknamebox"
                    name="name"
                    form={`add-${type}-form`}
                    value={addForm.name}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder={type === 'question'
                      ? 'Example: jackson11!'
                      : 'Example: jack543!'}
                  />
                </label>
              </div>
              <div className="qa add-email">
                <label className="qa add-label" htmlFor={`${type}-emailbox`}>
                  Email
                  <input
                    type="text"
                    id={`${type}-emailbox`}
                    name="email"
                    form={`add-${type}-form`}
                    value={addForm.email}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder={type === 'question'
                      ? 'Why did you like the product or not?'
                      : 'Example: jack@email.com'}
                  />
                </label>
              </div>
            </div>
            {type === 'answer' ? (
              <div className="qa add-photos">
                <button
                  form="add-answer-form"
                  className="qa modal-btn"
                  type="button"
                  tabIndex={0}
                // onKeyUp={}
                // onClick={}
                >
                  Choose Photo
                </button>
              </div>
            ) : null}
          </form>
        </div>
        <div className="qa modal-footer">
          <button
            form={`add-${type}-form`}
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
