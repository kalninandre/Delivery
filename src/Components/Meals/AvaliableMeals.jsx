import React from 'react';

import Card from '../UI/Card';

import './AvaliableMeals.css'
import MealItem from './MealItem';

const meals = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvaliableMeals = () => {
    return (
        <section className='meals'>
          <Card>
            <ul>
              {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                    id={meal.id}
                    />
                </li>
              ))}
            </ul>
          </Card>
        </section>
    );
};

export default AvaliableMeals;