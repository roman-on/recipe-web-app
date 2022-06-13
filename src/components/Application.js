import React, { useState, useEffect } from "react";
import axios from "axios";

function Application() {
  const [name, setName] = useState("");

  const [data, setData] = useState("");

  const [show, setShow] = useState(false);
  
  const [moreInfo, setMoreInfo] = useState("");
  console.log(moreInfo);

  let index = 0

  const handleChange = (event) => {
    setName(event.target.value);
  };


  const handleClick = (event) => {
    event.preventDefault();
  };


  const fillOnClick = () => {
    fetchRecipeName(name)
  }




  const fetchRecipeName = (fillName) => {
    let link = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${fillName}&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`

    axios.get(link)
    .then((res) => {
      const newData = res.data.results
      if (fillName) {
        setData(newData);
      }
    })
    .catch((err) => {
      // console.log(err);
    })
  }

  useEffect(() => {
    fetchRecipeName()
  }, []);





  // New!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const fetchRecipeMoreInfo = (id) => {
    let link = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`

    console.log("++++++++++++++++" + id);
    axios.get(link)
    .then((res) => {
      // console.log(res.data);
      const newMoreData = res.data
      if (id) {
        setMoreInfo(newMoreData);
      }
    })
    .catch((err) => {
      // console.log(err);
    })
  }

  useEffect(() => {
    fetchRecipeMoreInfo()
  }, []);







  
  return (
    <div className="App">
      <h1>Find a Recipe</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search a Recipe"
          value={name}
        />
        <button type="submit" onClick={fillOnClick}>Search</button>
      </form>
      <h3>Results:</h3>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <h4>Recipe Name:</h4>
              <p>{item.title}</p>
              <br />
              <img alt="" src={item.image}/>
              <br />
              <br />
              <button 
              onClick={() => {
                setShow(!show)
                fetchRecipeMoreInfo(item.id)
              }}
              >More Info</button>
              {
              item.id === moreInfo.id && 
                <div>
                  <h4>Health Information:</h4>
                  <p>&emsp; Vegan: {moreInfo.vegan ? "Yes" : "No"}</p>
                  <p>&emsp; Dairy Free: {moreInfo.dairyFree ? "Yes" : "No"}</p>
                  <h4>List of ingredients:</h4>
                  <p>
                  {
                  moreInfo.extendedIngredients.map((ingredient) => 
                  <> &emsp; {++index}. {
                    ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
                     + " " + ingredient.measures.metric.amount + " " + ingredient.measures.metric.unitShort}<br /></>)
                  
                  
                  }
                  </p>
                  <h4>Cooking instructions:</h4>
                  <div dangerouslySetInnerHTML={ { __html: moreInfo.instructions } }></div>
                </div>
              }
              <br />
              <span>___________________________________________</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Application;
