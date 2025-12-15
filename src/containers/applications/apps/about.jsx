import React from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const About = () => {
  const wnapp = useSelector((state) => state.apps.code);

  if (!wnapp) return null;

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
        name="About"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow aboutContent">
          <div className="aboutContainer">
            <div className="aboutHeader">
              <h1 className="aboutTitle">Win11 React</h1>
              <p className="aboutSubtitle">A Windows 11 React Clone</p>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Origin</h3>
              <p className="sectionDescription">
                Original Repository:
              </p>
              <a
                href="https://github.com/blueedgetechno/win11React"
                target="_blank"
                rel="noreferrer"
                className="aboutLink"
              >
                github.com/blueedgetechno/win11React
              </a>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Modified & Hosted By</h3>
              <p className="sectionDescription">
                <strong>Credits to dotly</strong> for modifications and contributions
              </p>
            </div>

            <div className="aboutSection">
              <h3 className="sectionTitle">Live Demo</h3>
              <p className="sectionDescription">
                This version is hosted at:
              </p>
              <a
                href="https://win11.blueedge.me"
                target="_blank"
                rel="noreferrer"
                className="aboutLink"
              >
                win11.blueedge.me
              </a>
            </div>

            <div className="aboutSection lastSection">
              <h3 className="sectionTitle">License</h3>
              <p className="sectionDescription">
                This project is licensed under the Creative Commons License. See the repository for full details.
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
          margin: 0 0 8px 0;
          line-height: 1.5;
        }

        .aboutLink {
          display: inline-block;
          font-size: 13px;
          color: #0078d4;
          text-decoration: none;
          word-break: break-all;
          padding: 4px 0;
          border-radius: 2px;
          transition: all 0.15s ease;
          font-weight: 500;
        }

        .aboutLink:hover {
          color: #0084d1;
          text-decoration: underline;
          background: rgb(0 120 212 / 8%);
          padding: 4px 6px;
          border-radius: 4px;
        }

        .aboutLink:active {
          color: #006ba3;
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

          .aboutLink:hover {
            background: rgb(0 120 212 / 15%);
          }
        }
      `}</style>
    </div>
  );
};
