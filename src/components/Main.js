require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ImageFigure from './ImageFigure';

var imagesData = require('../data/imageData.json');

imagesData.forEach(function(value) {
    value.url = require('../images/' + value.fileName);
});

class AppComponent extends React.Component {
  render() {
    let imageFigures = [];
    imagesData.forEach(function(value) {
         imageFigures.push(<ImageFigure data={value}/>);
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
            {imageFigures}
        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
