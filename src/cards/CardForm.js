import React from "react";
import { Link } from "react-router-dom";

// Contains CardForm only, changes in this file affect:
// CreateCard.js
// EditCard.js
function CardForm({deckId,formData,handleChange,handleSave}) {
    return(
        <form onSubmit={handleSave}>
            
        <div className="form-group">
            <label htmlFor="front" className = "form-group"> Front </label>
                <textarea
                    className = "form-control"
                    id="front"
                    type="text"
                    name="front"
                    onChange={handleChange}
                    value={formData.front}
                    />
        </div>

        <div className="form-group">
            <label htmlFor="front" className = "form-group"> Back </label>
                <textarea
                    className = "form-control"
                    id="back"
                    type="text"
                    name="back"
                    onChange={handleChange}
                    value={formData.back}
                    /> 
        </div>

        <Link 
            to = {`/decks/${deckId}`} 
            type = "button" 
            className = "btn btn-secondary mr-2"> 
            Done 
        </Link>

        <button type="submit" className = "btn btn-primary">Save</button>

    </form>
    )
} 

export default CardForm;