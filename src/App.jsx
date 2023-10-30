import { useEffect, useState } from "react"
import Card from "./components/Card"

function App() {
  // default value 0 dan false, digunakan untuk menampung value
  const [days, setDays] = useState(0)
  const [hours, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [rotateDays, setRotateDays] = useState(false)
  const [rotateHours, setRotateHours] = useState(false)
  const [rotateMinutes, setRotateMinutes] = useState(false)
  const [rotateSeconds, setRotateSeconds] = useState(false)

  //ambil url
  const url = new URL(window.location.href)
  // ambil query params yang bernama date
  const date = url.searchParams.get("date")
  // console.log(date)

  //default date jika user tidak memberikan value pada query params
  const defaultDate = new Date("Dec 31, 2023 00:00:00").getTime();
  // console.log(date)
  //cek apakah date punya nilai atau ngak, kalau punya, isi dengan format new Date kalau ngak punya ya isi dengan default date
  const countDown = date 
    ? new Date(date).getTime() 
    : defaultDate

    // console.log(countDown)


    useEffect(() => {
      const interval = setInterval(() => {
        //ambil waktu sekarang
        const now = new Date().getTime();
        //console.log(now) //1698679576123 nilai waktu saat ini dalam milidetik

        //waktu yang ada di variable date - waktu sekarang menghasilkan sisa waktu selanjutnya
        const remainingTime = countDown - now

        const newDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
        const newHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) )
        const newMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        //membandingkan nilai newDays dan days, jika tidak sama maka setRotate akan menjadi true
        setRotateDays(newDays != days)
        setRotateHours(newHours != hours)
        setRotateMinutes(newMinutes != minutes)

        //mengisi nilai days dengan newDays
        setDays(newDays)
        setHour(newHours)
        setMinutes(newMinutes)
        setSeconds(newSeconds)

        //jika ada perubahan detika setRotate jadi rute
        /**
         * kita menggunakan setTimeout untuk menjadwalkan perubahan kembali variabel rotateSeconds menjadi false setelah 500 milidetik (0,5 detik). Ini digunakan untuk menghentikan animasi putaran setelah selesai. Tanpa setTimeout, animasi putaran akan terus berjalan, dan kita ingin efeknya hanya berlangsung sebentar saat detik berubah.
         */
        if(newSeconds !== seconds){
          setRotateSeconds(true);
          setTimeout(() => {
            setRotateSeconds(false)
          }, 500)
        }

        //jika sisa waktu sudah kosong, hentikan interval dan atur semua waktu jadi 0
        if(remainingTime < 0 ){
          clearInterval(interval)
          setDays(0)
          setHour(0)
          setMinutes(0)
          setSeconds(0)
        }
      }, 1000) //execute setiap 1 detik

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
