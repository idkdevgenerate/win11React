import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar } from "../../../utils/general";
import { dispatchAction, handleFileOpen } from "../../../actions";
import "./assets/fileexpo.scss";

const NavTitle = (props) => {
  var src = props.icon || "folder";

  return (
    <div
      className="navtitle flex prtclk"
      data-action={props.action}
      data-payload={props.payload}
      onClick={dispatchAction}
    >
      <Icon
        className="mr-1"
        src={"win/" + src + "-sm"}
        width={props.isize || 16}
      />
      <span>{props.title}</span>
    </div>
  );
};

const FolderDrop = ({ dir }) => {
  const files = useSelector((state) => state.files);
  const folder = files.data.getId(dir);

  return (
    <>
      {folder.data &&
        folder.data.map((item, i) => {
          if (item.type == "folder") {
            return (
              <Dropdown
                key={i}
                icon={item.info && item.info.icon}
                title={item.name}
                notoggle={item.data.length == 0}
                dir={item.id}
              />
            );
          }
        })}
    </>
  );
};

const Dropdown = (props) => {
  const [open, setOpen] = useState(props.isDropped != null);
  const special = useSelector((state) => state.files.data.special);
  const [fid, setFID] = useState(() => {
    if (props.spid) return special[props.spid];
    else return props.dir;
  });
  const toggle = () => setOpen(!open);

  return (
    <div className="dropdownmenu">
      <div className="droptitle">
        {!props.notoggle ? (
          <Icon
            className="arrUi"
            fafa={open ? "faChevronDown" : "faChevronRight"}
            width={10}
            onClick={toggle}
            pr
          />
        ) : (
          <Icon className="arrUi opacity-0" fafa="faCircle" width={10} />
        )}
        <NavTitle
          icon={props.icon}
          title={props.title}
          isize={props.isize}
          action={props.action != "" ? props.action || "FILEDIR" : null}
          payload={fid}
        />
        {props.pinned != null ? (
          <Icon className="pinUi" src="win/pinned" width={16} />
        ) : null}
      </div>
      {!props.notoggle ? (
        <div className="dropcontent">
          {open ? props.children : null}
          {open && fid != null ? <FolderDrop dir={fid} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export const Explorer = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.explorer);

  if (!wnapp) return null;

  const files = useSelector((state) => state.files);
  const protectionAlert = useSelector((state) => state.globals.protectionAlert);
  const blueScreen = useSelector((state) => state.globals.blueScreen);
  const fdata = files.data.getId(files.cdir);
  const [cpath, setPath] = useState(files.cpath);
  const [searchtxt, setShText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => setPath(e.target.value);
  const handleSearchChange = (e) => setShText(e.target.value);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "FILEPATH", payload: cpath });
    }
  };

  const DirCont = () => {
    var arr = [],
      curr = fdata,
      index = 0;

    while (curr) {
      arr.push(
        <div key={index++} className="dirCont flex items-center">
          <div
            className="dncont"
            onClick={dispatchAction}
            tabIndex="-1"
            data-action="FILEDIR"
            data-payload={curr.id}
          >
            {curr.name}
          </div>
          <Icon className="dirchev" fafa="faChevronRight" width={8} />
        </div>,
      );

      curr = curr.host;
    }

    arr.push(
      <div key={index++} className="dirCont flex items-center">
        <div className="dncont" tabIndex="-1">
          This PC
        </div>
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>,
    );

    arr.push(
      <div key={index++} className="dirCont flex items-center">
        <Icon
          className="pr-1 pb-px"
          src={"win/" + fdata.info.icon + "-sm"}
          width={16}
        />
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>,
    );

    return (
      <div key={index++} className="dirfbox h-full flex">
        {arr.reverse()}
      </div>
    );
  };

  useEffect(() => {
    setPath(files.cpath);
    setShText("");
  }, [files.cpath]);

  return (
    <div
      className="msfiles floatTab dpShad"
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
        name="File Explorer"
      />
      <div className="windowScreen flex flex-col">
        <Ribbon />
        <div className="restWindow flex-grow flex flex-col">
          <div className="sec1">
            <Icon
              className={
                "navIcon hvtheme" + (files.hid == 0 ? " disableIt" : "")
              }
              fafa="faArrowLeft"
              width={14}
              click="FILEPREV"
              pr
            />
            <Icon
              className={
                "navIcon hvtheme" +
                (files.hid + 1 == files.hist.length ? " disableIt" : "")
              }
              fafa="faArrowRight"
              width={14}
              click="FILENEXT"
              pr
            />
            <Icon
              className="navIcon hvtheme"
              fafa="faArrowUp"
              width={14}
              click="FILEBACK"
              pr
            />
            <div className="path-bar noscroll" tabIndex="-1">
              <input
                className="path-field"
                type="text"
                value={cpath}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
              <DirCont />
            </div>
            <div className="srchbar">
              <Icon className="searchIcon" src="search" width={12} />
              <input
                type="text"
                onChange={handleSearchChange}
                value={searchtxt}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="sec2">
            <NavPane />
            <ContentArea searchtxt={searchtxt} />
          </div>
          <div className="sec3">
            <div className="item-count text-xs">{fdata.data.length} items</div>
            <div className="view-opts flex">
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="5"
                open={files.view == 5}
                src="win/viewinfo"
                width={16}
              />
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="1"
                open={files.view == 1}
                src="win/viewlarge"
                width={16}
              />
            </div>
          </div>
        </div>
      </div>

      {protectionAlert && (
        <>
          <div 
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: "9990",
            }}
            onClick={() => dispatch({ type: "HIDEPROTECTION" })}
          ></div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--wintheme)",
              padding: "0",
              width: "420px",
              border: "1px solid var(--bd-color, #ccc)",
              borderRadius: "8px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              zIndex: "9999",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderBottom: "1px solid var(--bd-color, #ddd)",
            }}>
              <div style={{
                fontSize: "24px",
                marginRight: "12px",
                color: "#E81123"
              }}>⚠️</div>
              <span style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--sat-txt, #777)"
              }}>Delete Protected Files?</span>
            </div>
            
            <div style={{
              padding: "20px 16px",
              color: "var(--sat-txt, #777)",
              fontSize: "13px",
              lineHeight: "1.5"
            }}>
              <p style={{ margin: "0 0 12px 0" }}>
                <strong style={{ color: "var(--txt-col, #222)" }}>This item is protected by Windows</strong>
              </p>
              <p style={{ margin: "0" }}>
                You do not have permission to delete this system file or folder. Contact your system administrator if you believe this file should be deleted.
              </p>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "12px 16px",
              borderTop: "1px solid var(--bd-color, #ddd)",
              gap: "8px"
            }}>
              <button
                onClick={() => dispatch({ type: "HIDEPROTECTION" })}
                style={{
                  padding: "8px 24px",
                  backgroundColor: "var(--clrPrm, #0067c0)",
                  color: "var(--alt-txt, #fff)",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}

      {blueScreen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "#0078D4",
            zIndex: "10000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#fff",
            fontFamily: "Segoe UI, Arial, sans-serif",
            padding: "40px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "600px" }}>
            <div style={{
              fontSize: "36px",
              marginBottom: "20px",
              fontWeight: "600"
            }}>
              :(
            </div>
            <div style={{
              fontSize: "24px",
              marginBottom: "12px",
              fontWeight: "600"
            }}>
              Your PC ran into a problem and needs to restart.
            </div>
            <div style={{
              fontSize: "14px",
              marginBottom: "20px",
              opacity: "0.9",
              lineHeight: "1.6"
            }}>
              <p style={{ margin: "0 0 12px 0" }}>
                UNAUTHORIZED DELETION ATTEMPT
              </p>
              <p style={{ margin: "0 0 12px 0" }}>
                You attempted to delete protected system files without proper authorization.
              </p>
              <p style={{ margin: "0" }}>
                To regain access, open Command Prompt and execute: <br />
                <strong>cd /c://OS/root</strong><br />
                <strong>grant del dis</strong>
              </p>
            </div>
            <div style={{
              fontSize: "13px",
              opacity: "0.7",
              marginTop: "40px"
            }}>
              <p style={{ margin: "0 0 12px 0" }}>Error Code: 0x80000000</p>
              <p style={{ margin: "0" }}>
                <button
                  onClick={() => dispatch({ type: "HIDEBLUESCREEN" })}
                  style={{
                    padding: "10px 30px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    marginTop: "20px"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"}
                >
                  Dismiss
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentArea = ({ searchtxt }) => {
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);
  const [selected, setSelect] = useState(null);
  const fdata = files.data.getId(files.cdir);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelect(e.target.dataset.id);
  };

  const handleDouble = (e) => {
    e.stopPropagation();
    handleFileOpen(e.target.dataset.id);
  };

  const emptyClick = (e) => {
    setSelect(null);
  };

  const handleKey = (e) => {
    if (e.key == "Backspace") {
      dispatch({ type: "FILEPREV" });
    }
  };

  return (
    <div
      className="contentarea"
      onClick={emptyClick}
      onKeyDown={handleKey}
      tabIndex="-1"
    >
      <div className="contentwrap win11Scroll">
        <div className="gridshow" data-size="lg">
          {fdata.data.map((item, i) => {
            return (
              item.name.includes(searchtxt) && (
                <div
                  key={i}
                  className="conticon hvtheme flex flex-col items-center prtclk"
                  data-id={item.id}
                  data-name={item.name}
                  data-menu="file"
                  data-focus={selected == item.id}
                  onClick={handleClick}
                  onDoubleClick={handleDouble}
                >
                  <Image src={`icon/win/${item.info.icon}`} />
                  <span>{item.name}</span>
                </div>
              )
            );
          })}
        </div>
        {fdata.data.length == 0 ? (
          <span className="text-xs mx-auto">This folder is empty.</span>
        ) : null}
      </div>
    </div>
  );
};

const NavPane = ({}) => {
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);

  return (
    <div className="navpane win11Scroll">
      <div className="extcont">
        <Dropdown icon="star" title="Quick access" action="" isDropped>
          <Dropdown
            icon="down"
            title="Downloads"
            spid="%downloads%"
            notoggle
            pinned
          />
          <Dropdown icon="user" title="Admin" spid="%user%" notoggle pinned />
          <Dropdown
            icon="docs"
            title="Documents"
            spid="%documents%"
            notoggle
            pinned
          />
          <Dropdown title="Github" spid="%github%" notoggle />
          <Dropdown icon="pics" title="Pictures" spid="%pictures%" notoggle />
        </Dropdown>
        <Dropdown icon="onedrive" title="OneDrive" spid="%onedrive%" />
        <Dropdown icon="thispc" title="This PC" action="" isDropped>
          <Dropdown icon="desk" title="Desktop" spid="%desktop%" />
          <Dropdown icon="docs" title="Documents" spid="%documents%" />
          <Dropdown icon="down" title="Downloads" spid="%downloads%" />
          <Dropdown icon="music" title="Music" spid="%music%" />
          <Dropdown icon="pics" title="Pictures" spid="%pictures%" />
          <Dropdown icon="vid" title="Videos" spid="%videos%" />
          <Dropdown icon="disc" title="OS (C:)" spid="%cdrive%" />
          <Dropdown icon="disk" title="Blue (D:)" spid="%ddrive%" />
        </Dropdown>
      </div>
    </div>
  );
};

const Ribbon = ({}) => {
  return (
    <div className="msribbon flex">
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="new" ui width={18} margin="0 6px" />
          <span>New</span>
        </div>
      </div>
      <div className="ribsec">
        <Icon src="cut" ui width={18} margin="0 6px" />
        <Icon src="copy" ui width={18} margin="0 6px" />
        <Icon src="paste" ui width={18} margin="0 6px" />
        <Icon src="rename" ui width={18} margin="0 6px" />
        <Icon src="share" ui width={18} margin="0 6px" />
      </div>
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="sort" ui width={18} margin="0 6px" />
          <span>Sort</span>
        </div>
        <div className="drdwcont flex">
          <Icon src="view" ui width={18} margin="0 6px" />
          <span>View</span>
        </div>
      </div>
    </div>
  );
};
