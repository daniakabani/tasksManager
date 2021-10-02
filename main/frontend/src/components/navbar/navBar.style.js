import styled from "styled-components";

const NavStyle = styled.div`
   {
    nav {
      padding: 20px 8vw;
      position: relative;
      box-shadow: 0px 10px 50px -10px rgba(173, 194, 217, 0.5);
      background-color: white;
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          a {
            padding: 20px;
            color: #057bff;
            transition: 0.3s ease all;
            text-decoration: none;
            font-weight: bold;
            position: relative;
            &:after {
              content: "";
              display: block;
              height: 5px;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 0;
              background-color: #8e44ad;
              transition: all 0.3s ease;
            }
            &:hover,
            &.active {
              color: #8e44ad;
              &:after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
`;

export default NavStyle;
