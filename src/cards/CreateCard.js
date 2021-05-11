import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "./../utils/api/index.js";
import CardForm from "./CardForm.js"

/*
Utilizes readDeck function (only because the tests are expecting me to use it)
handleSave is different in CreateCard and EditCard, that is why it is not a separate component
*/

function CreateCard ({formData,setFormData,handleChange}) {

    const parameters = useParams();
    const deckId = parameters.deckId;
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");

    useEffect(() => {
        async function getDeck () {
            const fetchedDeck =  await readDeck(deckId);
            setCurrentDeck(fetchedDeck);
        }
        getDeck();
    },[deckId])

    const handleSave = (event) => {
        event.preventDefault();
        createCard(deckId,formData);
        setFormData({})
    }

    if (currentDeck === "Not Fetched Yet") {
        return "Content is loading..."
    }

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">

                        <li className = "breadcrumb-item active"> 
                            <Link to = "/"> Home </Link> 
                        </li>
                        <li className = "breadcrumb-item active"> 
                            <Link to = {`/decks/${deckId}`}> {currentDeck.name} </Link> 
                        </li>
                        <li className = "breadcrumb-item"> Add Card </li>

                    </ol>
                </nav>
            </div>
            <h1>{currentDeck.name}: Add Card</h1>
            <CardForm   deckId={deckId}
                        formData={formData} 
                        handleChange={handleChange} 
                        handleSave={handleSave}/>
        </div>
    )
}

export default CreateCard;