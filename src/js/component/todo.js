import React from 'react';

class Todo extends React.Component {
    
    constructor (){
        super() ;
        this.state = {
            whatIAmTyping: '', 
            todos: [],
            counter: 0
        };
    }
    
    deleteItem(item){
        let tempTodos = this.state.todos; //creating a temp variable copying what's in the todos 
        tempTodos.splice(item, 1); 
        this.setState({todos: tempTodos}); //splice doesnt return anything, this is returning
    } 
    
    /*countTheItems(item){ //supposed to count the items inside the array
        let counter = this.state.todos;
        this.setState({counter: this.state.counter+1});
    }*/

    
    
    render () {
        //listen to the keys, if statement for if the enter key is pressed 
        const handleKeyPress = (e) => {
             console.log(e.key);
           
            //checking for chars, 
            if(isLetter(e.key)){
                this.setState({whatIAmTyping: this.state.whatIAmTyping + e.key});
                
            }
            else if(e.key==="Enter")
            {
            //pushes the array of whatever i'm typing
                this.state.todos.push(this.state.whatIAmTyping);
                this.setState({ whatIAmTyping:'' });
            }
            else if(e.key==="Backspace"){
                console.log(e.key==="Backspace"); 
                this.setState({       
                    whatIAmTyping: this.state.whatIAmTyping.slice(0,this.state.whatIAmTyping.length-1)
                    //-1 because the array starts at 0, and we need it to delete the last letter
                    //wrote this else if because there was a bug when pressing the delete button  
                    
                }); 
            }
        
        };

        const isLetter = (pupu) => {
          return ((pupu.length === 1) && (pupu.match(/[a-z]/i)) || (pupu == " "));
         //if str length is 1 (a char) and matches a-z 
         //(/[a-z]/i) is a regular expression 
        };
                                                                                //listens to the click and then triggers the deleteItem function
        const todosInHTML = this.state.todos.map((todo,i) => (<li key={i}>{todo} <button onClick={(e) => this.deleteItem(i) }><i className="far fa-trash-alt"></i></button></li>));
        return ( 
            <div className= "container">
                <div className = "headercontainer"><h4>To Do List:</h4></div>
                <ol>{todosInHTML}</ol>
                <input className= "inputButton" onKeyUp={handleKeyPress} value= {this.state.whatIAmTyping} placeholder="Enter a task"/>    
            </div>  
        );
    }
}

export default Todo; 


