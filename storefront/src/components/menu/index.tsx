import React, { memo, FC, useMemo } from "react";
import Link from "next/link";
import { Row, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/Hooks";
import { categoryData } from "../../data";
import { Links } from "../../constants";

const { SubMenu } = Menu;

let data = [
  {
    key: 1,
    name: "thiết bị di động",
  },
  {
    key: 2,
    name: "phu kien dien tu",
  },
  {
    key: 3,
    name: "Suc khoe lam dep",
  },
  {
    key: 4,
    name: "Hang Me, Be & Do choi",
  },
  {
    key: 5,
    name: "hang gia dung va doi song",
  },
  {
    key: 6,
    name: "thoi trang nu",
  },
  {
    key: 7,
    name: "thoi trang nam",
  },
  {
    key: 8,
    name: "the thao va du lich",
  },
];

interface IProps { }

const MenuComp: FC<IProps> = (props) => {
  const { } = props;
  const { themes: { key } } = useAppSelector((state) => state.config);

  const handleClick = (e) => {
    console.log("click", e);
  };

  const RenderMenu = useMemo(() => {
    return data.map((ele, key) => {
      return (
        <SubMenu key={key} icon={<SettingOutlined />} title={ele.name}>
          <Menu.Item key={ele.name}>Option {key}</Menu.Item>
          <Menu.Item key={ele.name}>Option {key}</Menu.Item>
          <Menu.Item key={ele.name}>Option {key}</Menu.Item>
          <Menu.Item key={ele.name}>Option {key}</Menu.Item>
        </SubMenu>
      );
    });
  }, [data]);

  const RenderCategory = useMemo(() => {
    return categoryData.map((ele, key) =>
      <Link href={`${Links.Category}/${ele.slug}`} key={key}>
        <a>{ele.name}</a>
      </Link>
    );
  }, [categoryData]);

  if (key === 'DARK') {
    return (
      <Row
        className="menu-dark"
        justify="space-between"
        align="middle"
      >
        {RenderCategory}
      </Row>
    )
  }

  return (
    <Menu onClick={handleClick} mode="vertical" className="menu">
      {RenderMenu}
    </Menu>
  );
};

export default memo(MenuComp);
