class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Puedes loguear el error aquí
      console.error('Error caught by error boundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <p>Error inesperado. Por favor, recarga la página.</p>;
      }
  
      return this.props.children;
    }
  }
  