import useSound from 'use-sound';
import azan from './assets/azan1.mp3'
import './App.css';
import './main.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import TimerBox from './components/TimerBox';
import ReusableTable from './components/ReusableTable';

const todaysDate=()=>{
  let yourDate = new Date()
// yourDate.toISOString().split('T')[0]
const offset = yourDate.getTimezoneOffset()
yourDate = new Date(yourDate.getTime() - (offset*60*1000))
return yourDate.toISOString().split('T')[0]
}

function App() {
  
 const [ramadanData, setRamadanData] = useState([])
  const [timeLeft, setTimeLeft] = useState();
  const [sehriTimeLeft, setSehriTimeLeft] = useState();
  const [play, { stop }] = useSound(azan);
  const [audio] = useState(new Audio(azan));

  

  const getAllRamadanData= async()=>{
    const {data} = await axios.get("https://ramdan-backend.onrender.com/ramadan")
    if(data){
      setRamadanData(data?.dates)
    }
  }


  useEffect(() => {
    if(timeLeft && sehriTimeLeft){
      const interval = setTimeout(() => {
 
        if (Math.floor(timeLeft / 3600000) === 0 && (Math.floor(timeLeft / 60000) - (Math.floor(timeLeft / 3600000) * 60)) === 0 && (Math.floor(timeLeft / 1000) - (Math.floor(timeLeft / 60000) * 60)) === 0) {
          setTimeLeft(0)
        } else {
  
          setTimeLeft(new Date(ramadanData?.find(ramadan => ramadan.date == todaysDate()).date + " " + ramadanData?.find(ramadan => ramadan.date == todaysDate()).iftar) - new Date())
        }
  
        if (Math.floor(sehriTimeLeft / 3600000) === 0 && (Math.floor(sehriTimeLeft / 60000) - (Math.floor(sehriTimeLeft / 3600000) * 60)) === 0 && (Math.floor(sehriTimeLeft / 1000) - (Math.floor(sehriTimeLeft / 60000) * 60)) === 0) {
          setSehriTimeLeft(0)
        } else {
  
          setSehriTimeLeft(new Date(ramadanData?.find(ramadan => ramadan.date == todaysDate()).date + " " + ramadanData?.find(ramadan => ramadan.date == todaysDate()).sahri) - new Date())
        }

        console.log(timeLeft, sehriTimeLeft)
  
  
      }, 1000);
  
      return () => clearInterval(interval);
    }
   
  }, [timeLeft, sehriTimeLeft]);

  


  useEffect(() => {

    if (Math.floor(timeLeft / 3600000) === 0 && (Math.floor(timeLeft / 60000) - (Math.floor(timeLeft / 3600000) * 60)) === 0 && (Math.floor(timeLeft / 1000) - (Math.floor(timeLeft / 60000) * 60)) === 0) {
      new Audio(azan).play()
    }
  }, [timeLeft]);

  useEffect(() => {

    if (Math.floor(sehriTimeLeft / 3600000) === 0 && (Math.floor(sehriTimeLeft / 60000) - (Math.floor(sehriTimeLeft / 3600000) * 60)) === 0 && (Math.floor(sehriTimeLeft / 1000) - (Math.floor(sehriTimeLeft / 60000) * 60)) === 0) {
      new Audio(azan).play()
    }
  }, [sehriTimeLeft]);




  useEffect(() => {
   getAllRamadanData()

  }, [])

  useEffect(() => {
    if (ramadanData.length > 0) {
      console.log(ramadanData, todaysDate())
      setTimeLeft(ramadanData?.find(ramadan => ramadan.date == todaysDate()) ? (new Date(ramadanData?.find(ramadan => ramadan.date == todaysDate()).date + " " + ramadanData?.find(ramadan => ramadan.date == todaysDate()).iftar) - new Date()): "")
    setSehriTimeLeft(ramadanData?.find(ramadan => ramadan.date == todaysDate()) ? (new Date(ramadanData?.find(ramadan => ramadan.date == todaysDate()).date + " " + ramadanData?.find(ramadan => ramadan.date == todaysDate()).sahri) - new Date()):"")
  }

  
  }, [ramadanData])




  return (
    <div className="App">
      <div>
        <header>
          <div className="heading">
            <h2>رمضان مبارك</h2>
            <h1>মাহে রমজান</h1>
          </div>
        </header>
        <div id="content" />
        <div id="rest">
          <div id="essentials" className="below">
            {timeLeft > 0 && sehriTimeLeft <= 0 && (
              <div id="countdown">
                <p className='mash'>আজকের ইফতারের সময় বাকিঃ</p>
                <div id="timing">
                <TimerBox title="ঘণ্টা" color="#E0F2F1" time={timeLeft} />
                <TimerBox title="মিনিট" color="#E3F2FD" time={timeLeft} />
                  <TimerBox title="সেকেন্ড" color="#FFEBEE" time={timeLeft} />
                  
                </div>
              </div>
            )}

            {sehriTimeLeft > 0 && (
              <div id="countdown">
                <p className='mash'>আজকের সাহরীর সময় বাকিঃ</p>
                <div id="timing">
                  <div className="box-1"><p style={{ color: '#f4f4f4' }} className='mash'><strong>ঘণ্টা</strong></p>
                    <h2 id="hours" style={{ fontSize: 30, color: '#E0F2F1' }} >{Math.floor(sehriTimeLeft / 3600000)}</h2>
                  </div>
                  <div className="box-2" style={{ margin: '0 5px' }}>
                    <p style={{ color: '#f4f4f4' }} className='mash'><strong>মিনিট</strong></p>
                    <h2 id="mins" style={{ fontSize: 30, color: '#E3F2FD' }} >{Math.floor(sehriTimeLeft / 60000) - (Math.floor(sehriTimeLeft / 3600000) * 60)}</h2>

                  </div>
                  <div className="box-3">
                    <p style={{ color: '#f4f4f4' }} className='mash'><strong>সেকেন্ড</strong></p>
                    <h2 id="secs" style={{ fontSize: 30, color: '#FFEBEE' }} > {Math.floor(sehriTimeLeft / 1000) - (Math.floor(sehriTimeLeft / 60000) * 60)}</h2>

                  </div>
                </div>
              </div>
            )}
            <div className="dowa mash" style={{ marginBottom: 80 }}>
              <h3>রোজার আরবি নিয়ত: <i class="fa fa-volume-up" aria-hidden="true"></i></h3> <p>
                نَوَيْتُ اَنْ اُصُوْمَ غَدًا مِّنْ شَهْرِ رَمْضَانَ الْمُبَارَكِ فَرْضَا لَكَ يَا اللهُ فَتَقَبَّل مِنِّى اِنَّكَ اَنْتَ السَّمِيْعُ الْعَلِيْم</p>
              <p>উচ্চারণ : নাওয়াইতু আন আছুম্মা গাদাম মিন শাহরি রমাজানাল মুবারাকি ফারদাল্লাকা, ইয়া আল্লাহু ফাতাকাব্বাল মিন্নি ইন্নিকা আনতাস সামিউল আলিম।</p>
              <hr />
              <h3>ইফতারের আরবি দোয়া: <i class="fa fa-volume-up" aria-hidden="true"></i></h3><p>
                نَوَيْتُ اَنْ اُصُوْمَ غَدًا مِّنْ شَهْرِ رَمْضَانَ الْمُبَارَكِ فَرْضَا لَكَ يَا اللهُ فَتَقَبَّل مِنِّى اِنَّكَ اَنْتَ السَّمِيْعُ الْعَلِيْماَللَّهُمَّ لَكَ صُمْتُ وَ عَلَى رِزْقِكَ وَ اَفْطَرْتُ بِرَحْمَتِكَ يَا اَرْحَمَ الرَّاحِيْمِيْن</p>
              <p>উচ্চারণ: আল্লাহুম্মা ছুমতু লাকা ওয়া আলা রিযক্বিকা ওয়া আফতারতু বিরাহমাতিকা ইয়া আরহামার রাহিমিন।</p>
            </div>
          </div>
          <div id="tables">
            <h3>ঢাকা ও পার্শ্ববর্তী জেলা সমূহের জন্য</h3>
            <h2>হিজরি ১৪৪৪, বাংলা ১৪৩০, ইংরেজি ২০২৩</h2>
            <h1>সাহরী ও ইফতারের সময়সূচী</h1>
            <div id="table-1 container">
              <div />
              <h1>রহমতের ১০ দিন</h1>
              <ReusableTable firstNumber={0} lastNumber={9} ramadanData={ramadanData} />

            </div>
            <div id="table-2">
              <h1>মাগফিরাতের ১০ দিন</h1>
             <ReusableTable firstNumber={10} lastNumber={19} ramadanData={ramadanData} />
            </div>
            <div id="table-3">
              <h1>নাজাতের ১০ দিন</h1>
              <ReusableTable firstNumber={20} lastNumber={29} ramadanData={ramadanData} />

            </div>
          </div>
        </div>
        <br />
      </div>

    </div>
  );
}

export default App;
