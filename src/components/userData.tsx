import React, { useState } from "react";
import buttonStyle from '../App.module.css';
import styles from './List.module.css';
import { Person } from "./PersonForm";

interface Props {
    person: Person,
    i: number,
    removeFromList: (personIndex: number) => void,
    editPerson: (id: number, newData: Person) => void
}

const UserData: React.FC<Props> = ({ person, i, removeFromList, editPerson }) => {

    const [newName, setNewName] = useState(person.name);
    const [newAge, setNewAge] = useState(person.age.toString());
    const [newNote, setNewNote] = useState(person.note);
    const [editing, setEditing] = useState(false);

    return ( 
        <div className={styles.headContainer}>
            <div className={styles.leftInfoContainer}>
                <img src={person.url} alt={person.name} />
                <div className={styles.namesContainer}>
                    {
                        editing ? (
                            <div className={styles.editingForm}>
                                <input type="text" name="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                                <input type="text" name="age" value={newAge} onChange={(e) => setNewAge(e.target.value)}/>
                                <br />
                                <textarea 
                                    name="notes" 
                                    value={newNote} 
                                    onChange={(e)=>setNewNote(e.target.value)}
                                    className={styles.editingTextarea}
                                />
                            </div>
                        ) : (
                            <>
                                <h2>{person.name}</h2>
                                <h2 className={styles.age}>age: {person.age}</h2>
                            </>
                        )
                    }
                </div>
            </div>
            <div>
                {
                    editing ? (
                        <button 
                            className={buttonStyle.addPersonButton} 
                            style={{padding: "10px"}}
                            onClick={()=>{
                                editPerson(i, {
                                    name: newName,
                                    age: parseInt(newAge),
                                    url: person.url,
                                    note: newNote
                                })
                                setEditing(false)
                            }}
                        >
                            submit changes
                        </button>
                    ) : null
                }
                <button 
                    className={buttonStyle.addPersonButton} 
                    style={editing ? {padding: "10px", backgroundColor: "salmon"} : {padding: "10px"}}
                    onClick={() => setEditing(prev => !prev )}
                >
                    {editing ? "cancel" : "edit"}
                </button>
                <button 
                    className={buttonStyle.addPersonButton} 
                    style={{backgroundColor: "salmon", padding: "10px"}}
                    onClick={removeFromList.bind(this, i)}
                >
                    remove from list
                </button>
            </div>
        </div>
    )
}

export default UserData;