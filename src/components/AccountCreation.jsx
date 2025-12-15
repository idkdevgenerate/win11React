import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const AccountCreation = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    accountType: "Local Account",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    if (!formData.username.trim()) {
      alert("Please enter a username");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch({
      type: "CREATEACCOUNT",
      payload: {
        username: formData.username,
        password: formData.password,
        type: formData.accountType,
      },
    });

    dispatch({ type: "HIDEACCOUNTCREATION" });

    // Reset form
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      accountType: "Local Account",
    });
  };

  const handleCancel = () => {
    dispatch({ type: "HIDEACCOUNTCREATION" });
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      accountType: "Local Account",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "9990",
        }}
        onClick={handleCancel}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--wintheme, #f5f5f5)",
          padding: "0",
          width: "450px",
          border: "1px solid var(--bd-color, #ccc)",
          borderRadius: "8px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          zIndex: "9999",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid var(--bd-color, #ddd)",
            backgroundColor: "#f3f3f3",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--txt-col, #222)",
            }}
          >
            Create New Account
          </span>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--sat-txt, #555)",
                fontWeight: "500",
              }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                border: "1px solid var(--bd-color, #ccc)",
                borderRadius: "4px",
                backgroundColor: "var(--wintheme, #fff)",
                color: "var(--txt-col, #222)",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--sat-txt, #555)",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                border: "1px solid var(--bd-color, #ccc)",
                borderRadius: "4px",
                backgroundColor: "var(--wintheme, #fff)",
                color: "var(--txt-col, #222)",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--sat-txt, #555)",
                fontWeight: "500",
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                border: "1px solid var(--bd-color, #ccc)",
                borderRadius: "4px",
                backgroundColor: "var(--wintheme, #fff)",
                color: "var(--txt-col, #222)",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--sat-txt, #555)",
                fontWeight: "500",
              }}
            >
              Account Type
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                border: "1px solid var(--bd-color, #ccc)",
                borderRadius: "4px",
                backgroundColor: "var(--wintheme, #fff)",
                color: "var(--txt-col, #222)",
                boxSizing: "border-box",
              }}
            >
              <option value="Local Account">Local Account</option>
              <option value="Personal Account">Personal Account</option>
              <option value="Admin Account">Admin Account</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "12px 16px",
            borderTop: "1px solid var(--bd-color, #ddd)",
            gap: "8px",
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              padding: "8px 24px",
              backgroundColor: "var(--wintheme, #f5f5f5)",
              color: "var(--txt-col, #222)",
              border: "1px solid var(--bd-color, #ccc)",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e8e8e8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--wintheme, #f5f5f5)")}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: "8px 24px",
              backgroundColor: "var(--clrPrm, #0067c0)",
              color: "var(--alt-txt, #fff)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Create Account
          </button>
        </div>
      </div>
    </>
  );
};
