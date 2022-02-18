import React, { ReactNode, FC, memo, useMemo } from "react";
import Link from "next/link";
import { Rate } from 'antd';
import { Images, Links } from "../../constants";
import Image from "../images/Image";
import { productHome } from "../../data"

interface IProps {
	children?: ReactNode;
}

const IndexProduct: FC<IProps> = (props) => {
	const { children } = props;

	const array = Array.from(Array(4).keys());

	const RenderProduct = useMemo(() => {
		return productHome.products.map((product, key) => (
			<div className="product-container">
				<Link href={Links.Logo}>
					<a>
						<div className="image">
							<Image src={product.image} alt="logo" />
						</div>
						<div className="brand-name">
							{product.brand_name}
						</div>
						<div className="name">
							{product.name}
						</div>
						<div className="rating">
							<Rate disabled defaultValue={product.rating} />
						</div>
						<div className="original-price">
							{product.original_price} đ
						</div>
						<div className="sale-off-price-group">
							<div className="price">
								{product.sale_off_price} đ
							</div>
							<div className="percent">
								{product.percent} %
							</div>
						</div>
					</a>
				</Link>
			</div>
		))
	}, [array]);

	return (
		<>
			<div style={{ display: "flex" }}>
				{RenderProduct}
			</div>
		</>
	);
};

export default memo(IndexProduct);