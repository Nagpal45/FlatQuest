import { useState } from 'react';
import './searchBar.scss';
import { Link } from 'react-router-dom';

const types = ['buy', 'rent']

export default function SearchBar() {
    const [query, setQuery] = useState({
        type: 'buy',
        location: '',
        minPrice: 0,
        maxPrice: 0,
    })

    const switchType = (val) => {
        setQuery((prev) => ({...prev, type: val}))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setQuery((prev) => ({...prev, [name]: value}))
    }


  return (
    <div className="searchBar">
        <div className="type">
            {types.map((type) => (
                <button key={type} onClick={()=>switchType(type)} className={query.type === type ? "active" : ""}>
                    {type}
                </button>
            ))}
        </div>
        <form>
            <input type="text" name='city' placeholder='City' onChange={handleChange}/>
            <input type="number" name="minPrice" placeholder='Min Price' min={0} max={10000000} onChange={handleChange}/>
            <input type="number" name="maxPrice" placeholder='Max Price' min={0} max={10000000} onChange={handleChange}/>
            <Link to={`/listings?city=${query.city}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
            <button>
                <img src="/search.png" alt="" />
            </button>
            </Link>
        </form>
    </div>
  )
}
