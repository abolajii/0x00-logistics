import styled from "styled-components";
const Inner = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding-top: 25px;
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: flex;
  padding: 30px 20px;
  flex-direction: column;
  background: linear-gradient(to bottom, #f3e2e6, #ff8e72);
  border-radius: 20px;
  font-family: Lato;

  .name {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
    margin-bottom: 10px;
  }

  .bal {
    font-size: 36px;
    font-style: normal;
    font-weight: 900;
    line-height: 37px;
    color: #000;
    /* background: blue; */
  }

  .top {
    height: 140px;
  }

  .date {
    font-weight: 700;
    color: #000;
  }

  .icon {
    margin-left: 10px;
  }
`;

export { Inner, Grid, GridContainer };
