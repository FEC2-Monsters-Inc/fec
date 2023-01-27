import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';

export default function RelatedProduct({ product }) {

  const [image, setImage] = useState();

  useEffect(() => {
    fetcher.related.getProductStyle(product.id)
      .then(({ data }) => {
        console.log(data.results);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(image);
  return (
    <div>
      {/* {!!image && <img src={image.thumbnail_url} />} */}
      Related Proudct
    </div>
  );
}