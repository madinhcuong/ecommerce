import React, { memo, FC, useMemo } from "react";
import { Row, Col, Carousel } from "antd";
import { Images } from "../../components";

const Imgs = [
  "https://salt.tikicdn.com/cache/w824/ts/banner/0e/f2/9e/652d8b53812defa67245a1131241fd0d.png.jpg",
  "https://salt.tikicdn.com/cache/w824/ts/banner/88/18/05/0ed95765b42bf4658c9d1b8e711139a1.png.jpg",
];

interface IProps {}

const Banner: FC<IProps> = (props) => {
  const {} = props;

  const RenderImgCarousel = useMemo(() => {
    return Imgs.map((ele, key) => {
      return <Images src={ele} alt="" key={key} />;
    });
  }, [Imgs]);

  return (
    <Row className="" justify="space-between">
      <Col span={5} lg={5} className="banner-left">
      </Col>
      <Col lg={19} xs={24} className="banner-right">
        <Carousel autoplay dotPosition="bottom" dots={true}>
          {RenderImgCarousel}
        </Carousel>
      </Col>
    </Row>
  );
};

export default memo(Banner);
