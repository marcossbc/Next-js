import React from "react";

interface ProductsDetailsProps {
  params: {
    id: string;
  };
}

const ProductsDetails = ({ params }: ProductsDetailsProps) => {
  return (
    <div>
      Product ID: {params.id}
    </div>
  );
};

export default ProductsDetails;