import React from 'react';
class ErrorBoundary extends React.Component {
  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    this.setState({errorInfo});
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="card my-5">
          <div className="card-header">
            <p>
              There was an error in loading this page.{' '}
              <p className='text-danger'>
                Error: {this.state.error.message}
              </p>
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={() => {
                window.location.reload();
              }}
              >
                Reload this page
              </span>{' '}
            </p>
          </div>
          <div className="card-body">
            <details className="error-details">
              <summary>
                Click for error details
              </summary>
              {errorInfo && errorInfo.componentStack.toString()}
            </details>
          </div>
        </div>
      )
    }

    return this.props.children;
  }
}
export default ErrorBoundary;