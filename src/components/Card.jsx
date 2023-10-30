const Card = ({rotate, value, desc}) => {
  const formattedValue = value.toString().padStart(2, "0");
  console.log(value)
    return(
        <div className='card-countdown'>
              <div className="card">
                {/* <p className={`card ${flip ? "flip" : ""}`}>{formattedValue}</p> */}
                <p className={`card ${rotate ? "rotate" : ""}`}>{formattedValue}</p>
                <div className="card-top"></div>
                <div className="card-top-bg"></div>
                <div className="card-middle-line"></div>
                <div className="card-bottom"></div>
              </div>
              <div className="card-desc">{desc}</div>
        </div>
    )
}

export default Card;