import React from 'react';

class ImageFigureComponent extends React.Component{
  render() {
  let style = {};
  if (this.props.style.position) {
      style = this.props.style.position;
  }

  if (this.props.style.rotate) {
    (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
      style[value] = 'rotate(' + this.props.style.rotate + 'deg)';
    }.bind(this));
  }

  return (
    <figure className='img-figure' style={style}>
      <img src={this.props.data.url} alt={this.props.data.title}/>
      <figcaption>
        <h2 className='img-title'>{this.props.data.title}</h2>
      </figcaption>
    </figure>
  );
}
}

ImageFigureComponent.defaultProps = {
};

export default ImageFigureComponent;