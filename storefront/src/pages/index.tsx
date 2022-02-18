import React, { FC, useEffect } from "react";
import Home from "./home";

//-- Hook
import { useAppSelector, useAppDispatch } from "../redux/Hooks";

//-- Actions
import { Actions } from "../redux/reducers";
const { ConfigActions } = Actions;

interface IProps {}

const Index: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { config, themes } = useAppSelector((state) => state.config);

  useEffect(() => {
    dispatch(ConfigActions.CONFIG_REQUEST({ data: "CONFIG" }));
    dispatch(ConfigActions.THEMES_REQUEST({}));
  }, []);

  return <Home />;
};

export default Index;
