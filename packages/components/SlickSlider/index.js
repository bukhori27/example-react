import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import './style.scss';

class SlickSlider extends React.Component{
    handleClick (item) {
        this.props.handleClick(item)
    }
    render(){
        const { list, Dots, Infinite, SlidesToShow, CenterMode, AutoplaySpeed, Autoplay } = this.props

        var settings = {
            dots: Dots,
            className: "slider variable-width",
            infinite: Infinite,
            speed: 500,
            slidesToShow: SlidesToShow,
            slidesToScroll: 1,
            centerMode: CenterMode,
            autoplay: Autoplay,
            autoplaySpeed: AutoplaySpeed,
        };        
        return (
            <Slider {...settings}>
            {
                list.map((item, index) => {                          
                    return (
                        <div className="slick-image" key={index} >
                            <img src={item.image} alt={item.name} onClick={this.handleClick.bind(this, item)}/>            
                        </div>
                    );
                })
            }
            </Slider>
        );
    }
}
SlickSlider.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        Dots: PropTypes.bool,
        Infinite: PropTypes.bool,
        slidesToShow: PropTypes.number,
        CenterMode: PropTypes.bool,
        Autoplay: PropTypes.bool,
        AutoplaySpeed: PropTypes.number
    }))
};

export default SlickSlider;