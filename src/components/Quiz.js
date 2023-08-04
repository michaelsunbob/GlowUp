import React, { useState, useEffect } from "react"
import axios from "axios"
import "../styles/quiz.css"

const Quiz = () => {
    const [age, setAge] = useState('')
    const [skinType, setSkinType] = useState('')
    const [skinConditions, setSkinConditions] = useState('')
    const [skinConcerns, setSkinConcerns] = useState('')
    const [currQuestion, setCurrQuestion] = useState(1) 
    const [recommendedProducts, setRecommendedProducts] = useState('')

    useEffect(() => {
        console.log('recommendedProducts:', recommendedProducts)
      }, [recommendedProducts])

    const handleNext = () => {
        setCurrQuestion((onPrev) => onPrev + 1)
    }
    
    const handlePrev = () => {
        setCurrQuestion((onNext) => onNext - 1)
    }

    const handleStart = () => {
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let userPreferences = [...skinConditions, ...skinConcerns]

        if (age > 25) {
            userPreferences = [...userPreferences, "retinol", "anti-aging"]
          }
    
        try {
          const responses = await Promise.all(
            userPreferences.map(async (concern) => {
              const keywords = [skinType, concern].filter(Boolean).join(' ')
    
              const response = await axios.get("https://sephora.p.rapidapi.com/products/v2/list", {
                params: {
                  country: "SG",
                  language: "en-SG",
                  query: keywords,
                  category: "skincare", 
                  limit: 10,
                },
                headers: {
                  'X-RapidAPI-Key': '508d2a55bdmshf292a5a473cc839p1cf4d7jsn3b570d81946b',
                  'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
                },
              });
    
              return response.data
            })
          );
          const allProducts = responses.reduce((acc, curr) => acc.concat(curr), [])
          setRecommendedProducts(allProducts)
        } catch (error) {
          console.error(error)
        }
      };    


    return (
     <div className = "container">
        <form onSubmit={handleSubmit}>
        {currQuestion === 1 && (
            <div>
                <h2 className="question">What is your age?</h2>
                
                    <label htmlFor="age">
                    <input  id="age" name="age" className="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <br/>
                
                <button className = "prev "onClick={handleStart}></button>
                <button className = "next" onClick={handleNext}></button>
            </div>
          )}

        {currQuestion === 2 && (
            <div>
                <h2 className = "question">What is your skin type?</h2>
                
                    <div className = "options">
                    <label htmlFor="oily">
                        <input id="oily" type="radio" name='skinType' value='oily' checked={skinType === 'oily'} onChange={() => setSkinType('oily')} />
                         Oily
                    </label>
                    <label htmlFor="dry">
                        <input id="dry" type="radio" name="skinType" value="dry" checked={skinType === 'dry'} onChange={() => setSkinType('dry')} />
                        Dry
                    </label>
                    <label htmlFor="combo">
                        <input id ="combo" type="radio" name="skinType" value="combination" checked={skinType === 'combination'} onChange={() => setSkinType('combination')} />
                        Combination
                    </label>
                    <label htmlFor="normal">
                        <input id="normal" type="radio" name="skinType" value="normal" checked={skinType === 'normal'} onChange={() => setSkinType('normal')} />
                        Normal
                    </label>
                    </div>
                    <br/>
                
                <button className = "prev" onClick={handlePrev}></button>
                <button  className = "next" onClick={handleNext}></button>
            </div>
      )}  

        {currQuestion === 3 && (
            <div className="checkbox-container">
                <h2 className = "question">Do you have any skin conditions? Select all that apply</h2>
                    <div className="checkbox-options">
                    <label htmlFor="none">
                        <input id="none" type="checkbox" value="None" name="none" checked={skinConditions.includes('None')} 
                               onChange={() => setSkinConditions((prevConditions) =>prevConditions.includes('None') 
                               ? prevConditions.filter((condition) => condition !== 'None') : [...prevConditions, 'None'])} />
                                None
                    </label>
                    <label htmlFor="psoriasis">
                        <input id="psoriasis"type="checkbox" value="Psoriasis" name="psoriasis"checked={skinConditions.includes('Psoriasis')} 
                               onChange={() =>setSkinConditions((prevConditions) => prevConditions.includes('Psoriasis') 
                               ? prevConditions.filter((condition) => condition !== 'Psoriasis') : [...prevConditions, 'Psoriasis'])} />
                               Psoriasis
                    </label>
                    <label htmlFor="eczema">
                        <input id = "eczema" name="eczema" type="checkbox" value="Eczema" checked={skinConditions.includes('Eczema')} 
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Eczema') 
                               ? prevConditions.filter((condition) => condition !== 'Eczema') : [...prevConditions, 'Eczema'])} />
                               Eczema
                    </label>
                    <label htmlFor="hyper-p">
                        <input id="hyper-p" name ="hyper-p" type="checkbox" value="Hyper-pigmentation" checked={skinConditions.includes('Hyper-pigmentation')}
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Hyper-pigmentation') 
                               ? prevConditions.filter((condition) => condition !== 'Hyper-pigmentation') : [...prevConditions, 'Hyper-pigmentation'])} />
                               Hyper-pigmentation
                    </label>
                    <label htmlFor="rosacea"> 
                        <input id="rosacea" name="rosacea" type="checkbox" value="Rosacea" checked={skinConditions.includes('Rosacea')}
                               onChange={() => setSkinConditions((prevConditions) => prevConditions.includes('Rosacea') 
                               ? prevConditions.filter((condition) => condition !== 'Rosacea') : [...prevConditions, 'Rosacea'])} />
                               Rosacea
                    </label>
                    </div>
                <button className = "prev" onClick={handlePrev}></button>
                <button className = "next" onClick={handleNext}></button>
            </div>
        )}

        {currQuestion === 4 && (
            <div className="checkbox-container">
                <h2 className = "question">Do you have any skin concerns? Select all that apply. </h2>
                
                    <div className ="checkbox-options">
                    <label htmlFor="none2">
                        <input id="none2" name="none2" type="checkbox" value="None" checked={skinConcerns.includes('None')} 
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('None') 
                               ? prevConcerns.filter((concern) => concern !== 'None') : [...prevConcerns, 'None'])} />
                                None
                    </label>
                    <label htmlFor="ac+bl">
                        <input name="ac+bl" id="ac+bl" type="checkbox" value="Acne and Blemishes" checked={skinConcerns.includes('Acne and Blemishes')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Acne and Blemishes') 
                               ? prevConcerns.filter((concern) => concern !== 'Acne and Blemishes') : [...prevConcerns, 'Acne and Blemishes'])} />
                               Acne and Blemishes 
                    </label>
                    <label htmlFor="anti-a">
                        <input id ="anti-a" name="anti-a"type="checkbox" value="Anti-Aging" checked={skinConcerns.includes('Anti-Aging')} 
                                onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Anti-Aging') 
                                ? prevConcerns.filter((concern) => concern !== 'Anti-Aging') : [...prevConcerns, 'Anti-Aging'])} />
                                Anti-Aging
                    </label>
                    <label htmlFor="blackheads">
                        <input id="blackheads" name = "blackheads" type="checkbox" value="Blackheads" checked={skinConcerns.includes('Blackheads')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Blackheads') 
                               ? prevConcerns.filter((concern) => concern!== 'Blackheads') : [...prevConcerns, 'Blackheads'])} />
                                Blackheads
                    </label>
                    <label htmlFor="dark-c">
                        <input id="dark-c" name="dark-c" type="checkbox" value="Dark Circles" checked={skinConcerns.includes('Dark Circles')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Dark Circles') 
                               ? prevConcerns.filter((concern) => concern !== 'Dark Circles') : [...prevConcerns, 'Dark Circles'])} />
                               Dark Circles
                    </label>
                    <label htmlFor="dullness">
                        <input id = "dullness" name="dullness" type="checkbox" value="Dullness" checked={skinConcerns.includes('Dullness')}
                               onChange={() => setSkinConcerns((prevConcerns) => prevConcerns.includes('Dullness') 
                               ? prevConcerns.filter((concern) => concern !== 'Dullness') : [...prevConcerns, 'Dullness'])} />
                               Dullness
                    </label>
                    </div>
                    <br/>
                
                <button className = "prev" onClick={handlePrev}></button>
                <button type = "submit"> Submit </button>
            </div>
        )}
        </form>
    </div> 
    )
}

export default Quiz