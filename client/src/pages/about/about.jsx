import ImgContainer from '../../components/imgContainer/imgContainer';
import './about.scss';

const About = () => {
    return (
        <div className="about">
            <div className="wrapper">
                <h1 className='heading'>About FLATQUEST</h1>
                <p>
                    Welcome to FLATQUEST, your ultimate real estate platform designed to make property searching easy and efficient.
                </p>
                <p>
                    Our platform allows you to seamlessly search for properties based on various criteria including city, budget, property type, and more. This ensures you find the perfect match for your needs.
                </p>
                <p>
                    With FLATQUEST, you can save your preferred properties and post new listings effortlessly. Our detailed property views provide comprehensive information about each property, and our integrated chat functionality facilitates direct communication between users for inquiries, making your property search journey smooth and interactive.
                </p>
                <p>
                    We are committed to enhancing platform utility and user experience, ensuring you have all the tools you need to find your dream property. Thank you for choosing FLATQUEST!
                </p>
            </div>
            <ImgContainer />
        </div>
    );
};


export default About;
