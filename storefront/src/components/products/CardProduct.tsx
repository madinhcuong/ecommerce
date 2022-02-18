import React, { ReactNode, FC, memo } from "react";
import { Images, Links } from "../../constants";

interface IProps {
  children: ReactNode;
}

const CardProduct: FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="card-product">
      <div className="image">
        <img src="/images/home/product/ip.jpg" alt="product" />
      </div>

      <div>iPhone 12 Pro Max 128GB</div>
      <div>Online giá rẻ</div>
      <div>30.990.000đ</div>
      <div>400.000₫</div>
      <div>Tặng PMH 2 triệu, Trả góp 0% đến 24 tháng</div>
    </div>

  );
};

export default memo(CardProduct);
