import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 8px;
  margin-right: 8px;

  ${(props) => ({
    ...(props.variant === "primary" && {
      borderColor: "#4997fb",
      backgroundColor: "#4997fb",
    }),
    ...(props.variant === "secondary" && {
      borderColor: "#5bce43",
      backgroundColor: "#5bce43",
    }),
    ...(props.size === "large" && {
      height: "40px",
      padding: "6.4px 15px",
      fontSize: "16px",
    }),
    ...(props.centerAlign && {
      display: "block",
      margin: "auto",
    }),
  })}
`;

const Button = ({
  onClick,
  disabled,
  variant,
  type,
  children,
  size,
  centerAlign,
}) => (
  <ButtonWrapper
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    type={type}
    size={size}
    centerAlign={centerAlign}
  >
    {children}
  </ButtonWrapper>
);

const { string, bool, func, node } = PropTypes;

Button.propTypes = {
  variant: string,
  size: string,
  disabled: bool,
  onClick: func,
  children: node,
  type: string,
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
