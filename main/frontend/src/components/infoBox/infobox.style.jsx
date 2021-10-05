import styled from "styled-components";

const InfoboxStyle = styled.div`
   {
    .DA-infobox {
      display: block;
      width: 100%;
      max-width: 350px;
      margin-top: 20px;
      background-color: coral;
      border: 1px solid coral;
      padding: 10px 20px;
      border-radius: 7px;
      color: #333;
      &.success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }
      &.danger {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
      }
      &.warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }
    }
  }
`;

export default InfoboxStyle;
