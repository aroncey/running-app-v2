import React from 'react'



class Results extends React.Component {

  buttonDisplays() {
    if (this.props.currentIndex === 1) {
      return <button id="nextButton"  className="rightbtn" onClick={this.props.onInc} ><i className="fa fa-chevron-right" aria-hidden="true"></i> </button>
    } else if (this.props.currentIndex === 5) {
      return <button id="previousButton" className="leftbtn" onClick={this.props.onDec}><i className="fa fa-chevron-left" aria-hidden="true" ></i></button>
    } else {
      return (
        <div>
          <button id="previousButton" className="leftbtn" onClick={this.props.onDec}><i className="fa fa-chevron-left" aria-hidden="true" ></i></button>
          <button id="nextButton"  className="rightbtn" onClick={this.props.onInc} ><i className="fa fa-chevron-right" aria-hidden="true"></i> </button>
        </div>
      )
    }
  }
        render() {
           return (
          <div>
            {
              this.props.results.length == 1 ? null :
              <div id="results">
                <button id="homeButton" onClick={this.props.onReset} className="searchAgainButton">Search Again</button>
                {this.buttonDisplays()}
                <h3 id="displayAddress">{this.props.searchAddress}</h3></div>
            }
            <h2 className="first_message">{this.props.results[this.props.currentIndex].phrase}</h2>
          </div>
        ) }

}



export default Results;
