import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ allPlayers }) => {
  const [searchText, setSearchText] = useState('');
  const [matchingNames, setMatchingNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    // Filter puppy names based on the input text
    const filteredNames = allPlayers
      .filter((player) => player.name.toLowerCase().includes(inputText.toLowerCase()))
      .map((player) => player.name);

    setMatchingNames(filteredNames);
    setDropdownOpen(true); // Open the dropdown when there are matching names
  };

  const handleNameClick = (selectedName) => {
    // Find the player ID based on the selected name
    const selectedPlayer = allPlayers.find((player) => player.name === selectedName);

    if (selectedPlayer) {
      // Navigate to the details page with the selected player's ID
      navigate(`/Details/${selectedPlayer.id}`);
      setDropdownOpen(false); // Close the dropdown on name click
    }
  };

  useEffect(() => {
    // Reset matching names and close the dropdown when the search text is empty
    if (!searchText) {
      setMatchingNames([]);
      setDropdownOpen(false);
    }
  }, [searchText]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a puppy..."
        value={searchText}
        onChange={handleInputChange}
      />

      {dropdownOpen && matchingNames.length > 0 && (
        <ul className="dropdown">
          {matchingNames.map((name) => (
            <li key={name} onClick={() => handleNameClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;