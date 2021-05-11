import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "./../utils/api/index.js";

function CreateDeck ({ decks, pageRerenderTrigger,setPageRerenderTrigger }) {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
      };

      const [formData, setFormData] = useState({ ...initialFormState });
      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData);
        setFormData({ ...initialFormState });
        setPageRerenderTrigger("deckCreateDeck");
        history.push(`/decks/${decks.length + 1}`)
      };

    return (
        <div className = "container w-75">
            <div>
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item"> Create Deck </li>
                    </ol>
                </nav>
            </div>
            <h1>Create Deck</h1>
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
                            placeholder="Deck Name"/>
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
                            placeholder="Brief description of the deck"/> 
                </div>
                <Link to = "/" type = "button" className = "btn btn-secondary mr-2"> Cancel </Link>
                <button type="submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;