import styled from "styled-components";

const GlobalStyle = styled.div`
   {
    #main {
      display: block;
      position: relative;
      min-height: 100vh;
      .form-wrapper {
        position: absolute;
        max-width: 600px;
        width: 100%;
        left: 50%;
        top: 20%;
        padding: 20px;
        border-radius: 7px;
        transform: translateX(-50%);
        box-shadow: 0px 10px 50px -10px rgba(173, 194, 217, 0.5);
        h1 {
          text-align: center;
          text-transform: capitalize;
          font-weight: bold;
          margin-bottom: 20px;
        }
        form {
          .select,
          .tags {
            margin-bottom: 20px;
          }
          textarea {
            display: block;
            width: 100%;
            background: #f5f5f5;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 13px 20px;
            font-weight: 300;
            transition: 0.3s ease all;
            margin-bottom: 20px;
            &::placeholder {
              color: #bcbcbc;
            }
            &:focus {
              background: white;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
              outline: none;
            }
          }
        }
      }
      .content {
        padding: 7vh 13vw;
        > header {
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          h1 {
            text-transform: capitalize;
          }
          a {
            background-color: #057bff;
            padding: 10px 20px;
            border-radius: 10px;
            transition: all ease 0.3s;
            color: white;
            &:hover {
              background-color: #8e44ad;
            }
          }
        }
        .filters {
          margin-bottom: 20px;
          h5 {
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 10px;
          }
          .actions {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            span {
              max-width: 300px;
              margin-right: 10px;
              border: 1px solid #057bff;
              padding: 10px;
              border-radius: 7px;
              cursor: pointer;
              &.active {
                background-color: #057bff;
              }
            }
          }
        }
        .list-view {
          .api-data {
            list-style: none;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            .task-content {
              width: 100%;
              background-color: #eee;
              border-radius: 7px;
              margin: 0 30px 30px 0;
              padding: 20px;
              box-shadow: 0 10px 50px -10px rgba(173, 194, 217, 0.5);
              transition: ease all 0.3s;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              position: relative;
              overflow: hidden;
              header {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                margin-right: 20px;
                h4 {
                  display: flex;
                  align-items: center;
                  span {
                    display: block;
                    font-size: 12px;
                    padding: 5px;
                    border-radius: 7px;
                    border: 1px solid #057bff;
                    margin-left: 5px;
                  }
                }
              }
              article {
                margin-right: 20px;
                max-width: 265px;
                width: 100%;
              }
              .subs {
                margin-right: 20px;
                ul {
                  margin-top: 10px;
                  list-style: none;
                }
              }
              h2,
              h3 {
                text-transform: capitalize;
              }
              .actions {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 20px;
                > div {
                  margin-right: 10px;
                }
              }
            }
          }
          ul.pagination {
            list-style: none;
            padding: 0;
            margin: 40px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            li {
              a {
                padding: 10px 20px;
                background-color: #057bff;
                color: white;
                transition: ease all 0.3s;
                margin-right: 10px;
                border-radius: 10px;
                cursor: pointer;
              }
              &:hover,
              &.active {
                a {
                  background-color: #8e44ad;
                }
              }
              &.disabled {
                a {
                  background-color: #ccc;
                  pointer-events: none;
                }
              }
            }
          }
        }
        .view-data {
          position: absolute;
          max-width: 600px;
          width: 100%;
          left: 50%;
          top: 20%;
          padding: 20px;
          border-radius: 7px;
          transform: translateX(-50%);
          box-shadow: 0px 10px 50px -10px rgba(173, 194, 217, 0.5);
        }
      }
    }
  }
`;

export default GlobalStyle;
