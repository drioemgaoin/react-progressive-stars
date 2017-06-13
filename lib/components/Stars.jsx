import React from 'react';
import bem from 'bem-classname';
import {times} from 'lodash';

import './stars.scss';

export default class Stars extends React.Component {
    static defaultProps = {
        count: 5,
        progressive: false,
        edit: true,
        char: '★',
        value: 0
    };

    constructor(props) {
        super(props);

        this.state = { value: props.value };
        this.uniqueness = (Math.random() + '').replace('.', '');
    }

    mouseLeave(event) {
        event.preventDefault();

        if (event.clientX <= event.target.getBoundingClientRect().left) {
            this.setValue(0);
        } else if (event.clientX >= event.target.getBoundingClientRect().right) {
            this.setValue(this.props.count);
        }
    }

    mouseOver(event) {
        event.preventDefault();

        const spread = event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left;
        const mouseAt = event.clientX - event.target.getBoundingClientRect().left;

        if (mouseAt > 0) {
          let index = Number(event.target.getAttribute('data-index'));
          this.setValue(index + (mouseAt / spread));
      }
    }

    click(event) {
        event.preventDefault();

        const { config } = this.state;

        const spread = event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left;
        const mouseAt = event.clientX - event.target.getBoundingClientRect().left;

        let index = Number(event.target.getAttribute('data-index'));
        this.setValue(index + (mouseAt / spread));
    }

    setValue(value) {
        const roundValue = +value.toFixed(2);

        this.setState({ value: roundValue });

        if (this.props.onChange) {
          this.props.onChange(roundValue);
        }
    }

    getRate() {
        let rate;

        if(this.props.half) {
          rate = Math.floor(this.state.value);
        } else {
          rate = Math.round(this.state.value);
        }

        return stars;
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
        const { config, uniqueness } = this.state;
        return (
          <style dangerouslySetInnerHTML={{
            __html: this.getStyleElement(width)
          }}>
          </style>
        );
    }

    renderStars() {
        console.log(this.state.value);
        return times(this.props.count, i => {
          const isActive = (this.state.value - (i + 1)) > 0 || this.state.value === this.props.count;
          const isPartial = (this.state.value - i) > 0 && (this.state.value - i) < 1;
          const className = bem('stars__star', { 'active': isActive, [this.uniqueness]: isPartial });

          return (
             <div key={i}
                onMouseOver={this.props.edit && this.mouseOver.bind(this)}
                onMouseMove={this.props.edit && this.mouseOver.bind(this)}
                onMouseLeave={this.props.edit && this.mouseLeave.bind(this)}
                onClick={this.props.edit && this.click.bind(this)}
                className={className}
                data-index={i}
                data-forhalf={this.props.char}>
                {isPartial ? this.renderStyleElement(((this.state.value - i) * 100) + '%') : undefined}
             </div>
         );
      });
    }

    render() {
        const className = bem('stars', { 'edit': this.props.edit });
        return (
          <div className={className} style={this.props.style}>
            {this.renderStars()}
          </div>
        );
    }
}
