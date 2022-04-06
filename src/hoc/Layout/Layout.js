import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer 
          isOpen={this.state.menu}
          onClose={this.toggleMenuHandler}
          logged={this.props.logged}
        />
        <MenuToggle 
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    logged: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)