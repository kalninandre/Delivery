import React, { useState, useEffect }from 'react';

import Card from '../UI/Card';

import './AvaliableMeals.css'
import MealItem from './MealItem';

const AvaliableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Meals = async () => {
    setIsLoading(true);
    const response = await fetch('https://restaurant-app-backend-default-rtdb.firebaseio.com/meals.json');
  
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
    Meals()
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
         Loading...
    </div>
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