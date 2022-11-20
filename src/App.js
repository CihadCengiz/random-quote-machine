import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});
  const [isReady, setIsReady] = useState(false)

  //Fetch all the quotes and setQuotes
  const fetchQuotes = async () => {
    await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    )
      .then((response) => response.json())
      .then(setQuotes)
    }

  //onClick get newRandomQuote
  const handleNewQuote = () => {
    setRandomQuote(getRandomQuote());
  }

  const getRandomQuote = () => {
    if(isReady) {
      let randomNumber = Math.floor(Math.random() * quotes.quotes.length)
      return {quote: quotes.quotes[randomNumber].quote, author:quotes.quotes[randomNumber].author }
    }
  }

  //Fetch Quotes onPageLoad
  useEffect(() => {
    fetchQuotes()
  },[])

  //setRandomQuote after Quotes are fetched to prevent undefined values
  useEffect(() => {
    setIsReady(true)
    if(isReady) setRandomQuote(getRandomQuote())
  },[quotes])


  return (
    <>
      <Container
        style={{ backgroundColor: '#333', height: '100vh', fontWeight: "400", fontFamily: "Raleway, sans-serif", color: "#333" }}
        className='d-flex justify-content-center align-items-center'
        id="wrapper"
        fluid
      >
        <Card id="quote-box" style={{ width: '25rem', borderRadius:"3px", position:"relative", width: "450px", padding: "40px 50px", display: "table", backgroundColor: "#fff" }}>
          <Card.Body>
            <Row id="text" style={{fontWeight: "500", fontSize: "1.75em", clear: "both", height: "auto", width: "450px"}}>
              <p className='d-flex justify-content-center'>
                <i className='fa fa-quote-left me-1' />
                {randomQuote.quote}
              </p>
            </Row>
            <Row id="author" style={{width: "450px", height: "auto", clear: "both", fontSize: "1em"}} className='justify-content-end pe-5'>- {randomQuote.author}</Row>
          </Card.Body>
          <Row>
            <span className='d-flex justify-content-around ps-5 pe-5'>
                <a id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + '"' + randomQuote.quote + '" ' + randomQuote.author}>
                <Button className='me-1 btn btn-secondary'>
                  <i className='fa fa-twitter'/>
                </Button>
                </a>
              <Button id="new-quote" className='btn btn-secondary' onClick={handleNewQuote}>New Quote</Button>
            </span>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default App;
