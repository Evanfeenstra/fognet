import React from "react"
import styled from "styled-components"

export default class extends React.Component {
  state = { content: false }

  async componentDidMount() {
    fetch(`${this.props.API}item/${this.props.content}/${this.props.itemKey}`)
      .then(resp => resp.json()) // Transform the data into json
      .then(content => {
        console.log(content)
        this.setState({ content })
      })
  }
  render() {
    var { content } = this.state
    console.log(content)
    if (content) {
      return (
        <Content
          {...this.props}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      )
    } else {
      return <div />
    }
  }
}
const Content = styled.div`
  position: relative;
  min-width: 200px;
  width: auto;
  min-height: 80px;
  height: auto;
`
