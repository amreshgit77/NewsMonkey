import React, { Component } from "react";
import Newsitem from "./Newsitem";

export default class News extends Component {

  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      page: 1
    };
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/everything?q=apple&from=2024-05-21&to=2024-05-21&sortBy=popularity&apiKey=7b1d679459f847f8929e9e969b492ff3&page=1&pageSize=20";
    let data = await fetch(url);
    let datainfo = await data.json();
    this.setState({ articles: datainfo.articles, totalResults: datainfo.totalResults });
    console.log(datainfo);
  }

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })

  }


  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="class-center">NewsMonkey - Head Lines </h1>

        <div className="row">
          {this.state.articles?.map((element) => {
            return (
              <div className="col-md-4 " key={element.Url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

        </div>
      </div>
    );
  }
}
