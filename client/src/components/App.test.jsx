/* eslint-disable camelcase */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import Related from './related/Related.jsx';
import App from './App.jsx';
import {
  BASE_URL, fetchProductsById, fetchProductStyle, fetchReviewMeta,
} from '../../../util';
import RelatedList from './related/related-components/RelatedList.jsx';
import RelatedProduct from './related/related-components/RelatedProduct.jsx';

afterEach(cleanup);

describe('app', () => {
  const feature = {
    id: 40350,
    campus: 'hr-rfp',
    name: 'Blues Suede Shoes',
    slogan: '2019 Stanley Cup Limited Edition',
    description: 'Touch down in the land of the Delta Blues in the middle of the pouring rain',
    category: 'Dress Shoes',
    default_price: '120.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
      },
      {
        feature: 'Material',
        value: 'FullControlSkin',
      },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
      },
    ],
  };

  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterAll(() => {
    mock.reset();
  });

  test('should initial the app with Hello text', () => {
    render(<App />);
    const appElement = screen.getByText('HELLO');
    expect(appElement).toBeInTheDocument();
  });

  describe('test for mock axios resolve/reject', () => {
    test('should mock response for the axios get request for products', async () => {
      mock.onGet(`${BASE_URL}/products/:product_id`).reply(200, feature);
      const result = await fetchProductsById(40350);
      expect(result.data).toEqual(feature);
    });

    // test('should return empty array when axios request fails', async () => {
    //   mock.onGet(`${BASE_URL}/products/:product_id`).networkErrorOnce();
    //   const result = await fetchProductsById();
    //   expect(result).toEqual([]);
    // });
  });

  test('should render the two headers correctly', () => {
    const { container } = render(<Related feature={feature} />);

    const relatedHeader = screen.getByRole('heading', {
      name: 'RELATED PRODUCTS',
    });
    expect(relatedHeader).toBeInTheDocument();

    const outfitHeader = screen.getByRole('heading', {
      name: 'OUTFIT PRODUCTS',
    });
    expect(outfitHeader).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('should render correct related list', () => {
    const relatedList = [
      {
        id: 40345,
        campus: 'hr-rfp',
        name: 'Bright Future Sunglasses',
        slogan: "You've got to wear shades",
        description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        category: 'Accessories',
        default_price: '69.00',
        created_at: '2021-08-13T14:38:44.509Z',
        updated_at: '2021-08-13T14:38:44.509Z',
        features: [
          {
            feature: 'Lenses',
            value: 'Ultrasheen',
          },
          {
            feature: 'UV Protection',
            value: null,
          },
          {
            feature: 'Frames',
            value: 'LightCompose',
          },
        ],
      },
    ];

    const { container } = render(<RelatedList feature={feature} relatedList={relatedList} />);
    expect(container).toMatchSnapshot();
  });

  test('should correctly render related product', async () => {
    const relProd = {
      id: 40345,
      campus: 'hr-rfp',
      name: 'Bright Future Sunglasses',
      slogan: "You've got to wear shades",
      description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      category: 'Accessories',
      default_price: '69.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Lenses',
          value: 'Ultrasheen',
        },
        {
          feature: 'UV Protection',
          value: null,
        },
        {
          feature: 'Frames',
          value: 'LightCompose',
        },
      ],
    };

    const relatedStyle = {
      product_id: '40345',
      results: [
        {
          style_id: 240506,
          name: 'Black Lenses & Black Frame',
          original_price: '69.00',
          sale_price: null,
          'default?': false,
          photos: [
            {
              thumbnail_url: null,
              url: null,
            },
          ],
          skus: {
            null: {
              quantity: null,
              size: null,
            },
          },
        },
        {
          style_id: 240507,
          name: 'Black Lenses & Gold Frame',
          original_price: '69.00',
          sale_price: null,
          'default?': true,
          photos: [
            {
              thumbnail_url: null,
              url: null,
            },
          ],
          skus: {
            null: {
              quantity: null,
              size: null,
            },
          },
        },
        {
          style_id: 240508,
          name: 'Gold Lenses & Black Frame',
          original_price: '69.00',
          sale_price: null,
          'default?': false,
          photos: [
            {
              thumbnail_url: null,
              url: null,
            },
          ],
          skus: {
            null: {
              quantity: null,
              size: null,
            },
          },
        },
        {
          style_id: 240509,
          name: 'Gold Lenses & Gold Frame',
          original_price: '69.00',
          sale_price: null,
          'default?': false,
          photos: [
            {
              thumbnail_url: null,
              url: null,
            },
          ],
          skus: {
            null: {
              quantity: null,
              size: null,
            },
          },
        },
      ],
    };
    mock.onGet(`${BASE_URL}/products/:product_id/styles`).reply(200, relatedStyle);
    const resultStyle = await fetchProductStyle(40350);
    expect(resultStyle.data).toEqual(relatedStyle);

    const relatedReviewMeta = {
      product_id: '40345',
      ratings: {
        1: '5',
        2: '4',
        3: '8',
        4: '28',
        5: '24',
      },
      recommended: {
        false: '26',
        true: '43',
      },
      characteristics: {
        Quality: {
          id: 135223,
          value: '3.5000000000000000',
        },
      },
    };
    mock.onGet(`${BASE_URL}/reviews/meta`, {
      params: {
        product_id: 40345,
      },
    }).reply(200, relatedReviewMeta);
    const resultMeta = await fetchReviewMeta(40345);
    expect(resultMeta.data).toEqual(relatedReviewMeta);

    const featureMeta = {
      product_id: '40350',
      ratings: {
        1: '6',
        2: '5',
        3: '11',
        4: '14',
        5: '17',
      },
      recommended: {
        false: '12',
        true: '41',
      },
      characteristics: {
        Size: {
          id: 135240,
          value: '2.7708333333333333',
        },
        Width: {
          id: 135241,
          value: '2.9791666666666667',
        },
        Comfort: {
          id: 135242,
          value: '3.5000000000000000',
        },
        Quality: {
          id: 135243,
          value: '3.4468085106382979',
        },
      },
    };
    mock.onGet(`${BASE_URL}/reviews/meta`, {
      params: {
        product_id: 40350,
      },
    }).reply(200, featureMeta);
    const featureResultMeta = await fetchReviewMeta(40350);
    expect(featureResultMeta.data).toEqual(featureMeta);

    const { container } = render(<RelatedProduct feature={feature} relProd={relProd} />);
    expect(container).toMatchSnapshot();
  });
});
