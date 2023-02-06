import React, { useState, useRef } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { IoCloseCircleSharp } from 'react-icons/io5';
import prettyBytes from 'pretty-bytes';
import fetcher from '../../fetchers';

function PhotoInput({
  setPhotos,
}) {
  const MAX_PHOTOS = 5;
  const photoInput = useRef([]);
  const keyTracker = useRef(0);
  const [files, setFiles] = useState([]);

  const choosePhoto = (i) => {
    keyTracker.current += 1;
    photoInput.current[i].click();
  };

  const handleChange = (e, i) => {
    if (files.length) {
      const copy = [...files];
      copy.splice(i, 1, e.target.files[0]);
      setFiles(copy);
    } else {
      setFiles([...files, ...e.target.files]);
    }
  };

  const removeFile = (i) => {
    const copy = [...files];
    copy.splice(i, 1);
    setFiles(copy);
  };

  const getImageUrls = () => {
    console.log('files', files);
    fetcher.fetchImageUrls(files)
      .then((results) => {
        console.log(results);
      }).catch((err) => console.error(err));
  };

  return (
    <div className="qa add-photos">
      {files.map((file, i) => (
        <div
          // Exception: Items will never change order, no valid ID.
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}_${file.name}`}
          className="qa user-photo"
        >
          <IoCloseCircleSharp
            height="100"
            width="100"
            className="qa remove-btn"
            aria-label="remove photo"
            onClick={() => removeFile(i)}
          />
          <div
            role="button"
            tabIndex={0}
            onKeyUp={() => choosePhoto(i)}
            onClick={() => choosePhoto(i)}
          >
            <img
              className="qa photo-sml"
              alt={`Your photo ${i}`}
              src={URL.createObjectURL(file)}
            />
          </div>
          <input
            ref={(element) => { photoInput.current[i] = element; }}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, i)}
            style={{ display: 'none' }}
            capture="environment"
          />
          {/* TODO: truncate long file names but keep extension */}
          <span className="qa photo-info">
            <span>{`${file.name} `}</span>
            <span>{prettyBytes(file.size, { space: false })}</span>
          </span>
        </div>
      ))}
      {files.length < MAX_PHOTOS ? (
        <div className="qa add-photo-row">
          <button
            form="add-answer-form"
            id="answer-photo-upload"
            className="qa modal-btn"
            type="button"
            tabIndex={0}
            onKeyUp={() => choosePhoto(files.length)}
            onClick={() => choosePhoto(files.length)}
          >
            <HiOutlinePhoto />
            <span className="qa modal-btn-text">Choose photo</span>
          </button>
          <input
            ref={(element) => { photoInput.current[files.length] = element; }}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, files.length)}
            style={{ display: 'none' }}
            capture="environment"
          />
        </div>
      ) : null}
      <button onClick={() => getImageUrls()}>test</button>
    </div>
  );
}

export default PhotoInput;
