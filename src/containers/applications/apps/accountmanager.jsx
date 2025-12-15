import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const WnAccountManager = () => {
  const wnapp = useSelector((state) => state.apps.people);
  const accounts = useSelector((state) => state.setting.accounts);
  const currentAccountId = useSelector((state) => state.setting.currentAccountId);
  const dispatch = useDispatch();

  if (!wnapp) return null;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    accountType: "Local Account",
  });

  const [selectedAccountId, setSelectedAccountId] = useState(null);

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

    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      accountType: "Local Account",
    });
  };

  const handleSwitchAccount = (accountId) => {
    dispatch({ type: "SWITCHACCOUNT", payload: accountId });
    setSelectedAccountId(accountId);
  };

  const handleDeleteAccount = (accountId) => {
    if (accountId === currentAccountId) {
      alert("Cannot delete the currently active account");
      return;
    }

    if (confirm("Are you sure you want to delete this account?")) {
      dispatch({
        type: "DELETEACCOUNT",
        payload: accountId,
      });
    }
  };

  return (
    <div
      className="msfiles floatTab dpShad aboutApp"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Accounts"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow aboutContent">
          <div className="aboutContainer">
            <div className="aboutHeader">
              <h1 className="aboutTitle">Accounts</h1>
              <p className="aboutSubtitle">Manage user accounts and profiles</p>
            </div>

            {accounts && accounts.length > 0 && (
              <div className="aboutSection">
                <h3 className="sectionTitle">Your Accounts ({accounts.length})</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => setSelectedAccountId(account.id)}
                      style={{
                        padding: "12px 14px",
                        backgroundColor: selectedAccountId === account.id ? "rgb(0 120 212 / 20%)" : "rgb(255 255 255 / 50%)",
                        border: selectedAccountId === account.id ? "2px solid #0078d4" : "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 10%)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        fontWeight: selectedAccountId === account.id ? "600" : "500",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedAccountId !== account.id) {
                          e.currentTarget.style.backgroundColor = "rgb(255 255 255 / 70%)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedAccountId !== account.id) {
                          e.currentTarget.style.backgroundColor = "rgb(255 255 255 / 50%)";
                        }
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginBottom: "4px" }}>
                            {account.username}
                          </div>
                          <div style={{ fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)" }}>
                            {account.type}
                          </div>
                        </div>
                        {currentAccountId === account.id && (
                          <span style={{
                            display: "inline-block",
                            backgroundColor: "#0078d4",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}>
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedAccountId && accounts && accounts.find((a) => a.id === selectedAccountId) && (
              <div className="aboutSection">
                <h3 className="sectionTitle">Account Details</h3>
                <div style={{ marginTop: "12px" }}>
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px" }}>
                      Username
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", backgroundColor: "rgb(255 255 255 / 60%)", padding: "10px 12px", borderRadius: "6px", border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 10%)" }}>
                      {accounts.find((a) => a.id === selectedAccountId)?.username}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px" }}>
                      Account Type
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", backgroundColor: "rgb(255 255 255 / 60%)", padding: "10px 12px", borderRadius: "6px", border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 10%)" }}>
                      {accounts.find((a) => a.id === selectedAccountId)?.type}
                    </div>
                  </div>

                  {currentAccountId !== selectedAccountId && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                      <button
                        onClick={() => handleSwitchAccount(selectedAccountId)}
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          backgroundColor: "#0078d4",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#106ebe")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0078d4")}
                      >
                        Switch Account
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(selectedAccountId)}
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          backgroundColor: "#d13438",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e81123")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#d13438")}
                      >
                        Delete Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="aboutSection lastSection">
              <h3 className="sectionTitle">Create New Account</h3>
              <div style={{ marginTop: "12px" }}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px", fontWeight: "600" }}>
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
                      padding: "10px 12px",
                      fontSize: "13px",
                      border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)",
                      borderRadius: "6px",
                      backgroundColor: "rgb(255 255 255 / 60%)",
                      color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                      boxSizing: "border-box",
                      transition: "all 0.15s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#0078d4")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(var(--txt_clr-rgb, 0 0 0) / 15%)")}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px", fontWeight: "600" }}>
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
                      padding: "10px 12px",
                      fontSize: "13px",
                      border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)",
                      borderRadius: "6px",
                      backgroundColor: "rgb(255 255 255 / 60%)",
                      color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                      boxSizing: "border-box",
                      transition: "all 0.15s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#0078d4")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(var(--txt_clr-rgb, 0 0 0) / 15%)")}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px", fontWeight: "600" }}>
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
                      padding: "10px 12px",
                      fontSize: "13px",
                      border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)",
                      borderRadius: "6px",
                      backgroundColor: "rgb(255 255 255 / 60%)",
                      color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                      boxSizing: "border-box",
                      transition: "all 0.15s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#0078d4")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(var(--txt_clr-rgb, 0 0 0) / 15%)")}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", marginBottom: "6px", fontWeight: "600" }}>
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: "13px",
                      border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)",
                      borderRadius: "6px",
                      backgroundColor: "rgb(255 255 255 / 60%)",
                      color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                      boxSizing: "border-box",
                      transition: "all 0.15s ease",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#0078d4")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(var(--txt_clr-rgb, 0 0 0) / 15%)")}
                  >
                    <option value="Local Account">Local Account</option>
                    <option value="Personal Account">Personal Account</option>
                    <option value="Admin Account">Admin Account</option>
                  </select>
                </div>

                <button
                  onClick={handleCreate}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#0078d4",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#106ebe")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#0078d4")}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .aboutApp {
          background: var(--fakeMica, #f3f3f3);
          color: rgb(var(--txt_clr-rgb, 0 0 0));
        }

        .aboutApp .restWindow {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          overflow-y: auto;
          background: var(--fakeMica, #f3f3f3);
        }

        .aboutContainer {
          padding: 32px;
          max-width: 700px;
          margin: 0 auto;
        }

        .aboutHeader {
          margin-bottom: 48px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 10%);
        }

        .aboutTitle {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: rgb(var(--txt_clr-rgb, 0 0 0));
        }

        .aboutSubtitle {
          font-size: 14px;
          color: rgb(var(--txt_clr-rgb, 0 0 0) / 66%);
          margin: 0;
        }

        .aboutSection {
          margin-bottom: 32px;
          padding: 16px;
          background: rgb(255 255 255 / 60%);
          border-radius: 8px;
          border: 1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 5%);
        }

        .aboutSection.lastSection {
          margin-bottom: 0;
        }

        .sectionTitle {
          font-size: 15px;
          font-weight: 600;
          color: rgb(var(--txt_clr-rgb, 0 0 0));
          margin: 0 0 12px 0;
        }

        @media (prefers-color-scheme: dark) {
          .aboutApp {
            background: var(--fakeMica, #1e1e1e);
            color: rgb(var(--txt_clr-rgb, 255 255 255));
          }

          .aboutApp .restWindow {
            background: var(--fakeMica, #1e1e1e);
          }

          .aboutSection {
            background: rgb(255 255 255 / 5%);
            border: 1px solid rgb(var(--txt_clr-rgb, 255 255 255) / 8%);
          }
        }
      `}</style>
    </div>
  );
};
