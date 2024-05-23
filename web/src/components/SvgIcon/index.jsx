import classNames from "classnames";
import * as React from "react";
import "./index.scss";

export const SvgIcon = props => {
  const { className, url, ...etc } = props;
  return (
    <svg {...etc} className={classNames("SvgIcon", className)}>
      <use xlinkHref={url} />
    </svg>
  );
};

export const SvgIconRig = props => {
  const { className, url, ...etc } = props;
  return (
    <svg {...etc} className={classNames("SvgIconRig", className)}>
      <use xlinkHref={url} />
    </svg>
  );
};
