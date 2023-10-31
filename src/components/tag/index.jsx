/* eslint-disable react/prop-types */
// import React from "react";
import styled from "styled-components";

const Tag = styled.span`
  display: inline-flex;
  padding: 9px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  width: 90px;
`;

const Pending = styled(Tag)`
  background: #f9f3df;
  color: #e1b000;
`;

const Done = styled(Tag)`
  background: #dff2e8;
  color: #2ca764;
`;

const NotPaid = styled(Tag)`
  color: #e53b3b;
  background: #ffeaea;
`;

const Paid = styled(Tag)`
  color: #007f5f;
  background: #b8dab8;
`;

const Void = styled(Tag)`
  background: #eaeaea;
  color: #777777;
`;

const Canceled = styled(Tag)`
  color: #ff4c4c;
  background: #ffaaaa;
`;

const NextDay = styled(Tag)`
  background: #ffaa00;
  color: #fff7a7;
`;

const CustomTag = ({ tag }) => {
  switch (tag) {
    case "pending":
      return <Pending>Pending Job</Pending>;
    case "done":
      return <Done>Done Job</Done>;
    case "not-paid":
      return <NotPaid>Not Paid</NotPaid>;
    case "paid":
      return <Paid>Paid Job</Paid>;
    case "void":
      return <Void>Void Job</Void>;
    case "canceled":
      return <Canceled>Canceled Job</Canceled>;
    case "next-day":
      return <NextDay>Next Day Job</NextDay>;
    default:
      return null;
  }
};

export default CustomTag;
