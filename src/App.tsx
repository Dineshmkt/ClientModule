import Admin from './components/Admin'
import ErrorBoundary from './ErrorBoundary'
const App = () => {
  return (
        <ErrorBoundary>
          <div>
            <Admin/>
           </div>
    </ErrorBoundary>
  )
}

export default App
