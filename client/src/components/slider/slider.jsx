import { useState } from 'react'
import './slider.scss'

export default function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);


  return (
    <div className="slider">
      {imageIndex !== null && (<div className="fullSlider">
        <div className="arrow" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}> 
          <img src="/arrow.png" alt="" />
        </div>
        <div className="imgContainer">
          <img src={images[imageIndex]} alt="" />
        </div>
        <div className="arrow" onClick={() => setImageIndex((imageIndex + 1) % images.length)}>
          <img src="/arrow.png" alt="" className='right' />
        </div>
        <div className="close" onClick={() => setImageIndex(null)}>
          X
        </div>
      </div>)}
      <div className="bigImage">
       {images.length > 0 ? <img src={images[0]} alt="" onClick={() => setImageIndex(0)} /> : <img src="/home.png" alt="" style={{
          width: "30px",
          height: "30px",
          borderRadius: "0px",
          filter: "invert(1)",
        }}/>}
      </div>
      {images.length > 1 && <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <div className='smallImage' key={index}>
          <img src={image} alt="" onClick={() => setImageIndex(index+1)} />
          {index === 2 && <div className="moreImages" onClick={() => setImageIndex(index+1)} >+{images.length - 3} more photos</div>}
          </div>
        ))}
      </div>}
    </div>
  )
}
