import React, { memo, FC, useMemo } from "react";
import Link from "next/link";
import { Col, Row } from "antd";
import { footerData, storeName } from "../../data";
import Image from "../images/Image";
import { Images, Links } from "../../constants";

interface IProps { }

const Footer: FC<IProps> = (props) => {
  const { } = props;

  const RenderLink = memo(({ data, type }: { data: any, type: any }) => {
    return data.map((ele, key) => {
      let link = `${type === "category" ? Links.Category : Links.Info}/${ele.slug}`;
      return (
        <div className="link" key={`RenderLink-${key}`}>
          <Link href={link}>
            <a>{ele.name}</a>
          </Link>
        </div>
      )
    });
  });

  return (
    <>
      <div className="footer">
        <Row className="container">
          <Col xs={24} lg={6}>
            <div className="name" style={{ width: '150px' }}>
              <Link href={Links.Logo}>
                <a>
                  <Image src={Images.LogoWhite} alt="logo" />
                </a>
              </Link>
            </div>
            <div style={{ paddingRight: 30 }}>
              {footerData.infor}
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <div className="name">
              Danh mục Sản phẩm
            </div>
            <RenderLink data={footerData.category} type="category" />
          </Col>
          <Col xs={24} lg={6}>
            <div className="name">
              Thông tin & Hướng dẫn
            </div>
            <RenderLink data={footerData.infor_guide} type="infor_guide" />
          </Col>
          <Col xs={24} lg={6}>
            <div className="name">
              Tải ứng dụng {storeName}
            </div>
          </Col>
        </Row>
      </div>
      <div className="copyright">
        <Row className="container">
          © Copyright 2021 {storeName}. All Rights Reserved
        </Row>

      </div>
    </>
  );
};

export default memo(Footer);
