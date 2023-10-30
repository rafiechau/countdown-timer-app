import { useEffect, useState } from "react"
import Card from "./components/Card"

function App() {
  const [days, setDays] = useState(0)
  const [hours, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [rotateDays, setRotateDays] = useState(false)
  const [rotateHours, setRotateHours] = useState(false)
  const [rotateMinutes, setRotateMinutes] = useState(false)
  const [rotateSeconds, setRotateSeconds] = useState(false)

  const url = new URL(window.location.href)
  // console.log(url)
  const date = url.searchParams.get("date")

  const defaultDate = new Date("Dec 31, 2023 00:00:00").getTime();
  console.log(date)
  const countDown = date 
    ? new Date(date).getTime() 
    : defaultDate


    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();

        const distance = countDown - now

        const newDays = Math.floor(distance / (1000 * 60 * 60 * 24))
        const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) )
        const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        //
        setRotateDays(newDays != days)
        setRotateHours(newHours != hours)
        setRotateMinutes(newMinutes != minutes)

        setDays(newDays)
        setHour(newHours)
        setMinutes(newMinutes)
        setSeconds(newSeconds)

        if(newSeconds !== seconds){
          setRotateSeconds(true);
          setTimeout(() => {
            setRotateSeconds(false)
          }, 500)
        }

        if(distance < 0 ){
          clearInterval(interval)
          setDays(0)
          setHour(0)
          setMinutes(0)
          setSeconds(0)
        }
      }, 1000)

      return () => clearInterval(interval)
    }, [countDown, days, hours, minutes, seconds])



  return(
    <>
      <main>
        <div className='container'>
          <header>Were launching soon</header>
          <div className='display-countdown-timer'>
            <Card rotate={rotateDays} value={days} desc={"Days"}/>
            <Card rotate={rotateHours} value={hours} desc={"Hours"}/>
            <Card rotate={rotateMinutes} value={minutes} desc={"Minutes"}/>
            <Card rotate={rotateSeconds} value={seconds} desc={"Seconds"}/>
          </div>
        </div>
      </main>
      <footer>
        <img src="assets/pattern-hills.svg" alt="pattern image"/>
        <div className="list-sosmed">
          <img src="assets/icon-facebook.svg" alt="facebook image"/>
          <img src="assets/icon-pinterest.svg" alt="pinterest image"/>
          <img src="assets/icon-instagram.svg" alt="instagram image"/>
        </div>
      </footer>
    </>
  )
}

export default App
