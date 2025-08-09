import { useEffect } from "react";
import useLoadProducts from "../../hooks/useLoadProducts";
import TitleCentral from "./title-central";
import ProductCard from "./product-card";

const ProductsArchive = () => {
  const { products, loadProducts } = useLoadProducts();
  useEffect(() => {
    loadProducts();
  }, []);
  return products?.length ? (
    <div>
      <div className="py-10">
        <TitleCentral
          title={"جدیدترین محصولات"}
          class={"text-size24 text-neutral-600 font-weight300 text-nowrap"}
        ></TitleCentral>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: any, index: any) => {
          return <ProductCard key={index} product={product}></ProductCard>;
        })}
      </div>
    </div>
  ) : null;
};
export default ProductsArchive;
