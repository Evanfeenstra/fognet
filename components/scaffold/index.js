import styled from "styled-components";

export const Row = styled.div`
  width: 90vw;
  max-width: ${props => (props.width ? props.width : "100%")};
  display: flex;
  flex-direction: row;
  margin: ${props => (props.margin ? props.margin : "none")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  align-items: ${props => (props.align ? props.align : "center")};
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  width: ${props => (props.width ? props.width : "100%")};
  display: flex;
  flex-direction: column;
  margin: ${props => (props.margin ? props.margin : "none")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  align-items: ${props => (props.align ? props.align : "center")};
`;
