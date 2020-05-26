import React, {useState, useEffect} from 'react'

function Calculations(props){
  const [calculations, setCalculations] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/calculations?user_id=${props.user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            params: JSON.stringify({
                user_id: props.user.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setCalculations(data)
        })
    }, [])

    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }

    function deleteCalc(id){
      fetch(`http://localhost:3000/calculations/${id}`, {
        method: "DELETE",})
    .then(setCalculations(calculations.filter(i => i.id !== id)))
    }
    
    return(
        <div>
          {calculations.map((calculation, index) => (
              <div>
                Condition: {calculation.condition} 
                <br/>
                Result: <span dangerouslySetInnerHTML={{ __html: calculation.result }} />
                <button className="ui button danger" onClick={() => deleteCalc(calculation.id)}>Delete</button>
                <br/><br/>
              </div>
          ))}
        </div>
    )
} 

export default Calculations
