
import React from 'react'

function createContextProvider(context){
    class ContextProvider extends React.Component {
      getChildContext() {
        return context;
      }
  
      render() {
        return this.props.children;
      }
    }
  
    // ContextProvider.childContextTypes = {};
    // Object.keys(context).forEach(key => {
    //   ContextProvider.childContextTypes[key] = React.PropTypes.any.isRequired; 
    // });
  
    return ContextProvider;
  }
export default createContextProvider;