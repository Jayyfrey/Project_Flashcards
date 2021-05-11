import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {

    const history = useHistory();
    const [currentCardNumber,setCurrentCardNumber] = useState(1);
    const [cardFlipped,setCardFlipped] = useState(false);
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");
    const [currentCards, setCurrentCards] = useState("Not Fetched Yet");
    const parameters = useParams();
    const deckId = parameters.deckId;

    useEffect(() => {
        async function getCardsAndDeck () {
            const fetchedDeck =  await readDeck(deckId);
            setCurrentDeck(fetchedDeck);
            setCurrentCards(fetchedDeck.cards);
        }
        getCardsAndDeck();
    },[deckId])

    if (currentDeck === "Not Fetched Yet" || currentCards === "Not Fetched Yet") {
        return "Loading the data..."
    }

    const currentDeckName = currentDeck.name;
    const totalCardsNumber = currentCards.length;
    const currentCard = currentCards[currentCardNumber-1]

    const flipButtonHanlder = (event) => {
        setCardFlipped(true);
    }

    const nextButtonHandler = (event) => {
        if (currentCardNumber < totalCardsNumber) {
            setCardFlipped(false);
            setCurrentCardNumber((currentCardNumber) => currentCardNumber + 1);
        }
    }

    const cancelButtonHandler = (event) => {
        history.push("/")
    }

    const restartButtonHandler = (event) => {
        setCurrentCardNumber(1);
        setCardFlipped(false);
    }

    return (
        <div className = "container w-75">
            <nav aria-label = "breadcrumb">
                <ol className = "breadcrumb">
                    <li className = "breadcrumb-item active"> 
                        <Link to = "/"> Home </Link> 
                    </li>
                    <li className = "breadcrumb-item active"> 
                        <Link to = ""> {currentDeckName} </Link> 
                    </li>
                    <li className = "breadcrumb-item"> 
                        Study 
                    </li>
                </ol>
            </nav>
            <h1>Study: {currentDeckName}</h1>
            
            {(totalCardsNumber > 2) ? (
            <div className = "container border border-secondary rounded">
                <h5>Card {currentCardNumber} of {totalCardsNumber}</h5>
                {/*Show front if the card is not flipped, else show back*/}
                {cardFlipped ? (<p>{currentCard.back}</p>) : (<p>{currentCard.front}</p>)}
                <button 
                    onClick = {flipButtonHanlder} 
                    data-toggle="modal" 
                    data-target="#exampleModal" 
                    className = "btn btn-secondary mb-2 mr-2">
                    Flip
                </button>
                {/*Show the "Next" button if card is flipped*/}
                {cardFlipped ? (<button onClick = {nextButtonHandler} className = "btn btn-primary mb-2">Next</button>) : null}
                {/*Show modal if the user flipped the last card*/}
                {currentCardNumber === totalCardsNumber ?
                    (
                        <div className="modal" 
                            id="exampleModal" 
                            tabIndex="-1" 
                            role="dialog" 
                            aria-labelledby="exampleModalLabel" 
                            aria-hidden="true">
                        <div className="modal-dialog" 
                            role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" 
                                    id="exampleModalLabel">
                                    Restart cards?
                                </h5>
                                <button type="button" 
                                        className="close" 
                                        data-dismiss="modal" 
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Click "Cancel" to return to the home page
                            </div>
                            <div className="modal-footer">
                                <button onClick = {cancelButtonHandler} 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        data-dismiss="modal">
                                        Cancel
                                </button>
                                <button onClick = {restartButtonHandler} 
                                        type="button" 
                                        className="btn btn-primary" 
                                        data-dismiss="modal">
                                        OK
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    ) : null
                }
            </div>
            ) : (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {totalCardsNumber} cards in this deck.</p>
                    <Link   to = {`/decks/${deckId}/cards/new`}
                            className = "btn btn-primary mr-2">
                            Add Cards
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Study;