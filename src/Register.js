// src/Register.js
import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './valiidation';

const initialState = {
  username: '',
  email: '',
  password: '',
  age: '',
  address: {
    country: '',
    city: ''
  },
  phones: ['', '']
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value
        }
      };
    case 'SET_PHONE':
      const newPhones = [...state.phones];
      newPhones[action.index] = action.value;
      return {
        ...state,
        phones: newPhones
      };
    default:
      return state;
  }
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>First Name</label>
        <input {...register('firstname')} />
        {errors.firstname && <p>{errors.firstname.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('lastname')} />
        {errors.lastname && <p>{errors.lastname.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Address</label>
        <input {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>Country</label>
        <input
          value={state.address.country}
          onChange={(e) =>
            dispatch({ type: 'SET_ADDRESS', field: 'country', value: e.target.value })
          }
        />
      </div>
      <div>
        <label>City</label>
        <input
          value={state.address.city}
          onChange={(e) =>
            dispatch({ type: 'SET_ADDRESS', field: 'city', value: e.target.value })
          }
        />
      </div>
      <div>
        <label>Phone 1</label>
        <input
          value={state.phones[0]}
          onChange={(e) =>
            dispatch({ type: 'SET_PHONE', index: 0, value: e.target.value })
          }
        />
      </div>
      <div>
        <label>Phone 2</label>
        <input
          value={state.phones[1]}
          onChange={(e) =>
            dispatch({ type: 'SET_PHONE', index: 1, value: e.target.value })
          }
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
