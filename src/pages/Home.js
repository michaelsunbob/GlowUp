import React, {useState} from "react"
import Quiz  from "../components/Quiz"

//depending on whether the user is logged in or not, the screen will say, "Welcome Back (user name)"
//else, it will display the button to take the Quiz

export default function Home() {
    const [startQuiz, setStartQuiz] = useState(false)

    const handleStartQuiz = () => {
         setStartQuiz(true)
    }

    return (
    <div>
          {!startQuiz ?
            (<div>
                <div> Lets start off with some questions</div>
                <button onClick={handleStartQuiz} style = {{padding: 10, backgroundColor: "#441928", color: "white"} }>Take Skin Quiz</button> 
            </div>)
            : 
            ( <Quiz/> )}

    </div>

)}