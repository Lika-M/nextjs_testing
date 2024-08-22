import type { ImageProps } from "next/image";
import React from "react";

const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, objectFit, ...rest } = props;
  return <img src={src as string} alt={alt} style={{objectFit}} {...rest}/>
};

export default Image;
