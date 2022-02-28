import React, { useState } from 'react';
import './App.css';
import examplePeople from './initialpeople';
import styles from './App.module.css';

import List from './components/list';
import PersonForm, { Person } from './components/PersonForm';

export interface IState{
  people: {
    name: string,
    age: number,
    url: string,
    note?: string
  }[]
}

function App() {
  const [people, setPeople] = useState<IState["people"]>(examplePeople);
  const [adding, setAdding] = useState<boolean>(false);

  const handlePersonAdd = (newPerson: Person):void => {
    let newPeople = people;
    newPeople.push(newPerson);
    setPeople([...newPeople]);
  }

  const handleDelete = (id: number):void => {
    let newPeople = people;
    newPeople.splice(id, 1);
    setPeople([...newPeople]);
  }

  return (
    <div className="App">
      <h1>People invited to my Party!</h1>
      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <List 
          people={people} 
          setPeople={setPeople}
          removeFromList={handleDelete}
        />
      </div>
      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <button 
          onClick={() => setAdding(adding => !adding)}
          className={styles.addPersonButton}  
        >
          { adding ? "hide adding person form" : "show adding person form" }
        </button>
      </div>
      {
        adding ? <PersonForm addPerson={handlePersonAdd} /> : null
      }
    </div>
  );
}

export default App;
