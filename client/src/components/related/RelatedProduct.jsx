import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';

export default function RelatedProduct({ product }) {

  const [image, setImage] = useState();

  useEffect(() => {
    fetcher.related.getProductStyle(product.id)
      .then(({ data }) => setImage(data.results[0]))
      .catch(err => console.log(err));
  }, []);

  // TODO: FIX NO IMAGE LATER
  if (!image || !image.photos[0].thumbnail_url) {
    return <div></div>;
  }

  return (
    <div className="related-item">
      <img src={image.photos[0].thumbnail_url} id="related-img" />
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>{product.slogan}</div>
      {image.sale_price && <div>{'$' + image.sale_price}</div>}
      <div>{'$' + image.original_price}</div>
    </div>
  );
}