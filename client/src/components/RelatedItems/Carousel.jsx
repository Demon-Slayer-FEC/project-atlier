import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ItemsList from './ItemsList';
import OutfitList from './OutfitList';
import itemStyles from './Items.module.css';
import { newRelatedCarouselIndex, newOutfitCarouselIndex } from '../../features/related/relatedSlice';

function Carousel() {
  const {
    relatedIndex,
    related,
    outfitIndex,
    outfitList,
  } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  function nextSlide(relatedList) {
    if (relatedList) {
      dispatch(newRelatedCarouselIndex(relatedIndex === related.length - 1 ? 0 : relatedIndex + 1));
      return;
    }
    dispatch(newOutfitCarouselIndex(outfitIndex === outfitList.length - 1 ? 0 : outfitIndex + 1));
  }

  function prevSlide(relatedList) {
    if (relatedList) {
      dispatch(newRelatedCarouselIndex(relatedIndex === 0 ? related.length - 1 : relatedIndex - 1));
      return;
    }
    dispatch(newOutfitCarouselIndex(outfitIndex === 0 ? outfitList.length - 1 : outfitIndex - 1));
  }

  // Re-renders outfit list when a user deletes an item
  useEffect(() => {
    dispatch(newOutfitCarouselIndex(outfitIndex > 0 ? outfitIndex - 1 : outfitIndex));
  }, [outfitList]);

  return (
    <div className={`${itemStyles['items-all']}`}>
      <div className={`${itemStyles['items-list-container']} ${itemStyles['items-list-related']}`}>
        {relatedIndex >= 1 && <FaChevronLeft className={itemStyles['left-arrow']} onClick={() => prevSlide('related')} />}

        <ItemsList relatedIndex={relatedIndex} />

        {(related.length >= 5 && relatedIndex !== related.length - 5)
        && <FaChevronRight className={itemStyles['right-arrow']} onClick={() => nextSlide('related')} />}
      </div>
      <div className={`${itemStyles['items-list-container']} ${itemStyles['items-list-outfit']}`}>
        {outfitIndex >= 1 && <FaChevronLeft className={itemStyles['left-arrow']} onClick={() => prevSlide()} />}

        <OutfitList outfitIndex={outfitIndex} />

        {(outfitList.length > 4 && outfitIndex !== outfitList.length - 4)
        && <FaChevronRight className={itemStyles['right-arrow']} onClick={() => nextSlide()} />}
      </div>
    </div>
  );
}

export default Carousel;
