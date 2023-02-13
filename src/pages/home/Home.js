import React from 'react';
import Product from '../../components/product/Product';
// import './Home.module.scss';
import Slider from '../../components/slider/Slider';

const Home = () => {
  return (
    <div>
      <Slider />
      <Product />
    </div>
  )
}

export default Home;