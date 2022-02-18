import { FC, memo, useState } from "react";
import Link from "next/link";
import { Col, Drawer, Row } from "antd";
import {
	MenuOutlined,
	UserOutlined,
	SearchOutlined,
	ShoppingCartOutlined
} from "@ant-design/icons";
import { Images, Links } from "../../constants";
import Image from "../images/Image";
import MenuMobile from "../menu/MenuMobile";


interface IProps { }

const HeaderMobile: FC<IProps> = (props) => {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const [visibleSearch, setVisibleSearch] = useState(false);

	const showMenu = () => {
		setVisibleMenu(true);
	};

	const closeMenu = () => {
		setVisibleMenu(false);
	};

	const showSearch = () => {
		setVisibleSearch(true);
	};

	const closeSearch = () => {
		setVisibleSearch(false);
	};

	return (
		<div className="header-mobile">
			<Row className="container" justify="space-between" align="middle">
				<Col className="logo">
					<Link href={Links.Logo}>
						<a>
							<Image src={Images.Logo} alt="logo" />
						</a>
					</Link>
				</Col>
				<Col className="action">
					<SearchOutlined onClick={showSearch} />
					<ShoppingCartOutlined />
					<UserOutlined />
					<MenuOutlined onClick={showMenu} />
				</Col>
			</Row>
			<MenuMobile hide={visibleMenu} setHide={setVisibleMenu} />
			<div className="drawer">
				<Drawer
					title="Search"
					placement="right"
					onClose={closeSearch}
					visible={visibleSearch}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Drawer>
			</div>
		</div>
	);
};
export default memo(HeaderMobile);
