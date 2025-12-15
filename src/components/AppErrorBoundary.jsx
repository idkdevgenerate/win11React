import React from "react";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("App Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
            padding: "40px",
            boxSizing: "border-box",
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          {/* Red Circle with Cross Icon */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              marginBottom: "24px",
            }}
          >
            {/* Red Circle */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
            >
              <circle cx="60" cy="60" r="55" fill="#d13438" />
              {/* White X */}
              <g stroke="white" strokeWidth="10" strokeLinecap="round">
                <line x1="35" y1="35" x2="85" y2="85" />
                <line x1="85" y1="35" x2="35" y2="85" />
              </g>
            </svg>
          </div>

          {/* Error Title */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Failed To Open The Requested Application
          </div>

          {/* Error Message */}
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              textAlign: "center",
              marginBottom: "20px",
              maxWidth: "400px",
              lineHeight: "1.5",
            }}
          >
            <div style={{ fontWeight: "500", marginBottom: "8px" }}>Error:</div>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                padding: "12px",
                borderRadius: "4px",
                fontFamily: "Consolas, monospace",
                fontSize: "12px",
                wordBreak: "break-word",
                maxHeight: "120px",
                overflowY: "auto",
                textAlign: "left",
              }}
            >
              {this.state.error?.toString() || "Unknown error occurred"}
            </div>
          </div>

          {/* Additional Info */}
          {this.state.errorInfo && (
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              Check the browser console for detailed error information.
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
