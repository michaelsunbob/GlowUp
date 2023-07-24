import React, { useState } from "react"
import "../styles/quiz.css"
import Home from "../pages/Home"


const Quiz = () => {
    const [age, setAge] = useState('')
    const [skinType, setSkinType] = useState('')
    const [skinConditions, setSkinConditions] = useState('')
    const [skinConcerns, setSkinConcerns] = useState('')
    const [currQuestion, setCurrQuestion] = useState(1) 

    const handleNext = () => {
        setCurrQuestion((onPrev) => onPrev + 1)
    }
    
    const handlePrev = () => {
        setCurrQuestion((onNext) => onNext - 1)
    }

    const handleStart = () => {
       /* */ 
    }
    
    const handleSubmit =() =>{
        /* */
    }


    return (
     <div className = "container">
        {currQuestion === 1 && (
            <div>
                <h2 className="question">What is your age?</h2>
                <form onSubmit ={handleSubmit}>
                    <label>
                    <input className="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <br/>
                    <button className = "prev "onClick={handleStart}></button>
                    <button className = "next" onClick={handleNext}></button>
                </form>
            </div>
          )}

        {currQuestion === 2 && (
            <div>
                <h2 className = "question">What is your skin type?</h2>
                <form onSubmit ={handleSubmit} >
                    <div className = "options">
                    <label>
                        <input type="radio" name='skinType' value='oily' checked={skinType === 'oily'} onChange={() => setSkinType('oily')} />
                         Oily
                    </label>
                    <label>
                        <input type="radio" name="skinType" value="dry" checked={skinType === 'dry'} onChange={() => setSkinType('dry')} />
                        Dry
                    </label>
                    <label>
                        <input type="radio" name="skinType" value="combination" checked={skinType === 'combination'} onChange={() => setSkinType('combination')} />
                        Combination
                    </label>
                    <label>
                        <input type="radio" name="skinType" value="normal" checked={skinType === 'normal'} onChange={() => setSkinType('normal')} />
                        Normal
                    </label>
                    </div>
                    <br/>
                    <button className = "prev" onClick={handlePrev}></button>
                    <button  className = "next" onClick={handleNext}></button>
                </form>
            </div>
      )}  

        {currQuestion === 3 && (
            <div className="checkbox-container">
                <h2 className = "question">Do you have any skin conditions? Select all that apply</h2>
                <form onSubmit ={handleSubmit}>
                    <div className="checkbox-options">
                    <label>
                        <input type="checkbox" value="None" checked={skinConditions.includes('None')} 
                               onChange={() => setSkinConditions((prevConditions) =>prevConditions.includes('None') 
                               ? prevConditions.filter((condition) => condition !== 'None') : [...prevConditions, 'None'])} />
                                None
                    </label>
                    <label>
                        <input type="checkbox" value="Psoriasis" checked={skinConditions.includes('Psoriasis')} 
                               onChange={() =>setSkinConditions((prevConditions) => prevConditions.includes('Psoriasis') 
                               ? prevConditions.filter((condition) => condition !== 'Psoriasis') : [...prevConditions, 'Psoriasis'])} />
                               Psoriasis
                    </label>
                    <label>
                        <input type="checkbox" value="Eczema" checked={skinConditions.includes('Eczema')} 
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Eczema') 
                               ? prevConditions.filter((condition) => condition !== 'Eczema') : [...prevConditions, 'Eczema'])} />
                               Eczema
                    </label>
                    <label>
                        <input type="checkbox" value="Hyper-pigmentation" checked={skinConditions.includes('Hyper-pigmentation')}
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Hyper-pigmentation') 
                               ? prevConditions.filter((condition) => condition !== 'Hyper-pigmentation') : [...prevConditions, 'Hyper-pigmentation'])} />
                               Hyper-pigmentation
                    </label>
                    <label> 
                        <input type="checkbox" value="Rosacea" checked={skinConditions.includes('Rosacea')}
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Rosacea') 
                               ? prevConditions.filter((condition) => condition !== 'Rosacea') : [...prevConditions, 'Rosacea'])} />
                               Rosacea
                    </label>
                    </div>
                    <button className = "prev" onClick={handlePrev}></button>
                    <button className = "next" onClick={handleNext}></button>
                </form>
            </div>
        )}

        {currQuestion === 4 && (
            <div className="checkbox-container">
                <h2 className = "question">Do you have any skin concerns? Select all that apply. </h2>
                <form onSubmit ={handleSubmit}>
                    <div className ="checkbox-options">
                    <label>
                        <input type="checkbox" value="None" checked={skinConcerns.includes('None')} 
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('None') 
                               ? prevConcerns.filter((concern) => concern !== 'None') : [...prevConcerns, 'None'])} />
                                None
                    </label>
                    <label>
                        <input type="checkbox" value="Acne and Blemishes" checked={skinConcerns.includes('Acne and Blemishes')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Acne and Blemishes') 
                               ? prevConcerns.filter((concern) => concern !== 'Acne and Blemishes') : [...prevConcerns, 'Acne and Blemishes'])} />
                               Acne and Blemishes 
                    </label>
                    <label>
                        <input type="checkbox" value="Anti-Aging" checked={skinConcerns.includes('Anti-Aging')} 
                                onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Anti-Aging') 
                                ? prevConcerns.filter((concern) => concern !== 'Anti-Aging') : [...prevConcerns, 'Anti-Aging'])} />
                                Anti-Aging
                    </label>
                    <label>
                        <input type="checkbox" value="Blackheads" checked={skinConcerns.includes('Blackheads')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Blackheads') 
                               ? prevConcerns.filter((concern) => concern!== 'Blackheads') : [...prevConcerns, 'Blackheads'])} />
                                Blackheads
                    </label>
                    <label>
                        <input type="checkbox" value="Dark Circles" checked={skinConcerns.includes('Dark Circles')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Dark Circles') 
                               ? prevConcerns.filter((concern) => concern !== 'Dark Circles') : [...prevConcerns, 'Dark Circles'])} />
                               Dark Circles
                    </label>
                    <label>
                        <input type="checkbox" value="Dullness" checked={skinConcerns.includes('Dullness')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Dullness') 
                               ? prevConcerns.filter((concern) => concern !== 'Dullness') : [...prevConcerns, 'Dullness'])} />
                               Dullness
                    </label>
                    </div>
                    <button className = "prev" onClick={handlePrev}></button>
                    <br/>
                    <button type = "submit"> Submit </button>
                </form>
            </div>
        )}
    </div> 
    )
};

export default Quiz