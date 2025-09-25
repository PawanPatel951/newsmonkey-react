import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    console.log("Hello, I'm a constructor from News component.");
    this.state = {
      articals: [],
      page: 1,  

    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=bba5ab971d5a44cb8d6ac1abdfbfef8c&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articals: parsedData.articles, totalResults: parsedData.totalResults });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=bba5ab971d5a44cb8d6ac1abdfbfef8c&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articals: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{    
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=bba5ab971d5a44cb8d6ac1abdfbfef8c&page=${
      this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articals: parsedData.articles

    })
        
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articals &&
            this.state.articals.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between ">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
