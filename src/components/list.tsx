import React, { useState } from "react";
import { IState } from "../App";
import styles from './List.module.css';
import { Person } from "./PersonForm";
import UserData from "./userData";

interface Props {
    people: IState["people"],
    removeFromList: (personIndex: number) => void,
    setPeople: React.Dispatch<React.SetStateAction<{
        name: string;
        age: number;
        url: string;
        note?: string | undefined;
    }[]>>
}

const List: React.FC<Props> = ({ people, removeFromList, setPeople }) => {
    
    const [more, setMore] = useState<number[]>([]);

    const editPerson = (id: number, newData: Person) => {
        let newPeople = people;
        newPeople[id] = newData;
        setPeople([...newPeople]);
    }

    const listElements = people.map((person, i) => (
        <div key={i}>
            <div className={styles.listItem}>
                <UserData 
                    person={person}
                    i={i}
                    removeFromList={removeFromList}
                    editPerson={editPerson}
                />
                {
                    more.includes(i) ? (
                        <>
                            <div className={styles.note}>
                                {person.note}
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                                <button className={styles.moreButton} onClick={()=>setMore(prev => {
                                    let newArr = prev.filter(el => el !== i);
                                    return [...newArr];
                                })}>close</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={[styles.note, styles.less].join(" ")}>
                                {person.note}
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                                <button className={styles.moreButton} onClick={()=>setMore(prev => {
                                    let newArr = prev;
                                    newArr.push(i);
                                    return [...newArr];
                                })}>expand</button>
                            </div>
                        </>
                    )
                }
            </div>
            <hr />
        </div>
    ))

    return ( 
        <div className={styles.listContainer}>
            {listElements}
        </div>
    )
}

export default List;

