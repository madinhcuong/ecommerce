import React, { memo, FC, useMemo } from "react";
import { Row } from "antd";
import { CardProduct } from "../../components";

interface IProps { }

const SaleProduct: FC<IProps> = (props) => {
    const { } = props;

    const array = Array.from(Array(4).keys());

    const RenderCardProduct = useMemo(() => {
        return array.map((ele, key) => {
            return <CardProduct children={""} key={key} />;
        });
    }, [array]);

    return (
        <div className="sale-product">
            <div className="sale-title">Săn Sale Online Mỗi Ngày</div>
            <Row justify="space-between">{RenderCardProduct}</Row>
        </div>
    );
};

export default memo(SaleProduct);
