import React from 'react';
import ErrorPage from '@/pages/ErrorPage';

export default class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
