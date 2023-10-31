import { MdClose } from "react-icons/md";
import React from "react";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";

const Inner = styled.div`
  background-color: #ddf1d7;
  color: #99b192;
  width: 300px;
  font-size: 13px;
  z-index: 100;

  /* height: 100px; */
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  transition: all 0.5s;
  transform: translateY(-30px);

  &.show {
    transition: all 0.5s;
    top: 80px;
  }

  &.hide {
    transition: all 0.5s;
    top: -100px;
  }
`;

const Close = styled.button`
  position: absolute;
  right: -10px;
  background-color: #86a97b;

  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -10px;
`;

const Success = () => {
  const { setSuccess, success } = useAlertStore();

  const handleClick = React.useCallback(() => {
    setSuccess("");
  }, [setSuccess]);

  React.useEffect(() => {
    if (success) {
      setTimeout(() => handleClick(), 4000);
    }
  }, [success, handleClick]);

  return (
    <>
      <div className="center">
        <Inner className={success ? "show" : "hide"}>
          {success}
          <Close onClick={handleClick}>
            <MdClose color="#fff" size={12} />
          </Close>
        </Inner>
      </div>
    </>
  );
};

export default Success;
