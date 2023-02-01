import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Share() {
  return (
    <div className="share">
      <FaFacebookF size="2em" className="social facebook" />
      <FaTwitter size="2em" className="social twitter" />
      <FaPinterestP size="2em" className="social pinterest" />
    </div>
  );
}
