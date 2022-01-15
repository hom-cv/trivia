import React from "react"
import {nanoid} from "nanoid"


export default function QuestionElement(props) {
    
    let answersArray = [...props.incorrect_answers]
    answersArray.splice(props.insert_index, 0, props.correct_answer)
    const answersElements = answersArray.map((answer, index) => {
        return (
            <button
                className={props.selected === index?"qe--button-selected":"qe--button"}
                key={nanoid()}
                id={index}
                onClick={() => props.onClickSelect(props.id, index)}
                disabled={props.checking}
            >
                {answer}
            </button>
        )
    })
    
    return (
        <div>
            <p>{props.question}</p>
            <p>{answersElements}</p>
        </div>
    )
}