import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "./../utils/api/index.js";
import CardForm from "./CardForm.js"

/*
Utilizes readDeck function (only because the tests are expecting me to use it)
handleSave is different in CreateCard and EditCard, that is why it is not a separate component
*/

function CreateCard ({formData,setFormData,handleChange}) {

    const parameters = useParams();
    const deckId = parameters.deckId;
    const cardId = parameters.cardId;
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");

    useEffect(() => {
        async function getCardAndDeck () {
            const fetchedDeck =  await readDeck(deckId);
            const fetchedCard = await readCard(cardId);
            setCurrentDeck(fetchedDeck);
            setFormData(fetchedCard);
        }
        getCardAndDeck();
    },[deckId,cardId,setFormData])

    const handleSave = (event) => {
        event.preventDefault();
        updateCard(formData);
        setFormData({})
    }

    // Condition unique to this function and formData
    // In that case formData is actually used to populate the "placeholders"
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
                        <li className = "breadcrumb-item"> 
                            Edit Card {cardId}
                        </li>
                        
                    </ol>
                </nav>
            </div>

            <h1>{currentDeck.name}: Edit Card</h1>

            <CardForm 
                deckId={deckId} 
                formData={formData} 
                handleChange={handleChange} 
                handleSave={handleSave}/>
        </div>
    )
}

export default CreateCard;