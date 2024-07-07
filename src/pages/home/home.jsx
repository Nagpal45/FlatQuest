import SearchBar from '../../components/searchBar/searchBar';
import './home.scss';

function HomePage(){
    return (
        <div className="homePage">
            <div className="textContainer">
            <div className="wrapper">
                <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolore quos accusantium ut debitis vitae incidunt esse ullam consectetur nostrum! Eum labore incidunt molestias, quae repellat quas doloremque beatae quam.</p>
                <SearchBar/>
                <div className="boxes">
                <div className="box">
                    <h1>16+</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>Award Gained</h2>
                </div>
                <div className="box">
                    <h1>1200+</h1>
                    <h2>Property ready</h2>
                </div>
                </div>
            </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage;