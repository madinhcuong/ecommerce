import React, { memo, FC, useState, useMemo, useCallback } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";

//-- Hook
import { useAppSelector, useAppDispatch } from "../../redux/Hooks";

//-- Config
import { Themes } from "../../config";

//-- Actions
import { Actions } from "../../redux/reducers";
const { ConfigActions } = Actions;

interface IProps {}

const ThemeSwitch: FC<IProps> = (props) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const { themes } = useAppSelector((state) => state.config);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleTheme = useCallback(
    (e) => {
      dispatch(ConfigActions.THEMES_REQUEST({ theme: e.target.value }));
      onClose();
    },
    [themes]
  );

  // Return layout
  const RenderRadio = useMemo(() => {
    return Themes.map((item, key) => {
      return (
        <Radio value={item.key} key={key}>
          {item.label}
        </Radio>
      );
    });
  }, [Themes]);

  return (
    <div className="theme-switch">
      <Button
        type="ghost"
        shape="circle"
        icon={<SettingOutlined />}
        size="large"
        onClick={handleClick}
      />

      <Drawer
        title="Themes"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Radio.Group onChange={handleTheme} value={themes.key}>
          <Space direction="vertical">{RenderRadio}</Space>
        </Radio.Group>
      </Drawer>
    </div>
  );
};

export default memo(ThemeSwitch);
