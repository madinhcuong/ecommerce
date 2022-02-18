import React, { memo, FC, useMemo } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { categoryData } from "../../data";
import { Links } from "../../constants";

interface IProps {
  hide: boolean;
  setHide: (value: boolean) => void;
}

const MenuMobile: FC<IProps> = (props) => {
  const { hide, setHide } = props;

  const onClose = (e) => {
    setHide(false);
  };

  const RenderCategory = useMemo(() => {
    return categoryData.map((ele, key) =>
      <div className="link">
        <Link href={`${Links.Category}/${ele.slug}`} key={key}>
          <a onClick={onClose}>{ele.name}</a>
        </Link>
      </div>
    );
  }, [categoryData]);

  return (
    <Drawer
      title="Danh mục sản phẩm"
      placement="right"
      onClose={onClose}
      visible={hide}
      className="drawer-menu"
    >
      {RenderCategory}
    </Drawer>
  );
};

export default memo(MenuMobile);
