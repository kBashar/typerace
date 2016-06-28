import React from "react"

export default class KeyboardInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.state = {
            isAccurate:true
        };
    }
    
    inputChangeHandler(event) {
        let userInput = event.target.value;
        if (this.props.word.startsWith(userInput) && !this.state.isAccurate) {
            this.setState({isAccurate:true});
        }
        else if(!this.props.word.startsWith(userInput) && this.state.isAccurate) {
            this.setState({isAccurate:false});
        }
    }
    
    render() {
        const notAccurateStyle = {
            backgroundColor: 'red'
        };
        
        return(
            <input 
            style = {this.state.isAccurate ? {}:notAccurateStyle} 
            type = "text" 
            onChange = {this.inputChangeHandler}>
            </input>
        );
    }
}