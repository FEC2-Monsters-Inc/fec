import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  render, screen, cleanup, waitFor, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import fetcherMock from '../../../fetchers';
import MockData from '../MockData';
import Related from '../Related.jsx';
import RelatedProduct from '../related-components/RelatedProduct.jsx';

jest.mock('../../../fetchers');
// jest.mock('axios');
beforeEach(() => jest.clearAllMocks());
afterEach(cleanup);

describe('Related & Outfit Component', () => {
  // let mock;

  // beforeAll(() => {
  //   mock = new MockAdapter(axios);
  // });

  // afterAll(() => {
  //   mock.reset();
  // });
  // let container;

  describe('RelatedProduct Component Jest Mock', () => {
    // beforeEach(() => {
    //   container = document.createElement('div');
    //   document.body.appendChild(container);
    // });

    // afterEach(() => {
    //   document.body.removeChild(container);
    //   container = null;
    // });

    test('should render correctly', async () => {
      // axios.all.mockResolvedValueOnce([
      //   { data: MockData.style_40345 },
      //   { data: MockData.meta_40345 },
      // ]);

      fetcherMock.related.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40345 });

      fetcherMock.related.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.meta_40345 });

      // jest.mock('axios');

      // act(() => {
      //   ReactDOM.createRoot(container).render(<RelatedProduct
      //     feature={MockData.feature}
      //     featureMeta={MockData.featureMeta}
      //     relProd={MockData.rel_40345}
      //   />);

      //   axios.all.mockResolvedValueOnce([
      //     { data: { data: MockData.style_40345 } },
      //     { data: { data: MockData.meta_40345 } },
      //   ]);
      // });

      // act(() => {
      //   ReactDOM.createRoot(container).render(<RelatedProduct
      //     feature={MockData.feature}
      //     featureMeta={MockData.featureMeta}
      //     relProd={MockData.rel_40345}
      //   />);
      // });
      render(<RelatedProduct
        feature={MockData.feature}
        featureMeta={MockData.featureMeta}
        relProd={MockData.rel_40345}
      />);

      // await axios.all();
      await waitFor(() => {
        screen.findByAltText("Where you're going you might not need roads");
      });
      screen.logTestingPlaygroundURL();
      // fetcherMock.related.getProductStyle(40345).mockResolvedValueOnce({ data: })
    });
  });

  describe('Related Component', () => {
    // test('should return correct result for the API mock ', async () => {
    //   mock.onGet(`${BASEURL}/products/40350`).reply(200, MockData.feature);
    //   const result = await fetcher.getProductById(40350);
    //   expect(result.data).toEqual(MockData.feature);
    // });

    // test('should correctly render two header', async () => {
    //   mock.onGet(`${BASEURL}/products/40350/related`).reply(200, MockData.relatedList);
    //   await fetcher.related.getRelatedProduct(40350);

    //   // const relatedList = result.data;

    //   mock.onGet(`${BASEURL}/reviews/meta`, {
    //     params: {
    //       product_id: 40350,
    //     },
    //   }).reply(200, MockData.featureMeta);
    //   await fetcher.related.getReviewMeta(40350);

    //   mock.onGet(`${BASEURL}/products/40350/styles`).reply(200, MockData.featureStyle);
    //   await fetcher.related.getProductStyle(40350);

    //   mock.onGet(`${BASEURL}/reviews/meta`, {
    //     params: {
    //       product_id: 40344,
    //     },
    //   }).reply(200, MockData.meta_40344);
    //   await fetcher.related.getReviewMeta(40344);

    //   mock.onGet(`${BASEURL}/reviews/meta`, {
    //     params: {
    //       product_id: 40345,
    //     },
    //   }).reply(200, MockData.meta_40345);
    //   await fetcher.related.getReviewMeta(40345);

    //   mock.onGet(`${BASEURL}/reviews/meta`, {
    //     params: {
    //       product_id: 40346,
    //     },
    //   }).reply(200, MockData.meta_40346);
    //   await fetcher.related.getReviewMeta(40346);
    //   act(() => render(<Related feature={MockData.feature} />));
    //   // const headerElement = screen.getAllByRole('heading');
    //   // expect(headerElement.length).toBe(2);
    //   screen.debug();
    // });
  });
});
