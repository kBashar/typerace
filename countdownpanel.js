class CountDownPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let time = this.props.time < 10 ? '0' + this.props.time : this.props.time
        return (
            <div>
                <h2>{this.props.log} {time} seconds</h2>
            </div>
        );
    }
}