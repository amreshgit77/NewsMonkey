import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {description , title , imageUrl,newsUrl} = this.props;
    return (
      <div>
       <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl ? "https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/09/error-404-how-to-fix-it-fi.png":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
      </div>
      </div>
    </div>
    </div>
    )
  }
}
