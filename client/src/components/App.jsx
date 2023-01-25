import React, { useState, useEffect } from 'react';

import Overview from './overview/Overview.jsx';
import QandA from './qanda/QandA.jsx';
import RandR from './randr/RandR.jsx';
import Related from './related/Related.jsx';

export default function App() {

  return (
    <div>
      Hello World!
      <Overview />
      <Related />
      <QandA />
      <RandR />
    </div>
  );
}