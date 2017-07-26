import styled from "styled-components";

export default props => {
  if (props.type === "image") {
    return (
      <Content {...props}>
        {props.content && <Image {...props} src={props.content} />}
      </Content>
    );
  } else if (props.type === "video") {
    return <Video {...props} src={props.content} autoPlay controls />;
  } else if (props.type === "audio") {
    return <Audio {...props} src={props.content} autoPlay controls />;
  } else {
    return (
      <Content {...props} dangerouslySetInnerHTML={{ __html: props.content }} />
    );
  }
};

const Content = styled.div`
  position: relative;
  min-width: 200px;
  width: auto;
  min-height: 80px;
  height: auto;
`;

const Image = styled.img`
  height: ${props => (props.height ? props.height + `px` : "auto")};
  max-width: 100%;
`;

const Audio = styled.audio`
  min-height: 50px;
  height: ${props => (props.height ? props.height + `px` : "auto")};
  max-width: 100%;
`;

const Video = styled.video`
  position: relative;
  min-width: 200px;
  width: 100%;
  min-height: 80px;
  height: auto;
`;
