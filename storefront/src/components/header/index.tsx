import { FC, memo, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Row, Col, Input, Badge, Affix } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined
} from "@ant-design/icons";
import { Images, Links } from "../../constants";
import Image from "../images/Image";
import MenuMobile from "../menu/MenuMobile";
import Menu from "../menu";
import HeaderMobile from "./HeaderMobile"

//-- Hook
import { useAppSelector } from "../../redux/Hooks";

const { Search } = Input;

interface IProps { }

const Header: FC<IProps> = (props) => {
  const { } = props;
  const router = useRouter();
  const { themes: { setting, key, label } } = useAppSelector((state) => state.config);
  const [hideMenuMobile, setHideMenuMobile] = useState(false);

  const onSearch = (value) => {
    if (!value) return;
    router.push(`${Links.Search}/${value}`);
  }

  if (key === 'DARK') {
    return (
      <>
        <div className="header-dark">
          <div className="top-header" >
            <Row className="container" justify="space-between" align="middle">
              <Col className="text">
                [FREE QUÀ 1.460k]khi mua máy Halio Ion Hot & Cool
              </Col>
              <Col>
                <FacebookOutlined style={{ paddingRight: 12, fontSize: 17 }} />
                <TwitterOutlined style={{ paddingRight: 12, fontSize: 17 }} />
                <YoutubeOutlined style={{ fontSize: 17 }} />
              </Col>
            </Row>
          </div>
          {/* --- */}
          <div className="header">
            <Row className="container" justify="space-between" align="middle">
              <Col className="logo">
                <Link href={Links.Logo}>
                  <a>
                    <Image src={Images.Logo} alt="logo" />
                  </a>
                </Link>
              </Col>
              <Col xs={24} lg={11}>
                <Search
                  placeholder="Bạn muốn tìm gì..."
                  size="large"
                  onSearch={onSearch}
                  enterButton="Tìm kiếm"
                  className="search"
                />
              </Col>
              <Col className="sign-in">
                Đăng nhập / Đăng ký
              </Col>
              <Col className="cart">
                <Link href={Links.Cart}>
                  <a>
                    <Badge count={`99+`} size="small">
                      <ShoppingCartOutlined />
                    </Badge>
                  </a>
                </Link>
              </Col>
            </Row>
            {/* -- Menu -- */}
            <Menu />
          </div>

          {/* -- header mobile */}
          <HeaderMobile />
        </div>
      </>
    )
  }

  return (
    <Affix offsetTop={0}>
      <div className="header" style={{ backgroundColor: setting.colorHeader }}>
        <Row className="container" justify="space-between" align="middle">
          <Col xs={24} lg={5} className="left-container">
            <div
              className="icon-menu-mobile"
              onClick={() => setHideMenuMobile(!hideMenuMobile)}
            >
              <MenuMobile hide={hideMenuMobile} setHide={setHideMenuMobile} />
              <MenuOutlined />
            </div>
            <div>
              <Link href={Links.Logo}>
                <a>
                  <Image src={Images.Logo} alt="logo" />
                </a>
              </Link>
            </div>
            <div className="icon-cart-mobile">
              <Link href="#">
                <a>
                  <Badge count={99} size="small">
                    <ShoppingCartOutlined />
                  </Badge>
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={14} className="mid-container">
            <Search
              placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
              size="large"
              onSearch={onSearch}
              enterButton
            />
          </Col>
          <Col span={5} className="right-container">
            <div className="account">
              <UserOutlined />
              <div>
                <div>Tài khoản</div>
                <div>Hoang Nam</div>
              </div>
            </div>
            <div className="cart">
              <Link href="#">
                <div>
                  <Badge count={`99+`} size="small">
                    <ShoppingCartOutlined />
                  </Badge>
                  Giỏ hàng
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};
export default memo(Header);
