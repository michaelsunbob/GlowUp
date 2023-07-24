import React, {useState} from "react"
import Quiz  from "../components/Quiz"
import "../styles/quiz.css"

//depending on whether the user is logged in or not, the screen will say, "Welcome Back (user name)"
//else, it will display the button to take the Quiz
// have the acct part setup before i can do this

export default function Home() {
    const [startQuiz, setStartQuiz] = useState(false)

    const handleStartQuiz = () => {
         setStartQuiz(true)
    }

    return (
    <div>
          {!startQuiz ?
            (<div className="container">
                <div className = "title"> Lets start off with some questions</div>
                
                <button onClick={handleStartQuiz} className="start-but">Take Skin Quiz</button> 
            </div>)
            : 
            ( <Quiz/> )}

    </div>

)}