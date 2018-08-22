export default {
  data() {
    return {
      author: 'Yang'
    }
  },
  render() {
    return (
      <div id='footer'>
        <span>Write by {this.author}</span>
      </div>
    )
  }
}