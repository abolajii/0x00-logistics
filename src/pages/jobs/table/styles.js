import { colors } from "../../../constants";
import styled from "styled-components";

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  min-height: 500px;
  font-family: Lato;
`;

const Row = styled.div`
  border-bottom: 1px dashed #e4e6ef;
`;

const Column = styled.div`
  flex: ${(props) => (props.expand ? 1.5 : 1)};
  padding: 8px 0;
  display: flex;
  align-items: center;
  color: ${colors.textOne};
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`;

const HeaderColumn = styled(Column)`
  font-weight: bold;
  color: ${colors.textThree};
  font-size: 12px;
  letter-spacing: 0.36px;
  justify-content: ${(props) => (props.alignRight ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
`;

const TextOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;
`;

export { TableContainer, Column, TextOverflow, Row, HeaderColumn };
