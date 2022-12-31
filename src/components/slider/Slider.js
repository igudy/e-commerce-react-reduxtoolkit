import { useState, useEffect } from 'react';
import { sliderData } from './Slider-data';
import './Slider.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    console.log(slideLength);

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 :  currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1  : currentSlide - 1)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    // Auto scroll functionality
    useEffect(() => {
    if(autoScroll){
        function auto(){
            slideInterval = setInterval(nextSlide, intervalTime);
            }
            auto();
        }
        return() => clearInterval(slideInterval);
    }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className='slider'>
    <AiOutlineArrowLeft className="arrow-prev" onClick={prevSlide}/>
    <AiOutlineArrowRight className="arrow-next" onClick={nextSlide} />

    {sliderData.map((slide, index)=> {
        const {image, heading, desc} = slide;
        return (
            <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                
            {index === currentSlide && (
                <>
                    <img src={image} alt="slide"/>
                    <div className="content">
                        <h2>{heading}</h2>
                        <p>{desc}</p>
                        <hr/>
                        <a href='product' className='"--btn--btn-primary'>
                            Shop Now
                        </a>
                    </div>
                </>
            )}
            </div>
        )
    })}
    </div>
  );
};

export default Slider;