import React, { useState, useEffect } from "react"
import QuestionElement from "./QuestionElement"
import {nanoid} from "nanoid"


export default function App() {
    
    const [quizDb, updateDb] = useState([])
    const [selected, updateSelected] = useState([])
    const [answers, updateAnswers] = useState([])
    const [checking, updateChecking] = useState(false)
    const [newGame, updateNewGame] = useState(false)

    const quizLength = 5
    const choices = 4

    useEffect(function() {
        let initialSelected = []
        let initialAnswer = []
        for (let i = 0; i < quizLength; i++) {
            initialSelected.push("")
            initialAnswer.push(Math.floor(Math.random() * (choices)))
        }
        updateSelected(initialSelected)
        updateAnswers(initialAnswer)
    }, [newGame])

    useEffect(function() {
        fetch(`https://opentdb.com/api.php?amount=${quizLength}&encode=base64&type=multiple`)
        .then(res => res.json())
        .then(data => updateDb(data.results))
    }, [newGame])
    
    function onClickSelect(question, answer) {
        updateSelected(oldSelected => {
            let newSelected = [...oldSelected]
            newSelected[question] = answer
            return(newSelected)
        })
    }
    
    const quizElements = quizDb.map((question, index) => {
        return <QuestionElement 
            key={nanoid()}
            id={index}
            question={question.question}
            correct_answer={question.correct_answer}
            incorrect_answers={question.incorrect_answers}
            insert_index={answers[index]}
            selected={selected[index]}
            onClickSelect={onClickSelect}
            checking={checking}
        />
    })

    function calculateScore(selected, answers) {
        let count = 0
        for (let i = 0 ; i < quizLength; i++) {
            if (selected[i] === answers[i]) {
                count += 1
            }
        }
        return count;
    }

    function resetGame() {
        updateNewGame(oldNewGame => !oldNewGame)
        updateChecking(false)
    }
    
    return (
        <div>
            {quizElements}
            {!checking && <button onClick={() => updateChecking(true)}>Check answers</button>}
            {checking && <div>
                <p>You scored {calculateScore(selected, answers)} / {quizLength} correct answers</p>
                <button onClick={resetGame}>Play again?</button>
            </div>}
        </div>
    )
}