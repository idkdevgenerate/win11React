import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Activation = () => {
  const dispatch = useDispatch();
  const showActivation = useSelector((state) => state.globals.showActivationWarning);
  const isActivated = useSelector((state) => state.globals.isActivated);
  
  const [step, setStep] = useState("warning"); // "warning", "activation", "enter-code"
  const [code, setCode] = useState("");

  // Check localStorage on mount
  useEffect(() => {
    const activationToken = localStorage.getItem("activationToken");
    if (activationToken) {
      dispatch({ type: "ACTIVATEWINDOWS" });
    }
  }, [dispatch]);

  const handleOpenActivation = () => {
    setStep("activation");
  };

  const handleNext = () => {
    setStep("enter-code");
    setCode("");
  };

  const handleActivate = () => {
    if (code.toUpperCase() === "DOTLY") {
      // Save to localStorage
      localStorage.setItem("activationToken", "DOTLY-" + Date.now());
      dispatch({ type: "ACTIVATEWINDOWS" });
      setStep("warning");
      setCode("");
    } else {
      alert("Invalid activation code. Please try again.");
      setCode("");
    }
  };

  if (isActivated) return null;

  return (
    <>
      {/* Warning Dialog */}
      {showActivation && step === "warning" && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
            width: "90%",
            padding: "32px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            <h2 style={{
              margin: "0 0 16px 0",
              fontSize: "18px",
              fontWeight: 600,
              color: "#000",
            }}>
              Activate Windows
            </h2>
            
            <p style={{
              margin: "0 0 24px 0",
              fontSize: "14px",
              color: "#333",
              lineHeight: "1.6",
            }}>
              Windows is not activated. You need to activate Windows to use all features and get the best experience.
            </p>

            <p style={{
              margin: "0 0 24px 0",
              fontSize: "13px",
              color: "#666",
              lineHeight: "1.6",
            }}>
              Go online to activate Windows. This is free and takes just a few minutes.
            </p>

            <div style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}>
              <button
                onClick={() => dispatch({ type: "HIDEACTIVATIONWARNING" })}
                style={{
                  padding: "8px 24px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#000",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e8e8e8";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f0f0f0";
                }}
              >
                Remind me later
              </button>
              <button
                onClick={handleOpenActivation}
                style={{
                  padding: "8px 24px",
                  backgroundColor: "#0078d4",
                  border: "1px solid #0078d4",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#fff",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#106ebe";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0078d4";
                }}
              >
                Activate Windows
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activation Screen - Blue Background */}
      {step === "activation" && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0078d4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          overflow: "hidden",
        }}>
          <div style={{
            maxWidth: "600px",
            width: "90%",
            color: "#fff",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "24px",
            }}>
              Activate Windows
            </div>

            <p style={{
              fontSize: "18px",
              marginBottom: "48px",
              opacity: 0.95,
              lineHeight: "1.6",
            }}>
              Let's get your copy of Windows activated so you can enjoy the full Windows experience.
            </p>

            <div style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "48px",
            }}>
              <button
                onClick={handleNext}
                style={{
                  padding: "12px 32px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#fff",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                Next
              </button>
            </div>

            <p style={{
              fontSize: "13px",
              opacity: 0.8,
              marginTop: "32px",
            }}>
              You'll need your product key to activate Windows
            </p>
          </div>
        </div>
      )}

      {/* Enter Code Screen */}
      {step === "enter-code" && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0078d4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          overflow: "hidden",
        }}>
          <div style={{
            maxWidth: "600px",
            width: "90%",
            color: "#fff",
          }}>
            <div style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "16px",
            }}>
              Enter your product key
            </div>

            <p style={{
              fontSize: "15px",
              marginBottom: "32px",
              opacity: 0.95,
              lineHeight: "1.6",
            }}>
              You can find your product key on the Windows installation media, on the certificate of authenticity, or in your account or email confirmation.
            </p>

            <div style={{
              marginBottom: "32px",
            }}>
              <label style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "8px",
                opacity: 0.95,
              }}>
                Product key
              </label>
              <input
                type="text"
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && handleActivate()}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  boxSizing: "border-box",
                  fontFamily: "Courier New, monospace",
                  letterSpacing: "2px",
                  transition: "all 0.15s ease",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
              />
              <p style={{
                fontSize: "12px",
                marginTop: "8px",
                opacity: 0.8,
              }}>
                Try typing: DOTLY
              </p>
            </div>

            <div style={{
              display: "flex",
              gap: "16px",
              justifyContent: "flex-end",
            }}>
              <button
                onClick={() => setStep("activation")}
                style={{
                  padding: "10px 28px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#fff",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                Back
              </button>
              <button
                onClick={handleActivate}
                style={{
                  padding: "10px 28px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#fff",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
