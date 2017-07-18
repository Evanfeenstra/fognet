import styled from "styled-components";

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  align-items: ${props => (props.align ? props.align : "center")};
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  align-items: ${props => (props.align ? props.align : "center")};
`;
