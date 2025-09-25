import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
   
    constructor() {
        super();
        console.log("hlo i'm a constuctor from News component.");
        this.state = {
            articals:[],
            location: true
        }
    }

 async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=bba5ab971d5a44cb8d6ac1abdfbfef8c";
    let data = await fetch(url);
    let paesedData = await data.json();
    console.log(paesedData);
    this.setState({ articals: paesedData.articles }) 
}
    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articals && this.state.articals.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                description={element.description ? element.description: ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                            />
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}

export default News;
