import { MdClose } from "react-icons/md";
import React from "react";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";
// import useModal from "../../hooks/useModal";

const Inner = styled.div`
  background-color: #ebc9c5;
  color: #ad4c48;
  min-width: 300px;
  font-size: 13px;
  z-index: 1000;

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
  background-color: #ae2f2f;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -10px;
`;

const Error = () => {
  const { setError, error } = useAlertStore();

  const handleClick = React.useCallback(() => {
    setError("");
  }, [setError]);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => handleClick(), 4000);
    }
  }, [error, setError, handleClick]);

  return (
    <>
      <>
        <div className="center">
          <Inner className={error ? "show" : "hide"}>
            {error}
            <Close onClick={handleClick}>
              <MdClose color="#fff" size={12} />
            </Close>
          </Inner>
        </div>
      </>
    </>
  );
};

export default Error;
