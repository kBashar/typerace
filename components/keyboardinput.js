import React from "react"

export default class KeyboardInput extends React.Component {
    constructor(props) {
        super(props);
        //this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }
    
    
    
    render() {
        const notAccurateStyle = {
            backgroundColor: 'red'
        };
        
        return(
            <input 
            style = {this.props.isAccurate ? {}:notAccurateStyle} 
            type = "text" 
            onChange = {this.props.onChange}>
            </input>
        );
    }
}