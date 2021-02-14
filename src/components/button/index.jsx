import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  height: 40px;
  padding: 1px 40px;
  font-size: 19px;
  border-radius: 8px;
  color: white;
  font-weight: 500;

  :not(button:last-of-type) {
    margin-right: 16px;
  }
  ${(props) => ({
    ...(props.variant === "primary" && {
      borderColor: "#4997fb",
      backgroundColor: "#4997fb",
    }),
    ...(props.variant === "secondary" && {
      borderColor: "#5bce43",
      backgroundColor: "#5bce43",
    }),
    ...(props.variant === "danger" && {
      borderColor: "#DC3545",
      backgroundColor: "#DC3545",
    }),
    ...(props.size === "large" && {
      height: "40px",
      padding: "1px 35px",
      fontsize: "19px",
      color: "white",
      fontweight: "500",
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
