import React, { useState } from "react"
import "../styles/quiz.css"
import Quiz from "../components/Quiz"


export default function Home() {
    const [startQuiz, setStartQuiz] = useState(false)

    const handleStartQuiz = () => {
        setStartQuiz(true)
    }

    return (
        <div>
            {!startQuiz ?
                (<div className="container">
                    <div className="title"> Lets start off with some questions</div>
                    <button onClick={handleStartQuiz} className="start-but">Take Skin Quiz</button>
                </div>)
                :
                (<Quiz />)}

        </div>

    )
}
