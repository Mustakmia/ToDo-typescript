import React, { useState } from "react";
import styles from './PersonForm.module.css';
import buttonStyle from '../App.module.css';

interface Props {
    addPerson: (person: Person) => void;
}

export interface Person {
    name: string,
    age: number,
    url: string,
    note?: string
}

const PersonForm: React.FC<Props> = ({ addPerson }) => {
    const [person, setPerson] = useState<Person>({
        name: "",
        age: 0,
        url: "",
        note: ""
    })

    const modifyPersonValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newPerson = person;
        switch (e.target.name) {
            case "name": newPerson.name = e.target.value; break;
            case "age": newPerson.age = parseInt(e.target.value); break;
            case "url": newPerson.url = e.target.value; break;
            case "notes": newPerson.note = e.target.value; break;
        }

        setPerson(newPerson);
    }

    return ( 
        <div className={styles.formContainer}>
            <div className={styles.formInnerContainer}>
                <input name="name" type="text" placeholder="name" onChange={modifyPersonValues}/>
                <input name="url" type="text" placeholder="image url" onChange={modifyPersonValues}/>
                <input name="age" type="number" placeholder="age" onChange={modifyPersonValues}/>
                <textarea name="notes" placeholder="notes" onChange={modifyPersonValues}/>
                <button className={buttonStyle.addPersonButton} onClick={()=>addPerson(person)}>Add Person</button>
            </div>
        </div>
    )
}

export default PersonForm;