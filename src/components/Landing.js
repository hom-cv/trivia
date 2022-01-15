import React from "react"

export default function Landing(props) {
    return (
        <main className="landing--container">
            <h1 className="landing--title">
                Trivia!
            </h1>
            <p className="landing--desc">
                Pick the correct answer of these mutliple choice questions!
            </p>
            <button 
                onClick={() => props.updateLanding(false)}
                className="landing--button">
                Start Quiz
            </button>
        </main>
    )
}