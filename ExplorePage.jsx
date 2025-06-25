import React, { useEffect, useState } from "react";
import axios from "axios";

const ExplorePage = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("hoodie");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/explore?query=${query}`);
        setItems(res.data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
      setLoading(false);
    };

    fetchItems();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discover clothes:</h1>

      <input
        className="border p-2 rounded mb-4 w-full"
        type="text"
        placeholder="Suchbegriff eingeben (z. B. hoodie)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p>Loading Products...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-2 rounded" />
              <h2 className="text-md font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.price}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                Zum Shop ({item.source})
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
