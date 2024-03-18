import React, { useState } from 'react'
import './WeatherApp.css'
import SunIcon from '../../Assets/Sun_Icon.png'
import RainDay from '../../Assets/Rain_Bg.jpg'
import Rain_Icon from '../../Assets/Rain_Icon.png'
import SunnyDay_BG from '../../Assets/Sunny-dayflowers.webp'
import scattered_Clouds from '../../Assets/scattered_Clouds.png'

const api = {
    key : "ee74b430c01ab3ea9eea677f064c4f80",
    base: "https://api.openweathermap.org/data/2.5/"
    
}

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [placeDetail, setPlaceDetail] = useState({});
  const [weatherType, setWeatherType] = useState();

  

  const fetchActionData = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setPlaceDetail(result)
      }); 
  };

    let scattered_Clouds_BG = "https://i.pinimg.com/originals/94/81/aa/9481aa84d9446fd65a074a0341cbdbf2.jpg"
    let background;
    let MainIcon
    if (placeDetail?.weather && placeDetail?.weather?.length > 0) { 
      const description = placeDetail?.weather[0]?.description.toLowerCase();
      if (description.includes('haze')) {
        background = RainDay;
        MainIcon = Rain_Icon;
      } else if (description.includes('clear sky')) {
        background = SunnyDay_BG;
        MainIcon = SunIcon;
      } else if (description.includes('scattered clouds')) {
        background = scattered_Clouds_BG;
        MainIcon = scattered_Clouds;
      } else if (description.includes('few clouds')) {
        background = scattered_Clouds_BG;
        MainIcon = scattered_Clouds;
      } else if (description.includes('broken clouds')) { 
        background = scattered_Clouds_BG;
        MainIcon = scattered_Clouds;
      }
    }

  return(
    <div> 
        <div className='baseBox'>
            <div className='topBar'>
                <div className='textInput'>
                    <input placeholder='place name...' className='textInput' type="text" onChange={(e)=>setSearch(e.target.value)} />
                </div>
                <div className='ButtonForSearch'>
                    <button className='ButtonForSearch'onClick={fetchActionData} >Search</button>
                </div>
            </div>
            <div className='SecondMainBox' style={{ backgroundImage: `url(${background})`, objectFit:'fill' }}>
                <div className='parentBox'>
                    <div className='ImageBox' >
                        <img style={{height: "150px",width:"150px"}} src={MainIcon}alt="" />
                    </div> 
                    <div className='OtherDetails' >
                        <p style={{fontSize:35,fontWeight:600}}>{placeDetail?.name}</p>
                        <p style={{fontSize:26}}>Temperature: 
                        <span style={{fontSize:26,fontWeight:600}}>{placeDetail?.main?.temp}</span>
                        </p>
                        <p style={{fontSize:20}}>{placeDetail?.sys?.country}</p>
                    </div>
                </div>
                <div style={{position:'fixed',marginLeft:'50%',width:'auto'}}>
                <div className='parentBox-02'>deg: 
                <span>{placeDetail?.wind?.deg}</span> 
                </div>
                <div className='parentBox-03'>Gust: 
                <span>{placeDetail?.wind?.gust}</span> 
                </div>
                <div className='parentBox-04'>speed: 
                    <span>{placeDetail?.wind?.speed}</span> 
                </div>
                </div> 
            </div>
        </div>
    </div>
  );
}

export default WeatherApp
