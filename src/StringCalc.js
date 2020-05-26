import React, {useState, useCallback} from 'react'

function StringCalc(props){

    const [firstString, setFirstString] = useState("")
    const [secondString, setSecondString] = useState("")
    const [condition, setCondition] = useState("")
    const [result, setResult] = useState([])

    const handleFirstStringChange = (evt) => {
        setFirstString(evt.target.value)
    }

    const handleSecondStringChange = (evt) => {
        setSecondString(evt.target.value)
    }

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/string_calculation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                firstString,
                secondString,
                user_id: props.user.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            setCondition(data.cond)
            setResult(data.res)
        })
    }, [setCondition, setResult, props.user.id, firstString, secondString])

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
                    {condition}
                    <br/>
                    <br/>
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
} 

export default StringCalc
