import React from 'react';

class city extends React.Component {
  render(){
    return (
      <li>
      {this.props.city.name}
      </li>
    )
  }
}
