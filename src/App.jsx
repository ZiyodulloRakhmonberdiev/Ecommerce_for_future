import React, {useState} from "react";
import { InputGroup, Input, InputGroupAddon, Button, FormGroup, Label, Spinner } from "reactstrap";
import axios from "axios";
import BookCard from "./BookCard";


function App() {
  //States
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);  
  const [filter, setFilter] = useState(cards);

  //Handle Search Button // Getting books from api
  const handleSearch = (response) => {
    setLoading(true);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${response}}`)
      .then(res => { 
        setCards(res.data.items);
        setLoading(false);
        setFilter(cards)
          }
      ).catch(
        err => {
          setLoading(true);
        }
      )
  }
  //Handle Change action
  const handleChange = (e) => {
    if(e.key === "Enter"){
      return handleSearch(response)
    }
  }
  // Handle Filter  Function
  const handleFilter = (category) => {
    const updatedList = filter.filter((item) => item.volumeInfo.categories  === category);
    setCards(updatedList)
  }

  //Searcher Content
  const Header = () => {
    return (
      <div className="">
        <div className="main-content d-flex align-items-center justify-content-center flex-column">
          {/* Overlay */}
          <div className="filter"></div>
          <h1 
            className="display-2 text-center text-white mb-3" 
            style={{zIndex: 2}}> 
            Google Books
          </h1>  
          <div style={{width: '60%', zIndex: 2}} >
            <InputGroup size='lg' className="mb-3">
              <Input 
                placeholder="Book Search" 
                value={response} 
                onChange={e => setResponse(e.target.value)}
                onKeyDown={handleChange}
              />
              <InputGroupAddon addonType="append">
                <Button 
                  color="secondary" 
                  className="w-100 h-100 btn"
                  onClick={() => handleSearch(response)}
                  >
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <div className="filter-content  text-white mt-5 ">
              <FormGroup className="mx-5 d-flex align-items-center col-12 col-md-6">
                <Label for="categories" className="me-3 fs-4">Categories</Label>
                <select className="form-select" aria-label="Default select example" id="categories" onChange={handleFilter}>
                  <option value='all' >all</option>
                  <option value='art'>art</option>
                  <option value="biography">biography</option>
                  <option value="computers">computers</option>
                  <option value="historical">historical</option>
                  <option value="medical">medical</option>
                  <option value="poetry">poetry</option>
                </select>
              </FormGroup>
              <FormGroup className="mx-5 d-flex align-items-center col-12 col-md-6 relevance">
                <Label for="sorting" className="me-3 fs-4">Sorting</Label>
                <select className="form-select" aria-label="Default select example" id="sorting" >
                  <option value="relevance">relevance</option>
                  <option value="newest">newest</option>
                </select>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    )
  };

  //Indentified books list
  const handleCards = () => {
    const items = cards.map((item) => {
      let thumbnail = '';
      if(item.volumeInfo.imageLinks.thumbnail){
        thumbnail = item.volumeInfo.imageLinks.thumbnail
      }
      return (
        <div className="col-lg-3 col-md-4 col-sm-12  border-0 p-2" key={item.id}>
          <BookCard 
            thumbnail={thumbnail} 
            title={item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.language}
            authors={item.volumeInfo.authors}
            publisher={item.volumeInfo.publisher}
            description={item.volumeInfo.description}
            infoLink={item.volumeInfo.infoLink}
            categories={item.volumeInfo.categories}
          />
        </div>
      )
    })
    if(loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{width: '3rem', height: '3rem'}} />
        </div>
      )
    } else {
      return (
        <div className="px-5 my-5 book-list">
          <div className="row p-0 overflow-hidden">{items}</div>
        </div>
      )
    }
  }

  return (
    <div className="w-100 h-100 overflow-hidden">
      {Header()}
      {filter.length ? <h1 className="pt-5 text-center">IDENTIFIED BOOKS {!loading ? filter.length : ''}</h1> : ''}
      {handleCards()}
    </div>
  );
}

export default App;
