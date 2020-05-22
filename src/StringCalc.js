import React, {useState} from 'react'

function StringCalc(props){
    const [firstString, setFirstString] = useState("")
    const [secondString, setSecondString] = useState("")
    const [res, setRes] = useState("")

    const handleFirstStringChange = (evt) => {
        setFirstString(evt.target.value)
    }

    const handleSecondStringChange = (evt) => {
        setSecondString(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/string_calculation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                firstString,
                secondString
            })
        })
        .then(resp => console.log(resp.json()))
        setFirstString("")
        setSecondString("")
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div>
            <div style={formDivStyle}>
            <h1>String Calc</h1>
            <form class="ui form" onSubmit={handleSubmit}>
                <div class="field">
                    <label>String A</label>
                    <input value={firstString} onChange={handleFirstStringChange} type="text" placeholder="first string"/>
                </div>
                <div class="field">
                    <label>String B</label>
                    <input value={secondString} onChange={handleSecondStringChange} type="text" placeholder="second string"/>
                </div>
                <div class="field">
                  {res}
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
} 

export default StringCalc