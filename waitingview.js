export default class WaitingView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                <h2 id="log"> {this.props.log} </h2>
            </div>
        );
    }
}