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
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1,4).map((image, index) => (
          <img key={index} src={image} alt="" onClick={() => setImageIndex(index+1)} />
        ))}
      </div>
    </div>
  )
}
