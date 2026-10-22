import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  resetKey?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidUpdate(previousProps: Props) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio section error:', error, errorInfo);
  }

  private retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const isArabic = typeof document !== 'undefined' && document.documentElement.lang === 'ar';

      return (
        <div
          className="min-h-[50vh] flex items-center justify-center bg-white p-8"
          role="alert"
        >
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 bg-bronze/10 rounded-full flex items-center justify-center">
              <span className="text-bronze text-2xl">!</span>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">
              {isArabic ? 'تعذّر عرض هذا الجزء' : 'This section could not be displayed'}
            </h2>
            <p className="text-navy/60 mb-6">
              {isArabic
                ? 'يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية دون إعادة تحميل الموقع.'
                : 'You can try again or return to the home page without refreshing the whole site.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={this.retry}
                className="bg-bronze text-white px-6 py-3 rounded-lg hover:bg-bronze-light transition-colors"
              >
                {isArabic ? 'إعادة المحاولة' : 'Try again'}
              </button>
              <a
                href="#/"
                className="border border-navy/20 text-navy px-6 py-3 rounded-lg hover:bg-navy/5 transition-colors"
              >
                {isArabic ? 'العودة للرئيسية' : 'Go to home'}
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
