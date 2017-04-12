import React from 'react';

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
};

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'block',
  float: 'left'
};

export default class Stars extends React.Component {
    static defaultProps = {
        half: true,
        edit: true,
        count: 5,
        size: 15,
        char: '★',
        color1: 'gray',
        color2: '#ffd700'
    };

    constructor(props) {
        super(props);

        this.state = {
          uniqueness: (Math.random() + '').replace('.', ''),
          value: props.value || 0,
          stars: []
        };

        this.state.config = {
          count: props.count,
          size: props.size,
          char: props.char,
          // default color of inactive star
          color1: props.color1,
          // color of an active star
          color2: props.color2,
          edit: props.edit
        };
    }

    componentDidMount() {
        this.setState({
          stars: this.getStars(this.state.value)
      });
    }

    mouseOver(event) {
        event.preventDefault();

        const spread = event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left;
        const mouseAt = event.clientX - event.target.getBoundingClientRect().left;
        //console.log(mouseAt);
        //console.log(mouseAt);
        if (mouseAt > 0) {
            let index = Number(event.target.getAttribute('data-index'));

            const newValue = index + (mouseAt / spread);
            this.setValue(newValue, index);
        }
    }

    mouseLeave(event) {
        event.preventDefault();

        let index = Number(event.target.getAttribute('data-index'));
        if (index === 0) {
            this.setValue(0, index);
        } else if (index === (this.state.config.count - 1)) {
            this.setValue(this.state.config.count, index);
        }
    }

    clicked(event) {
        event.preventDefault();

        const { config } = this.state;
        if(!config.edit) {
            return;
        }

        let index = Number(event.target.getAttribute('data-index'));
        let value = index = index + 1;

        this.setState({
          value: value,
          stars: this.getStars(index)
        });

        if (this.props.onChange) {
          this.props.onChange(value);
        }
    }

    setValue(value, index) {
        this.state.stars.map((star, i) => {
            star.active = i < index || (i === index && value === (index + 1));
        });

        this.setState({ value: value });
    }

    getRate() {
        let stars;

        if(this.state.config.half) {
          stars = Math.floor(this.state.value);
        } else {
          stars = Math.round(this.state.value);
        }

        return stars;
    }

    getStars(activeCount) {
        if(typeof activeCount === 'undefined') {
          activeCount = this.getRate();
        }

        let stars = [];
        for(let i = 0; i < this.state.config.count; i++) {
          stars.push({
            active: i <= activeCount - 1
          });
        }

        return stars;
    }

    getStyleElement(color, uniqueness) {
        const width = ((this.state.value % 1) * 100) + '%';
        return `
          .react-stars-${uniqueness}:before {
            position: absolute;
            overflow: hidden;
            display: block;
            z-index: 1;
            top: 0; left: 0;
            width: ${width};
            content: attr(data-forhalf);
            color: ${color};
        }`;
    }

    renderStyleElement() {
        const { config, uniqueness } = this.state;
        return (
          <style dangerouslySetInnerHTML={{
            __html: this.getStyleElement(config.color2, uniqueness)
          }}>
          </style>
        );
    }

    renderStars() {
        const { uniqueness, stars, value } = this.state;
        const { color1, color2, size, char } = this.state.config;
        return stars.map((star, i) => {

          let starClass = '';
          if (value > 0 && Math.floor(value) === i) {
              starClass = `react-stars-${uniqueness}`;
          }

          const style = Object.assign({}, defaultStyles, {
            color: star.active ? color2 : color1,
            fontSize: `${size}px`
          });

          return (
             <span key={i}
               className={starClass}
               style={style}
               data-index={i}
               data-forhalf={char}
               onMouseOver={this.mouseOver.bind(this)}
               onMouseLeave={this.mouseLeave.bind(this)}
               onClick={this.clicked.bind(this)}>
               {char}
             </span>
         );
      });
    }

    render() {
        const { className } = this.props;
        return (
          <div className={className} style={parentStyles}>
            {this.renderStyleElement()}
            {this.renderStars()}
          </div>
        );
    }
}
