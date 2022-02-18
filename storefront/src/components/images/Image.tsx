import React, { memo, FC } from "react";

interface IProps {
  src: string;
  alt?: string;
}

const Image: FC<IProps> = (props) => {
  const { src, alt } = props;
  return <img src={src} alt={alt} />;
};

export default memo(Image);
