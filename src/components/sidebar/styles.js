import styled from "styled-components";

const Inner = styled.div`
  flex: 0.2;
  background: yellow;
  min-height: 100vh;
  background: #f9f0f2;
`;

const Logo = styled.div`
  height: 120px;

  .image-container {
    height: 80px;
    width: 80px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const SidebarMenu = styled.div`
  padding-left: 30px;

  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 15px;
    color: #000;
  }

  a,
  button {
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 21px;
    letter-spacing: 0em;
    text-decoration: none;
    color: #000;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  li {
  }
`;

const SidebarMenuTwo = styled(SidebarMenu)`
  margin-top: 100px;
`;

export { Inner, Logo, SidebarMenu, SidebarMenuTwo };
