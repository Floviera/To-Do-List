import React from "react";

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      whatIAmTyping: "",
      todos: [],
      counter: 0,
      date: new Date().toLocaleString()
    };
  }

  deleteItem(item) {
    let tempTodos = this.state.todos; //creating a temp variable copying what's in the todos
    tempTodos.splice(item, 1);
    this.setState({ todos: tempTodos }); //splice doesnt return anything, this is returning
  }

  /*countTheItems(item){ //supposed to count the items inside the array
        let counter = this.state.todos;
        this.setState({counter: this.state.counter+1});
    }*/

  render() {
    //listen to the keys, if statement for if the enter key is pressed
    const handleKeyPress = e => {
      console.log(e.key);

      //checking for chars,
      if (isLetter(e.key)) {
        this.setState({ whatIAmTyping: this.state.whatIAmTyping + e.key });
      } else if (e.key === "Enter") {
        //pushes the array of whatever i'm typing
        this.state.todos.push(this.state.whatIAmTyping);
        this.setState({ whatIAmTyping: "" });
      } else if (e.key === "Backspace") {
        console.log(e.key === "Backspace");
        this.setState({
          whatIAmTyping: this.state.whatIAmTyping.slice(
            0,
            this.state.whatIAmTyping.length - 1
          )
          //-1 because the array starts at 0, and we need it to delete the last letter
          //wrote this else if because there was a bug when pressing the delete button
        });
      }
    };

    const isLetter = pupu => {
      return (pupu.length === 1 && pupu.match(/[a-z]/i)) || pupu == " ";
      //if str length is 1 (a char) and matches a-z
      //(/[a-z]/i) is a regular expression
    };
    //listens to the click and then triggers the deleteItem function
    const todosInHTML = this.state.todos.map((todo, i) => (
      <li key={i}>
        {todo}{" "}
        <button onClick={e => this.deleteItem(i)}>
          <i className="fas fa-times-circle" />
        </button>
      </li>
    ));
    return (
      <div className="full-wrap">
        <div className="container">
          <div className="headercontainer">
            <h4 className="title">TODO LIST</h4>
            <div className="date">
              <p className="date">{this.state.date}</p>
            </div>
            <p className="par">Getting one task done at a time</p>
          </div>
          <ol>{todosInHTML}</ol>
          <input
            className="inputButton"
            onKeyUp={handleKeyPress}
            value={this.state.whatIAmTyping}
            placeholder="Enter a task.."
          />
        </div>
        <div className="footer">
          <p className="footerpar">
            {" "}
            Made with love by&#x2c; Florencia Viera
            <i className="heart">&#x2665;</i>
          </p>
        </div>
      </div>
    );
  }
}

export default Todo;
