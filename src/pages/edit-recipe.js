import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for React Router v6

const EditRecipes = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate(); // Updated for React Router v6

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
        // Handle error
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/recipes/${recipeId}`, recipe);
      navigate('/'); // Redirect to home or another appropriate page
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Recipe</h1>
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleChange}
      />
      {/* Include other fields like ingredients, instructions, etc. */}
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipes;