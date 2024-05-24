import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Sppiner from "./Sppiner";

export default class News extends Component {

  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      page: 1,
      loading: false
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7b1d679459f847f8929e9e969b492ff3&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let datainfo = await data.json();
    this.setState({ articles: datainfo.articles, totalResults: datainfo.totalResults, loading: false });
    console.log(datainfo);
  }

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7b1d679459f847f8929e9e969b492ff3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }

  handlePrevClick = async () => {
    console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7b1d679459f847f8929e9e969b492ff3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }


  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="class-center">NewsMonkey - Head Lines </h1>
        <div className="text-center">
          {this.state.loading && <Sppiner />}
        </div>
        <div className="row">
          {!this.state.loading && this.state.articles?.map((element) => {
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
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

        </div>
      </div>
    );
  }
}
