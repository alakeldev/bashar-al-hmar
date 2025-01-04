import "./SingleCard.css"

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className='front w-24 h-24' alt='card front'/>
                <img src="../public/img/cover.jpg" alt="card back" className='back w-24 h-24' onClick={handleClick}/>
            </div>
    </div>
  )
}

export default SingleCard