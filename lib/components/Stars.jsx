import React from 'react';
import classnames from 'classnames';
import bem from 'bem-classname';
import {times} from 'lodash';

import './stars.scss';

export default class Stars extends React.Component {
    onClickBound = this.onClick.bind(this);
    onMouseMoveBound = this.onMouseMove.bind(this);
    onMouseLeaveBound = this.onLeaveMove.bind(this);

    static defaultProps = {
        count: 5,
        edit: true,
        char: '★',
        value: 0,
        progressive: true
    };

    constructor(props) {
        super(props);

        this.state = { value: props.value };
        this.uniqueness = (Math.random() + '').replace('.', '');
    }

    componentWillReceiveProps(nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    }

    onLeaveMove(event) {
        event.preventDefault();

        if (event.clientX <= event.target.getBoundingClientRect().left) {
            this.setValue(0);
        } else if (event.clientX >= this.refs['star-' + (this.props.count - 1)].getBoundingClientRect().right) {
            this.setValue(this.props.count);
        }
    }

    onMouseMove(event) {
        event.preventDefault();

        const spread = event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left;
        const mouseAt = event.clientX - event.target.getBoundingClientRect().left;

        if (mouseAt > 0) {
          let index = Number(event.target.getAttribute('data-index'));
          this.setValue(index + (mouseAt / spread));
      }
    }

    onClick(event) {
        event.preventDefault();

        const spread = event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left;
        const mouseAt = event.clientX - event.target.getBoundingClientRect().left;

        let index = Number(event.target.getAttribute('data-index'));
        if (this.props.progressive) {
            this.setValue((index + (mouseAt / spread)).toFixed(2));
        } else {
            this.setValue(index + 1);
        }
    }

    setValue(value) {
        this.setState({ value });

        if (this.props.onChange) {
          this.props.onChange(value);
        }
    }

    getStyleElement(width) {
        return `
            .stars__star--${this.uniqueness}:before {
                display: inline-flex;
                position: absolute;
                overflow: hidden;
                z-index: 10;
                top: 0; left: 0;
                width: ${width};
                content: attr(data-forhalf);
                color: #ffd700;
            }
            .stars__star--${this.uniqueness}:after {
                display: inline-flex;
                overflow: hidden;
                top: 0; left: 0;
                width: 100%;
                content: attr(data-forhalf);
                color: #ccc;
            }`;
    }

    renderStyleElement(width) {
        return (
          <style dangerouslySetInnerHTML={{
            __html: this.getStyleElement(width)
          }}>
          </style>
        );
    }

    renderStars() {
        return times(this.props.count, i => {
          const value = i;

          const isActive = this.props.progressive ? ((Math.floor(this.state.value) - value) > 0 || this.state.value === this.props.count) : value < this.state.value;
          const isPartial = this.props.progressive ? (this.state.value - value) > 0 && (this.state.value - value) < 1 : false;
          const className = bem('stars__star', { 'active': isActive, [this.uniqueness]: isPartial });

          return (
             <div key={i}
                ref={'star-' + i}
                onMouseMove={this.props.progressive ? this.props.edit && this.onMouseMoveBound : undefined}
                onMouseLeave={this.props.progressive ? this.props.edit && this.onMouseLeaveBound : undefined}
                onClick={this.props.edit && this.onClickBound}
                className={className}
                data-index={value}
                data-forhalf={this.props.char}>
                {isPartial ? this.renderStyleElement(((this.state.value - value) * 100) + '%') : undefined}
             </div>
         );
      });
    }

    render() {
        const className = bem(classnames('stars', this.props.className), { 'edit': this.props.edit });
        return (
          <div className={className} style={this.props.style}>
            {this.renderStars()}
          </div>
        );
    }
}
