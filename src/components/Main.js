require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import ImageFigure from './ImageFigure';

var imagesData = require('../data/imageData.json');


imagesData.forEach(function(value) {
  value.url = require('../images/' + value.fileName);
});

class AppComponent extends React.Component {
  getRandomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
  initOneImagePosition = (imageData, range) => {
    let left, top;
    left = this.getRandomNum(range.x[0], range.x[1]);
    top = this.getRandomNum(range.y[0], range.y[1]);
    imageData = {
      'position': {
        'top': top,
        'left': left
      },
      'rotate': this.getRandomNum(-30, 30)
  };

    return imageData;
  }

  initImages = (centerImageIndex) => {
    let newImagesData = [];
    imagesData[centerImageIndex].position = this.centerImgPositin;
    imagesData[centerImageIndex].rotate = 0;
    newImagesData[centerImageIndex] = imagesData[centerImageIndex];
    var initOneLeftSectionImage = true;
    for (let index = 0; index < imagesData.length; index++) {
      let result;
      if (index === centerImageIndex) {
        continue;
      }

      if (initOneLeftSectionImage) {
        result = this.initOneImagePosition(imagesData[index], this.leftSectionRange);
        initOneLeftSectionImage = !initOneLeftSectionImage;
      } else {
        result = this.initOneImagePosition(imagesData[index], this.rightSectionRange);
        initOneLeftSectionImage = !initOneLeftSectionImage;
      }
      newImagesData[index] = result;
    }

    return newImagesData;
  }

  // When component mounting, declear var 
  // If this.state changes, page will render again
  constructor(props) {
    super(props);
    this.leftSectionRange = {
      'x': [],
      'y': []
    },
    this.rightSectionRange = {
      'x': [],
      'y': []
    },
    this.topSectionRange = {
      'x': [],
      'y': []
    };
    this.centerImgPositin = {
        'top': 0,
        'left': 0
    };
    this.state = {
      imagesStatu: []
    };
  }

  // Until the component did mount, so we can get the Const about image's range we need
  componentDidMount() {
    let stageDom = ReactDOM.findDOMNode(this.refs.stage),
      stageHeight = stageDom.scrollHeight,
      stageWidth =  stageDom.scrollWidth,
      halfStageHeight = stageDom.scrollHeight / 2,
      halfStageWidth =  stageDom.scrollWidth / 2,
      imageFigureDom = ReactDOM.findDOMNode(this.refs.imageFigure0),
      imageFigureHeight = imageFigureDom.scrollHeight,
      imageFigureWidth =  imageFigureDom.scrollWidth,
      halfImageFigureHeight = imageFigureDom.scrollHeight / 2,
      halfImageFigureWidth =  imageFigureDom.scrollWidth / 2,
      commonYRange = [-halfImageFigureHeight, stageHeight - halfImageFigureHeight];

    this.centerImgPositin = {
        'top': halfStageHeight - halfImageFigureHeight,
        'left': halfStageWidth - halfImageFigureWidth
    };

    this.leftSectionRange.x[0] = -halfImageFigureWidth;
    this.leftSectionRange.x[1] = halfStageWidth - halfImageFigureWidth * 3;
    this.leftSectionRange.y[0] = commonYRange[0];
    this.leftSectionRange.y[1] = commonYRange[1];

    this.rightSectionRange.x[0] = halfStageWidth + halfImageFigureWidth;
    this.rightSectionRange.x[1] = stageWidth - halfImageFigureWidth;
    this.rightSectionRange.y[0] = commonYRange[0];
    this.rightSectionRange.y[1] = commonYRange[1];

    this.topSectionRange.y[0] = -halfImageFigureHeight;
    this.topSectionRange.y[1] = halfStageHeight - halfImageFigureHeight * 3;

    this.topSectionRange.x[0] = halfStageWidth - imageFigureWidth;
    this.topSectionRange.x[1] = halfStageWidth;

    let imagesStatu = this.initImages(0);
    this.setState({
      imagesStatu: imagesStatu
    });
  }

  render() {
    var imageFigures = [];
    imagesData.forEach(function(value, index) {
      if (!this.state.imagesStatu[index]) {
        this.state.imagesStatu[index] = {
          position: {
            left: 0,
            top: 0
          },
          'rotate': 0
        }
      }

      imageFigures.push(
        <ImageFigure data={value} ref={'imageFigure' + index} style={this.state.imagesStatu[index]}/>
      );
    }.bind(this))

    return (
      <section className='stage' ref='stage'>
        <section className='img-sec'>
            {imageFigures}
        </section>
        <nav className='controller-nav'>

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
