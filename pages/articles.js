import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import { Row, Col } from "../components/scaffold"
import Satoshi from "../components/satoshi"
import Articles from "../libs/data"

const Components = (props, i) => {
  if (props.type === "html") {
   var p = {...props.props, key: i}
    return React.createElement(props.tag, p, props.children)
  } else {
    return <Satoshi {...props} key={i} />
  }
}

export default class extends React.Component {
  static async getInitialProps({ query }) {
    console.log(query)
    return { article: Articles[query.slug] }
  }
  render() {
    var { article } = this.props
    return (
      <Layout>
        <Header {...article}>
          <Title>
            {article.title}
          </Title>
        </Header>
        <Content>
          {article.content.map((item, i) => Components(item, i))}
          <Wrapper>
            <Author
              src={article.authorImg}
            />
            <div>
              <span>{article.author}</span>
              <span>{article.authorBio}</span>
            </div>
          </Wrapper>
        </Content>
      </Layout>
    )
  }
}

const Header = styled.section`
  position: relative;
  color: white;
  width: 100%;
  padding: 2rem 10rem;
  height: 50vh;
  min-height: calc(10 * 4vw);
  box-sizing: border-box;
  padding: 10vw;
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${props => props.image}) no-repeat center center;
  background-size: cover;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 4rem 2rem;
  max-width: 50rem;
  p {
    font-size: 120%;
  }
  @media screen and (max-width: 640px) {
    padding: 4rem 0rem;
    width: 90vw;
  }
`

const Wrapper = styled.div`
  display: flex;
  margin: 3rem 0;
  span {
    margin-top: .3rem;
    margin-left: 1rem;
    display: block;
  }
`

const Author = styled.img`
  border-radius: 30px;
  width: 60px;
  height: 60px;
`

const Title = styled.h1`
  position: absolute;
  bottom: calc(2 * 4vw);
  max-width: 60rem;
  font-size: 3vw;
  @media screen and (max-width: 640px) {
    font-size: 1.5rem;
    max-width: 80vw;
  }
`
