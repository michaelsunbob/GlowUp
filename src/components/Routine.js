import React, { useEffect, useState } from "react"
import { RoutineForm } from "./RoutineForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon, faTrash } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuidv4 } from "uuid"
import { auth } from "../firebase"
import {
    getFirestore, collection,
    addDoc, onSnapshot, query,
    where, doc, deleteDoc
} from "firebase/firestore"

export const Routine = () => {
    const [morningRoutine, setMorningRoutine] = useState([])
    const [nightRoutine, setNightRoutine] = useState([])
    const [clicked, setClicked] = useState('')

    const db = getFirestore()
    const colRef = collection(db, 'morningroutine')
    const colRef2 = collection(db, 'nightroutine')

    useEffect(() => {
        if (auth.currentUser != null) {
            const q = query(colRef, where("userId", "==", auth.currentUser.uid))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                let templist = []
                snapshot.docs.forEach((doc) => {
                    templist.push({ ...doc.data(), id: doc.id })
                })
                setMorningRoutine(templist)
            })

            return () => unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (auth.currentUser != null) {
            const q = query(colRef2, where("userId", "==", auth.currentUser.uid))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                let templist = []
                snapshot.docs.forEach((doc) => {
                    templist.push({ ...doc.data(), id: doc.id })
                })
                setNightRoutine(templist)
            })

            return () => unsubscribe()
        }
    }, [])

    const addMorningTask = (task) => {
        if (auth.currentUser != null) {
            addDoc(colRef, {
                id: uuidv4(), task: task, userId: auth.currentUser.uid
            })
        }
    }

    const addNightTask = (task) => {
        if (auth.currentUser != null) {
            addDoc(colRef2, {
                id: uuidv4(), task: task, userId: auth.currentUser.uid
            })
        }
    }

    const deleteMorningTask = (id) => {
        const docRef = doc(db, 'morningroutine', id)
        deleteDoc(docRef)
    }

    const deleteNightTask = (id) => {
        const docRef = doc(db, 'nightroutine', id)
        deleteDoc(docRef)
    }

    const toggle = (current) => {
        if (current === clicked) {
            return setClicked(null)
        }

        setClicked(current)
    }

    return (
        <div className="routinewrapper">
            <div className="morning" onClick={() => toggle("morning")}>
                <h1>Morning Routine</h1>
                <FontAwesomeIcon icon={faSun} className="icon" />
            </div>
            <RoutineForm addTask={addMorningTask} />
            {clicked === "morning" ? (
                morningRoutine.map((task) => {
                    return (
                        <>
                            <div className="morning-item">
                                <li>
                                    {task.task}
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteMorningTask(task.id)} className="trash" />
                                </li>
                            </div>
                        </>
                    )
                })
            ) : null}
            <div className="night" onClick={() => toggle("night")}>
                <h1>Night Routine</h1>
                <FontAwesomeIcon icon={faMoon} className="icon" />
            </div>
            <RoutineForm addTask={addNightTask} />
            {clicked === "night" ? (
                nightRoutine.map((task) => {
                    return (
                        <>
                            <div className="night-item">
                                <li>
                                    {task.task}
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteNightTask(task.id)} className="trash" />
                                </li>
                            </div>
                        </>
                    )
                })
            ) : null}
        </div>
    )
}