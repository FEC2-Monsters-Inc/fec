import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedList({ relatedList }) {
  console.log(relatedList);
  return (
    <div>
      {relatedList.map(product => <RelatedProduct key={product.id} product={product} />)}
    </div>
  );
}
