import React, { useState, useEffect } from 'react';

export default function CompareModal({ setShowModal }) {
  return (
    <div>
      <button onClick={() => setShowModal(false)}>Close Compare</button>
    </div>
  );
}