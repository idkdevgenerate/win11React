import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const WnRegistryEditor = () => {
  const wnapp = useSelector((state) => state.apps.registry);
  const [selectedKey, setSelectedKey] = useState("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion");
  const [searchTerm, setSearchTerm] = useState("");

  if (!wnapp) return null;

  const registryKeys = [
    "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion",
    "HKEY_LOCAL_MACHINE\\SYSTEM\\ControlSet001\\Services",
    "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion",
    "HKEY_LOCAL_MACHINE\\SOFTWARE\\Classes",
    "HKEY_LOCAL_MACHINE\\HARDWARE",
    "HKEY_LOCAL_MACHINE\\SAM",
    "HKEY_LOCAL_MACHINE\\SECURITY",
  ];

  const registryValues = {
    "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion": [
      { name: "ProgramFilesDir", value: "C:\\Program Files", type: "REG_SZ" },
      { name: "CommonFilesDir", value: "C:\\Program Files\\Common Files", type: "REG_SZ" },
      { name: "DevicePath", value: "%SystemRoot%\\inf", type: "REG_SZ" },
      { name: "ShellCompatMode", value: "1", type: "REG_DWORD" },
    ],
    default: [
      { name: "(Default)", value: "(value not set)", type: "REG_SZ" },
    ],
  };

  const values = registryValues[selectedKey] || registryValues.default;

  return wnapp.hide ? null : (
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
        name="Registry Editor"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow aboutContent">
          <div className="aboutContainer">
            <div className="aboutHeader">
              <h1 className="aboutTitle">Registry Editor</h1>
              <p className="aboutSubtitle">Browse and view Windows registry entries</p>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Search Registry Keys</h3>
              <input
                type="text"
                placeholder="Search keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  border: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)",
                  borderRadius: "6px",
                  backgroundColor: "rgb(255 255 255 / 80%)",
                  color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Registry Keys</h3>
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {registryKeys.map((key, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedKey(key)}
                    style={{
                      padding: "10px 12px",
                      backgroundColor: selectedKey === key ? "rgb(0 120 212 / 20%)" : "rgb(255 255 255 / 50%)",
                      border: selectedKey === key ? "1px solid #0078d4" : "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 10%)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "rgb(var(--txt_clr-rgb, 0 0 0))",
                      transition: "all 0.15s ease",
                      fontWeight: selectedKey === key ? "500" : "400",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedKey !== key) e.currentTarget.style.backgroundColor = "rgb(255 255 255 / 70%)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedKey !== key) e.currentTarget.style.backgroundColor = "rgb(255 255 255 / 50%)";
                    }}
                  >
                    📁 {key.split("\\").pop()}
                  </div>
                ))}
              </div>
            </div>

            <div className="aboutSection lastSection">
              <h3 className="sectionTitle">Key Values</h3>
              <p className="sectionDescription">Current Key:</p>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginTop: "8px", marginBottom: "12px", wordBreak: "break-all", backgroundColor: "rgb(255 255 255 / 60%)", padding: "8px", borderRadius: "4px" }}>
                {selectedKey}
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgb(var(--txt_clr-rgb, 0 0 0) / 15%)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: "600", color: "rgb(var(--txt_clr-rgb, 0 0 0))" }}>
                      Name
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: "600", color: "rgb(var(--txt_clr-rgb, 0 0 0))" }}>
                      Type
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: "600", color: "rgb(var(--txt_clr-rgb, 0 0 0))" }}>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgb(var(--txt_clr-rgb, 0 0 0) / 8%)" }}>
                      <td style={{ padding: "8px 0", color: "rgb(var(--txt_clr-rgb, 0 0 0))", fontWeight: "500" }}>
                        {item.name}
                      </td>
                      <td style={{ padding: "8px 12px", color: "rgb(0 120 212)" }}>
                        {item.type}
                      </td>
                      <td style={{ padding: "8px 12px", color: "rgb(var(--txt_clr-rgb, 0 0 0) / 80%)", wordBreak: "break-all" }}>
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        .sectionDescription {
          font-size: 13px;
          color: rgb(var(--txt_clr-rgb, 0 0 0) / 80%);
          margin: 0 0 8px 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
