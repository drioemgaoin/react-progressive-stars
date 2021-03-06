import React from 'react';
import ReactDOM from 'react-dom';

import {Stars} from './index';

class StarsWrapper extends React.Component {
    onChangeBound = this.onChange.bind(this);

    static defaultProps = {
        value: 0
    };

    constructor(props) {
        super(props);

        this.state = { value: props.value }
    }

    onChange(value) {
        this.setState({value});
    }

    render() {
        return (
            <div>
                <Stars style={{ display: 'inline-block' }}
                    edit={this.props.edit}
                    value={this.state.value}
                    onChange={this.onChangeBound} />
                <label style={{ display: 'inline-block', marginLeft: '40px' }}>{this.state.value}</label>
            </div>
        )
    }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <h2>Stars in readonly without value</h2>
        {<StarsWrapper edit={false} />}
        <hr />

        <h2>Stars in readonly with whole number as value</h2>
        {<StarsWrapper edit={false} value={3} />}
        <hr />

        <h2>Stars in readonly with decimal number as value</h2>
        {<StarsWrapper edit={false} value={3.3} />}
        <hr />

        <h2>Stars in edition without value</h2>
        {<StarsWrapper />}
        <hr />

        <h2>Stars in edition with whole number as value</h2>
        {<StarsWrapper value={3} />}
        <hr />

        <h2>Stars in readonly with decimal number as value</h2>
        {<StarsWrapper value={3.3} />}
        <hr />

      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
document.getElementById('main'));
