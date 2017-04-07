import React from 'react'

const SearchForm = (props) => (
        (<div>
          {props.results.length === 6 ? null :
            <div className="search center">
                <form id="searchForm" onSubmit={props.onSubmit}>
                    <input type='text' placeholder="Enter Your City or Zip" className="searchBar" id="searchTerms" onChange={props.onChange}/>
                    <button id="searchButton" className="searchButton">Find Out!</button>
                </form>
                <h2 id="displayError"></h2>
              </div>
            }
          </div>)

)

export default SearchForm;
