import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "./../utils/api/index.js";

function EditDeck() {
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");
    const parameters = useParams();
    const deckId = parameters.deckId;
    const history = useHistory();

    useEffect(() => {
        async function getDeck () {
            const fetchedDeck =  await readDeck(deckId);
            setCurrentDeck(fetchedDeck);
            setFormData(fetchedDeck)
        }
        getDeck();
    },[deckId])

    const [formData, setFormData] = useState ({})
    
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        updateDeck(formData);
     //   history.push(`/decks/${deckId}}`)
    }
    

    if (currentDeck === "Not Fetched Yet") {
        return "Content is loading..."
    }

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item active"> <Link to = {`/decks/${deckId}`}> {currentDeck.name} </Link> </li>
                        <li className = "breadcrumb-item"> Edit Deck </li>
                    </ol>
                </nav>
            </div>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className = "form-group"> Name </label>
                        <input
                            className = "form-control"
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className = "form-group"> Description </label>
                        <textarea
                            className = "form-control"
                            id="description"
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            /> 
                </div>
                <Link to = {`/decks/${deckId}`} type = "button" className = "btn btn-secondary mr-2"> Cancel </Link>
                <button type="submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;