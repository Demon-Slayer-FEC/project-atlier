import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFirstProductQuery } from '../../features/api/apiSlice';

function Spinner() {
  const navigate = useNavigate();

  const { data: products, isSuccess, isError } = useGetFirstProductQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${products[0].id}`);
    }
  }, [isSuccess]);

  if (isError) {
    return (
      <div>404 Not Found!</div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
}

export default Spinner;
