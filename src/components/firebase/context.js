import React from 'react'

const FirebaseContext = React.createContext(null)

const withFirebase = Wrapped => props => (
  <FirebaseContext.Consumer>
    {firebase => <Wrapped {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
export { withFirebase }
