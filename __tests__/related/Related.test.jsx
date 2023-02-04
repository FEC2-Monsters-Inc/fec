import React from 'react';
import {
  render, screen, cleanup, fireEvent, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import fetcherMock from '../../client/src/fetchers';
import MockData from '../example_data/related/MockData';
import Related from '../../client/src/components/Related/Related.jsx';
import OutfitList from '../../client/src/components/Related/outfit-components/OutfitList.jsx';
import RelatedProduct from '../../client/src/components/Related/related-components/RelatedProduct.jsx';

jest.mock('../../client/src/fetchers');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Related & Outfit Component', () => {
  describe('Related Component', () => {
    test('should not render when fail fetch data', async () => {
      fetcherMock.getProductById
        .mockResolvedValueOnce(new Error('Error'))
        .mockResolvedValueOnce(new Error('Error'));

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureStyle });

      act(() => {
        render(<Related
          feature={MockData.feature}
          relatedIdList={[40344, 40346]}
        />);
      });

      await waitFor(() => expect(fetcherMock.getProductById).toHaveBeenCalledTimes(2));
    });

    test('should correctly render related component', async () => {
      fetcherMock.getProductById
        .mockResolvedValueOnce({ data: MockData.style_40344 })
        .mockResolvedValueOnce({ data: MockData.style_40346 });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureStyle });

      act(() => {
        render(<Related
          feature={MockData.feature}
          relatedIdList={[40344, 40346]}
        />);
      });

      await waitFor(() => expect(fetcherMock.getReviewMeta).toHaveBeenCalledTimes(1));
      const h3Element = screen.queryByText('RELATED PRODUCTS', { exact: false });
      expect(h3Element).toBeInTheDocument();
    });
  });

  describe('Outfit Component', () => {
    test('should correctly render with empty outfit list', () => {
      render(<OutfitList
        feature={MockData.feature}
        outfitIdList={[]}
      />);

      const imgElement = screen.queryByRole('img');
      expect(imgElement).not.toBeInTheDocument();
    });

    test('should correctly render with non-empty outfit list', async () => {
      // RELATED
      fetcherMock.getProductById
        .mockResolvedValueOnce({ data: MockData.rel_40346 });

      // RELATED LIST
      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureMeta });

      // RELATED PRODUCT
      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40346 });
      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.meta_40346 });

      // OUTFIT PRODUCT
      fetcherMock.getProductById
        .mockResolvedValueOnce({ data: MockData.feature });
      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.featureStyle });
      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureMeta });

      render(<Related
        feature={MockData.feature} // 40350
        relatedIdList={[40346]}
      />);

      const featureName = MockData.feature.name;

      const addElement = screen.getByTitle('outfit-add-icon');
      await userEvent.click(addElement);
      screen.debug(undefined, 15000);

      expect(await screen.findByText(featureName)).toBeInTheDocument();
    });
  });

  describe('RelatedProduct Component Fetch Fail', () => {
    test('should fail fetch data', async () => {
      fetcherMock.getProductStyle
        .mockResolvedValueOnce(new Error('Error'));

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce(new Error('Error'));

      act(() => {
        render(<RelatedProduct
          feature={MockData.feature}
          featureMeta={MockData.featureMeta}
          relProd={MockData.rel_40344}
        />);
      });

      const relatedImage = await screen.queryByAltText('Not Available', { exact: false });
      expect(relatedImage).not.toBeInTheDocument();
    });
  });

  describe('RelatedProduct Component Fetch Successfully', () => {
    beforeEach(async () => {
      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40344 });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.meta_40344 });

      act(() => {
        render(<RelatedProduct
          feature={MockData.feature}
          featureMeta={MockData.featureMeta}
          relProd={MockData.rel_40344}
        />);
      });
    });

    test('should correctly render related product image with correct alt text', async () => {
      const relatedImage = await screen.findByAltText('Not Available', { exact: false });
      expect(relatedImage).toBeInTheDocument();
    });

    test('should be able to show image carousel onMouseEnter', async () => {
      await screen.findByAltText('Not Available', { exact: false });

      act(() => {
        fireEvent.mouseOver(screen.getByRole('img'));
      });

      const allRelatedImages = await screen.findAllByRole('img');
      expect(allRelatedImages).toHaveLength(7);
    });

    test('should be able to open and close comparison modal', async () => {
      await screen.findByAltText('Not Available', { exact: false });

      // Expect only one image has been rendered
      expect(screen.getAllByRole('img')).toHaveLength(1);

      // Find the star icon by using getByTitle
      const starModalIcon = screen.getByTitle('star-modal-icon', { exact: false });

      // Use `queryBy` to avoid throwing an error with `getBy`
      expect(screen.queryByTitle('compare-test-title')).not.toBeInTheDocument();
      await userEvent.click(starModalIcon);

      // Expect the comparison table to be in the dom after click
      const thElement = screen.queryByRole('columnheader', {
        name: 'Blues Suede Shoes',
      });
      expect(thElement).toBeInTheDocument();

      // Expect there are exact three table head tags in DOM
      const allThElements = screen.getAllByRole('columnheader');
      expect(allThElements).toHaveLength(3);

      // Expect close icon to be in the DOM
      const closeModalIcon = screen.getByTitle('close-modal-icon', { exact: false });
      expect(screen.queryByTitle('close-modal-icon')).toBeInTheDocument();
      await userEvent.click(closeModalIcon);

      // Expect close icon to not be in the DOM after close it
      expect(screen.queryByTitle('close-modal-icon')).not.toBeInTheDocument();
    });

    test('should be able to click image and change related product', async () => {
      // await screen.findByAltText('Not Available', { exact: false });

      // act(() => {
      //   fireEvent.click(screen.getByRole('img'));
      // });

      // fetcherMock.getProductStyle
      //   .mockResolvedValueOnce({ data: MockData.style_40346 });

      // fetcherMock.getReviewMeta
      //   .mockResolvedValueOnce({ data: MockData.meta_40346 });

      // screen.debug();
    });
  });
});
