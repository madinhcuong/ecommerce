import React, { memo, FC, useMemo } from "react";
import { Row, Col } from "antd";
import Link from "next/link";
import { Images } from "../../components";

//-- Constants
import { Links } from "../../constants";

let data = [
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ Vớ ngắn nữ Vớ ngắn nữ Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
  {
    img: "/images/test/img1.jpg",
    title: "Vớ ngắn nữ",
  },
  {
    img: "/images/test/img2.jpg",
    title: "Miếng lót giày nam",
  },
];

interface IProps {}

const FeaturedCategory: FC<IProps> = (props) => {
  const {} = props;

  const renderCategory = useMemo(() => {
    return data.map((ele, key) => {
      return (
        <Link href={Links.Product} key={key}>
          <a className="card">
            <div className="card-img">
              <Images src={ele.img} alt="" />
            </div>
            <span>{ele.title}</span>
          </a>
        </Link>
      );
    });
  }, [data]);

  return (
    <Row className="featured-category" justify="space-between">
      <Col span={24} className="">
        <div className="title">Danh mục nổi bật</div>
        <div className="body">{renderCategory}</div>
      </Col>
    </Row>
  );
};

export default memo(FeaturedCategory);
