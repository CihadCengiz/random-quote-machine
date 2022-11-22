import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import {useGetQuotes} from "./hooks/useGetQuotes";

function App() {
  const { quotes, isLoading, getQuotes} = useGetQuotes();
  const [randomQuote, setRandomQuote] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
  ];

  //Pick a randomColor for backgroundColor & textColor
  const pickRandomColor = () => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)])
  };


  //onClick get newRandomQuote & newRandomColor
  const handleNewQuote = () => {
    pickRandomColor();
    setRandomQuote(getRandomQuote());
  };

  const getRandomQuote = () => {
    if (isReady) {
      let randomNumber = Math.floor(Math.random() * quotes.quotes.length);
      return {
        quote: quotes.quotes[randomNumber].quote,
        author: quotes.quotes[randomNumber].author,
      };
    }
  };

  //Fetch Quotes onPageLoad
  useEffect(() => {
    getQuotes();
    pickRandomColor();
  }, []);

  //setRandomQuote after Quotes are fetched to prevent undefined values
  useEffect(() => {
    setIsReady(true);
    if (isReady) setRandomQuote(getRandomQuote());
  }, [quotes]);

  return (
    <>
      <Container
        style={{
          backgroundColor: bgColor,
          transition: "1s ease-out",
          height: '100vh',
          fontWeight: '400',
          fontFamily: 'Raleway, sans-serif',
          color: '#333',
        }}
        className='d-flex justify-content-center align-items-center'
        id='wrapper'
        fluid
      >
        {isLoading ? <div>Loading...</div> : (
        <Card
          id='quote-box'
          style={{
            width: '25rem',
            borderRadius: '3px',
            position: 'relative',
            width: '450px',
            padding: '40px 50px',
            display: 'table',
            backgroundColor: '#fff',
          }}
        >
          <Card.Body>
            <Row
              id='text'
              style={{
                fontWeight: '500',
                fontSize: '1.75em',
                clear: 'both',
                height: 'auto',
                width: '450px',
                color: bgColor,
                transition: "1s ease-out"
              }}
            >
              <p className='d-flex justify-content-center'>
                <i className='fa fa-quote-left me-1' />
                {randomQuote.quote}
              </p>
            </Row>
            <Row
              id='author'
              style={{
                width: '450px',
                height: 'auto',
                clear: 'both',
                fontSize: '1em',
                paddingRight: '35px',
                color: bgColor,
                transition: "1s ease-out"
              }}
              className='justify-content-end'
            >
              -{randomQuote.author}
            </Row>
          </Card.Body>
          <Row>
            <span className='d-flex justify-content-between ps-5 pe-5'>
              <a
                id='tweet-quote'
                href={
                  'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                  '"' +
                  randomQuote.quote +
                  '" ' +
                  randomQuote.author
                }
              >
                <Button className='me-1 btn' style={{backgroundColor: bgColor, border: "none", transition: "1s ease-out"}}>
                  <i className='fa fa-twitter' />
                </Button>
              </a>
              <Button
                id='new-quote'
                className='btn'
                style={{backgroundColor: bgColor, border: "none", transition: "1s ease-out"}}
                onClick={handleNewQuote}
              >
                New Quote
              </Button>
            </span>
          </Row>
        </Card> )}
      </Container>
    </>
  );
}

export default App;
