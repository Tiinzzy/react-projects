import React from 'react';

import ReactGrid from './ReactGrid';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    let query = { offset_number: 0, display_number: 20 };
    backend.get_all_movies(query, (data) => {
      const arrayOfArrays = data.map(obj => Object.values(obj));
      arrayOfArrays.unshift(['Genres', 'Imdb', 'Movie_Id', 'Overview', 'Id', 'Title', 'Vote', 'Vote_Count']);
      this.setState({ readyData: arrayOfArrays })
    });

  }

  render() {
    return (<>
      {this.state.readyData && < ReactGrid arrayOfArrays={this.state.readyData} />}
    </>
    );
  }
}