import React from 'react';
import Body from './components/Body';
import {Provider} from 'react-redux'
import appStore from './utils/appStore';

const App = () => {

  console.log('<Body/>:', <Body/>); // Log <Body/> to console
  return (
    <div>
     <Provider store= {appStore}><Body/></Provider> 

    </div>
  );
}

export default App;



