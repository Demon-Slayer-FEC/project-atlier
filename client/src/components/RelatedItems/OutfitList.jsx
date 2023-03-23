import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newOutfitList, newAddToOutfit } from '../../features/related/relatedSlice';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import FormatCard from './FormatCard';
import itemStyles from './Items.module.css';

function OutfitList({ relatedIndex }) {
  const dispatch = useDispatch();

  // Compiles current object data
  const { outfitList } = useSelector((state) => state.related);
  const { selectedStyle, details } = useSelector((state) => state.products);
  const { meta } = useSelector((state) => state.reviews);
  const currentProduct = { details, selectedStyle, meta };

  function handleAddToOutfit(productData) {
    if (!JSON.parse(localStorage.getItem(productData.details.id))) {
      dispatch(newAddToOutfit(productData));
    }
    dispatch(newOutfitList());
    return (
      <div>Item already in outfit</div>
    );
  }

  function findImage(item) {
    for (let i = 0; i < item.selectedStyle.photos.length; i++) {
      const stylePhoto = item.selectedStyle.photos[i];
      if (stylePhoto.thumbnail_url) {
        return stylePhoto.thumbnail_url;
      }
    }
  }

  function renderList(item, index) {
    return (
      <div key={index}>
        {relatedIndex <= index && (
          <FormatCard
            stars={<QuarterStarsAverageRating productRating={item.meta.ratings} />}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            itemStyles={itemStyles}
          />
        )}
      </div>
    );
  }

  return (
    <div className={itemStyles['items-list-wrapper']}>
      <span className={itemStyles['items-list-title']}>Outfit List</span>
      <div className={itemStyles['items-list-content']}>
        <div className={itemStyles['items-card']} onClick={() => handleAddToOutfit(currentProduct)}>
          <span>Add to outfit</span>
        </div>
        {outfitList.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
}

export default OutfitList;
