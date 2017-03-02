import React from 'react';

class ImageFigureComponent extends React.Component{
    render() {
        return (
            <figure className='img-figure'>
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