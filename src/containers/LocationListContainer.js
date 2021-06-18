import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCity, getWeatherCities} from './../reducers';
import * as actions from './../actions';
import LocationList from './../components/LocationList';

class LocationListContainer extends Component {
  componentDidMount() {
    const {setWeather, setSeletedCity, cities, city} = this.props
    setWeather(cities);

    setSeletedCity(city);
  }
  handleSelectedLocation = city => {

    this.props.setSeletedCity(city);
  }

    render() {
        return (
            <LocationList cities={this.props.citiesWeather} 
              onSelectedLocation={this.handleSelectedLocation} ></LocationList>
        )
    }
}

LocationListContainer.propTypes = {
    setSeletedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather: PropTypes.array,
    city: PropTypes.string.isRequired,
};

const mapDispatchToPropsActions = dispatch => bindActionCreators(actions, dispatch)
/*const mapDispatchToPropsActions = dispatch => ({
    setCity: value => dispatch(setSeletedCity(value)),
    setWeather: cities => dispatch(setWeather(cities))
  });*/

const mapStateToProps = state => ({
  citiesWeather: getWeatherCities(state),
  city: getCity(state)
});

export default connect(mapStateToProps, mapDispatchToPropsActions)(LocationListContainer);