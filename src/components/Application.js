import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination"

function Application() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");
  // console.log(data);
  let index = 0

  const handleChange = (event) => {
    setName(event.target.value);
  };


  const handleClick = (event) => {
    event.preventDefault();
  };


  const fillOnClick = () => {
    fetchRecipeName(name)
    setCurrentPage(1)
  }




  // First JSON ----------------------------------------------------
  // const fetchRecipeName = async (fillName) => {
  //   setLoading(true)
  //   const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${fillName}&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`)
  //   // setPosts(res.data)
  //   const newData = res.data.results
  //   setData(newData);
  //   setLoading(false)
  // }

  const fetchRecipeName = (fillName) => {
    let url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${fillName}&apiKey=${process.env.REACT_APP_API_KEY}&complexSearch`
    
    axios.get(url)
    .then((res) => {
      // console.log(res.data);
      const newData = res.data.results
      setData(newData);
      // if (id !== "") {
      //   setMoreInfo(newMoreData);
      // }
    })
    .catch((err) => {
      // console.log(err);
    })
  }

  useEffect(() => {
    fetchRecipeName()
  }, [])




  // Second JSON ----------------------------------------------------
  const fetchRecipeMoreInfo = (id) => {
    let url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`
    axios.get(url)
    .then((res) => {
      // console.log(res.data);
      const newMoreData = res.data
      setMoreInfo(newMoreData);
      // if (id !== "") {
      //   setMoreInfo(newMoreData);
      // }
    })
    .catch((err) => {
      // console.log(err);
    })
  }

  useEffect(() => {
    fetchRecipeMoreInfo()
  }, []);




  // Pagination ---------------------------------------------
  // const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  if (loading) {
    return <h2>Loading...</h2>
  }

  // Get current posts ::
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

  // Change page ::
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  
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
        <button className="btn-primary" type="submit" onClick={fillOnClick}>Search</button>
      </form>
      <br />
      <h3>Results:</h3>
      <ul>
        {currentPosts &&
          currentPosts.map((item) => (
            <li key={item.id}>
              <h4>Recipe Name:</h4>
              <p>{item.title}</p>
              <br />
              <img alt="" src={item.image}/>
              <br />
              <br />
              <button 
              className="btn-primary"
              onClick={() => {
                setShow(!show)
                fetchRecipeMoreInfo(item.id)
              }}
              >More Info</button>
              <br />
              <br />
              {
              item.id === moreInfo.id && 
                <div>
                  <h4>Health Information:</h4>
                  <p>&emsp; Vegan: {moreInfo.vegan ? "Yes" : "No"}</p>
                  <p>&emsp; Dairy Free: {moreInfo.dairyFree ? "Yes" : "No"}</p>
                  <h4>List of ingredients:</h4>
                  <span>
                    {
                    moreInfo.extendedIngredients.map((ingredient) => 
                    <div key={ingredient.id}> &emsp; {++index}. {
                      ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
                      + " " + ingredient.measures.metric.amount + " " + ingredient.measures.metric.unitShort}<br /></div>)
                    }
                  </span>
                  <br />
                  <h4>Cooking instructions:</h4>
                  <div dangerouslySetInnerHTML={ { __html: moreInfo.instructions } }></div>
                </div>
              }
              <span>___________________________________________</span>
              <br />
              <br />
            </li>
          ))}
      </ul>
      <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/>
    </div>
  );
}

export default Application;
