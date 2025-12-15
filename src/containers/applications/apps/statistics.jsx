import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const WnStatisticsManager = () => {
  const wnapp = useSelector((state) => state.apps.statistics);
  
  if (!wnapp) return null;
  
  const [stats, setStats] = useState({
    cpu: 45,
    gpu: 32,
    ram: 58,
    disk: 71,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 100),
        gpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!wnapp) return null;

  const StatBar = ({ label, value, color }) => (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <label style={{ fontSize: "13px", fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))" }}>
          {label}
        </label>
        <span style={{ fontSize: "13px", fontWeight: "600", color: color }}>
          {value}%
        </span>
      </div>
      <div style={{ width: "100%", height: "6px", backgroundColor: "rgb(0 0 0 / 10%)", borderRadius: "3px", overflow: "hidden" }}>
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            backgroundColor: color,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

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
        name="Statistics Manager"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow aboutContent">
          <div className="aboutContainer">
            <div className="aboutHeader">
              <h1 className="aboutTitle">System Statistics</h1>
              <p className="aboutSubtitle">Real-time performance monitoring</p>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Performance Metrics</h3>
              <div style={{ marginTop: "12px" }}>
                <StatBar label="CPU Usage" value={stats.cpu} color="#0078d4" />
                <StatBar label="GPU Usage" value={stats.gpu} color="#107c10" />
                <StatBar label="Memory (RAM)" value={stats.ram} color="#f7630c" />
                <StatBar label="Disk Usage" value={stats.disk} color="#8764b8" />
              </div>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">System Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "13px", marginTop: "12px" }}>
                <div>
                  <span style={{ color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", fontSize: "12px" }}>Processor</span>
                  <div style={{ fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginTop: "4px", fontSize: "13px" }}>
                    Intel Core i7-12700
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", fontSize: "12px" }}>GPU</span>
                  <div style={{ fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginTop: "4px", fontSize: "13px" }}>
                    NVIDIA RTX 3080
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", fontSize: "12px" }}>Total RAM</span>
                  <div style={{ fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginTop: "4px", fontSize: "13px" }}>
                    32 GB
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgb(var(--txt_clr-rgb, 0 0 0) / 70%)", fontSize: "12px" }}>Total Storage</span>
                  <div style={{ fontWeight: "500", color: "rgb(var(--txt_clr-rgb, 0 0 0))", marginTop: "4px", fontSize: "13px" }}>
                    512 GB SSD
                  </div>
                </div>
              </div>
            </div>

            <div className="aboutSection lastSection">
              <h3 className="sectionTitle">System</h3>
              <p className="sectionDescription">
                Windows 11 React - A modern Windows 11 clone built with React
              </p>
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
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
