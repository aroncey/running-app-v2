import React from 'react'

const Results = (props) => (
        (
          <div id="results">
            {
              props.results.length == 1 ? null : <div><button id="homeButton" onReset={props.handleReset} className="initiallyHidden searchAgainButton">Search Again</button>
              <button id="previousButton" className="initiallyHidden leftbtn" onhandleDec={props.onDec}><i className="fa fa-chevron-left" aria-hidden="true" ></i></button>
              <button id="nextButton"  className="initiallyHidden rightbtn" onhandleInc={props.onInc} ><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
              <h3 id="displayAddress"></h3></div>
            }
            <h2 id="displayText">{props.results[props.currentIndex].phrase}</h2>
          </div>
    )

)

export default Results;
