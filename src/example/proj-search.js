import React, { Component, PropTypes } from 'react'
import Explore from '../public/componet/Explore'
import Table from '../public/componet/Table'
import Pages from '../public/componet/Pages'
import {exploreAction,pageAction} from './action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class ProjSearch extends Component {

  render() {
    return (
      <div className="main-right">
        <Explore coms={this.props.explore}
                 onChange={this.props.onChange}/>
        <Table table={this.props.user_tab}/>
        <Pages pages={this.props.pages}
               pageChange={this.props.pageChange}/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    explore:state.explore,
    user_tab:state.user_tab,
    pages:state.pages
  }
}

function mapActionToProps(dispatch){
  return{
    onChange:bindActionCreators(exploreAction,dispatch),
    pageChange:bindActionCreators(pageAction,dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProjSearch);

