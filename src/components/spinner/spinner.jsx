import React from 'react'

import './spinner.css'
import pizza from './svg/pizza2.svg'
import pizzaBig from './svg/pizza-big.svg'
import ripple from './svg/ripple.svg'

const RippleSpinner = () => (
  <img className="ripple" src={ripple} alt="Ripple spinner" />
)

const PizzaSpinner = () => (
  <img className="pizza" src={pizza} alt="Pizza spinner" />
)

const FoodSpinner = () => (
  <div className="wrapper-loader">
    <img className="food-loader" src={pizzaBig} alt="Big pizza spinner" />
  </div>
)

export { PizzaSpinner, FoodSpinner, RippleSpinner }
