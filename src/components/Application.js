import React, { useState, useEffect } from "react";
import axios from "axios";

function Application() {
  const [name, setName] = useState("");
  // const [headingText, setHeading] = useState("");
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++" + headingText);

  const [data, setData] = useState("");
  // const [img, setImg] = useState("");

  const [show, setShow] = useState(false);
  
  const [moreInfo, setMoreInfo] = useState("");
  console.log(moreInfo.extendedIngredients);



  const handleChange = (event) => {
    // console.log(event.target.data);
    setName(event.target.value);
  };


  const handleClick = (event) => {
    // if (name !== "") {
    // setHeading(name);
    // }
    // setHeading(name);
    event.preventDefault();
  };


  const fillOnClick = () => {
    fetchRecipeName(name)
  }



  // let idNum = 0

  const fetchRecipeName = (fillName) => {
    let link = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${fillName}&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`

    axios.get(link)
    .then((res) => {
      // console.log(res.data.results);
      const newData = res.data.results
      // const newDataImg = res.data.results[0].image
      if (fillName) {
        setData(newData);
        // console.log(res.data.results[0].id);
        // idNum = 
        // setImg(newDataImg)
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
    // let link = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${fillName}&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`
    let link = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`

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

      {/* <div>
        <h3>Results:</h3>
        {title && <h5>Recipe Name:</h5>}
        
        <a href={"hey"}>{title}</a>
        <br />
        <br />
        <img alt="" src={img}/>
      </div> */}

      <h3>Results:</h3>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <h4>Recipe Name:</h4>
              {/* {item.id} */}
              {/* <a href={"hey"}>{item.title}</a> */}
              <p>{item.title}</p>
              <br />
              <br />
              <img alt="" src={item.image}/>
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
                  <h4>More Info:</h4>
                  <p>Vegan: {moreInfo.vegan ? "Yes" : "No"}</p>
                  <p>Dairy Free: {moreInfo.dairyFree ? "Yes" : "No"}</p>
                  <p>Ingredients: {moreInfo.extendedIngredients.map((ingredient) => ingredient.name + ", ")}</p>
                </div>
              }
              <br />
              <p>-------------------------------------------</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Application;
