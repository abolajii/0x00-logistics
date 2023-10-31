/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Title from "../title";
import { colors } from "../../constants";
// import React from "react";
import styled from "styled-components";

const LinkContainer = styled.div`
  color: ${colors.textTwo};
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const Gap = styled.div`
  display: flex;
  gap: 5px;
`;

const ActiveLink = styled(LinkContainer)`
  color: ${colors.textOne};
`;

const Button = styled.button`
  display: inline-flex;
  padding: 10px 39px;
  border-radius: 12px;
  background: ${colors.darkColor};
  color: ${colors.white};
`;

const NavHeader = ({
  text,
  path,
  titleOne,
  two,
  openModal,
  titleTwo,
  pathTwo,
  btnTitle,
}) => {
  if (titleTwo) {
    return (
      <div>
        <Title text={text} />
        <Gap>
          <LinkContainer>
            <Link to="/dashboard">Dashboard</Link>
          </LinkContainer>
          <LinkContainer>/</LinkContainer>
          <LinkContainer>
            <Link to={path}>{titleOne}</Link>
          </LinkContainer>
          <LinkContainer>/</LinkContainer>
          <ActiveLink>
            <Link to={pathTwo}>{titleTwo}</Link>
          </ActiveLink>
        </Gap>
      </div>
    );
  }
  if (two) {
    return (
      <div className="flex ai-center justify-between">
        <div>
          <Title text={text} />
          <Gap>
            <LinkContainer>
              <Link to="/dashboard">Dashboard</Link>
            </LinkContainer>
            <LinkContainer>/</LinkContainer>
            <ActiveLink>
              <Link to={path}>{titleOne}</Link>
            </ActiveLink>
          </Gap>
        </div>
        <Button onClick={openModal}>{btnTitle}</Button>
      </div>
    );
  }
  return (
    <div>
      <Title text={text} />
      <Gap>
        <LinkContainer>
          <Link to="/dashboard">Dashboard</Link>
        </LinkContainer>
        <LinkContainer>/</LinkContainer>
        <ActiveLink>
          <Link to={path}>{titleOne}</Link>
        </ActiveLink>
      </Gap>
    </div>
  );
};

export default NavHeader;
