import React from "react"
import {nanoid} from "nanoid"


export default function QuestionElement(props) {

    function decode( str ) {
        return decodeURIComponent(escape(window.atob( str )));
      }

    function selectingStyle(index) {
        return props.selected === index ? "qe--button-selected":"qe--button"
    }

    function answerStyle(index) {
        if (index === props.insert_index) {
            return "qe--button-correct"
        } else if (index === props.selected) {
            return "qe--button-wrong"
        } else {
            return "qe--button"
        }

    }
    
    let answersArray = [...props.incorrect_answers]
    answersArray.splice(props.insert_index, 0, props.correct_answer)
    const answersElements = answersArray.map((answer, index) => {
        return (
            <button
                className={props.checking?answerStyle(index):selectingStyle(index)}
                key={nanoid()}
                id={index}
                onClick={() => props.onClickSelect(props.id, index)}
                disabled={props.checking}
            >
                {decode(answer)}
            </button>
        )
    })
    
    return (
        <div className="qe--container">
            <p>{decode(props.question)}</p>
            <div className="qe--button-container">
                {answersElements}
            </div>
            <hr className="qe--divider" />
        </div>
    )
}