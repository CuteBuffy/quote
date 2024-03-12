import react, {useState, useEffect} from 'react'

export default function Quot() {

  const [quoteData, setQuoteData] = useState([])

  const [quote, setQuote] = useState({
    quote_text: "",
    quote_author: ""
  })

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch("https://type.fit/api/quotes")
      const data = await res.json();
      setQuoteData(data)
    }
    getQuote();
  }, [])

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * quoteData.length)
    const randomQuote = quoteData[randomNum]
    setQuote(prevQuote => ({
      ...prevQuote,
      quote_text: randomQuote.text,
      quote_author: randomQuote.author
    }))
  }

  return (
    <>
      <div className="container quot__container">
        <div className="quot__wrapper">
          {quote.quote_text ? <h3 className="quot__text">❝{quote.quote_text}❞</h3>
          : <h3 className="quot__text">❝Quote Goes Here❞</h3>}
          {quote.quote_author ? <p className="quot__aut">- {quote.quote_author}</p> : <p className="quot__aut">- Author Goes Here :)</p>}
        </div>
        <button onClick={handleClick} className="quot__btn">Generate New Quote</button>
      </div>
    </>
  );
}