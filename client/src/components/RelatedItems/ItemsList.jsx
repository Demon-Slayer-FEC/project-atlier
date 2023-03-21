import React, { useState } from 'react';
import FormatCard from './FormatCard';
import StarRating from '../ReviewsRatings/StarRating';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ItemsList = function ({ relatedIndex, itemStyles }) {
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  const findImage = function(item) {
    for (let i = 0; i < item.photos.results.length; i++) {
      const style = item.photos.results[i];
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  };

  // ATTEMPTED REFACTOR, DOES NOT WORK
  // const findImage = function (item) {
  //   for (let i = 0; i < item.photos.results.length; i++) {
  //     const style = item.photos.results[i];
  //     return style.photos.find(photo => photo.thumbnail_url);
  //   };
  // };

  const renderList = function (item, index) {
    // const maxLength = relatedProducts.length;
    console.log('relatedIndex ItemsList: ', relatedIndex);
    console.log('index ItemsList: ', index);
    return (
      <div>
        {relatedIndex <= index && (
          <FormatCard
            key={index}
            stars={StarRating}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            itemStyles={itemStyles}
          />
        )}
      </div>
    );
  };

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <div className={itemStyles['items-list-wrapper']}>
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list-content']}>
        {relatedProducts.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default ItemsList;
