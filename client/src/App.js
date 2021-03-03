import { React, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import cityList from './cityList.json'
import Search from 'react-search';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');

  const [asyncItems, setAsyncItems] = useState('');

  const items = [
    { id: 0, value: 'ruby' },
    { id: 1, value: 'javascript' },
    { id: 2, value: 'lua' },
    { id: 3, value: 'go' },
    { id: 4, value: 'julia' }
  ]

  const getItemsAsync = (searchValue, cb) => {
    let results = items.filter(function(i,n){
      return n.value === searchValue.toLowerCase()
    })
      
    if (results != undefined) {
      let items = results.map((res, i) => {
        return { id: i, value: res.value }
      })
      setAsyncItems(items)
      cb(searchValue)
    }

  }


  return (
    <div>
      <Search 
      items={asyncItems}
        getItemsAsync={getItemsAsync}
      />
    </div>
  );
}

export default App;
