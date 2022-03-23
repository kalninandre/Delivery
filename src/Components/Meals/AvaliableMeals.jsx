import React, { useState, useEffect }from 'react';
import { DotLoader } from 'react-spinners'; 

import Card from '../UI/Card';

import './AvaliableMeals.css'
import MealItem from './MealItem';

const AvaliableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  const Meals = async () => {
    const response = await fetch('https://restaurant-app-backend-default-rtdb.firebaseio.com/meals.json');

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
  
    const responseData = await response.json();
  
    const meals = []
    for (const key in responseData) {
      meals.push({
        id:key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }
  
    setMeals(meals);
    setIsLoading(false);
  }

  useEffect(() => {
    
      Meals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message)
      });
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <DotLoader size={50} color={'white'} css={'override'}/>
      </div>
    )
  }

  if (httpError !== '') {
    return (
      <p className='error-message'>{httpError}</p>
    )
  }

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