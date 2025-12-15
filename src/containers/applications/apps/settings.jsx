import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../actions";
import { Image, ToolBar } from "../../../utils/general";
import LangSwitch from "./assets/Langswitch";
import "./assets/settings.scss";
import data from "./assets/settingsData.json";

const uploadProfilePicture = (dispatch) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        localStorage.setItem('profilePicture', imageData);
        // Dispatch action to update Redux state
        dispatch({
          type: "SETPROFILEPICTURE",
          payload: imageData,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to load profile picture:', error);
      alert('Failed to load profile picture. Please try another image.');
    }
  };
  input.click();
};

export const Settings = () => {
  const wnapp = useSelector((state) => state.apps.settings);

  if (!wnapp) return null;

  const theme = useSelector((state) => state.setting.person.theme);
  const dispatch = useDispatch();

  const wall = useSelector((state) => state.wallpaper);

  const [page, setPage] = useState("System"); // default System
  const [nav, setNav] = useState("");
  const [updating, setUpdating] = useState(false);
  const [upmodalOpen, setUpmodalOpen] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [tempConfirmPassword, setTempConfirmPassword] = useState("");

  const themechecker = {
    default: "light",
    dark: "dark",
    ThemeA: "dark",
    ThemeB: "dark",
    ThemeD: "light",
    ThemeC: "light",
  };

  const handleWallAndTheme = (e) => {
    var payload = e.target.dataset.payload;
    var theme_nxt = themechecker[payload.split("/")[0]],
      src = payload;

    if (theme_nxt != theme) {
      changeTheme();
    }

    dispatch({
      type: "WALLSET",
      payload: src,
    });
  };

  const userName = useSelector((state) => state.setting.person.name);
  const profilePicture = useSelector((state) => state.setting.person.picture);

  const handleEditUsername = () => {
    setEditingUsername(true);
    setTempUsername(userName);
  };

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      dispatch({
        type: "STNGSETV",
        payload: {
          path: "person.name",
          value: tempUsername,
        },
      });
      setEditingUsername(false);
    }
  };

  const handleCancelUsername = () => {
    setEditingUsername(false);
    setTempUsername("");
  };

  const handleEditPassword = () => {
    setEditingPassword(true);
    setTempPassword("");
    setTempConfirmPassword("");
  };

  const handleSavePassword = () => {
    if (!tempPassword.trim()) {
      alert("Password cannot be empty");
      return;
    }

    if (tempPassword !== tempConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (tempPassword.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    dispatch({
      type: "SETADMINPASSWORD",
      payload: tempPassword,
    });
    setEditingPassword(false);
    setTempPassword("");
    setTempConfirmPassword("");
    alert("Password updated successfully");
  };

  const handleCancelPassword = () => {
    setEditingPassword(false);
    setTempPassword("");
    setTempConfirmPassword("");
  };

  return (
    <div
      className="settingsApp floatTab dpShad"
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
        name="Settings"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            <div className="nav_top">
              <div className="account" onClick={() => setPage("Accounts")}>
                <img
                  src={profilePicture || "img/settings/defAccount.webp"}
                  alt=""
                  height={60}
                  width={60}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <p>{userName}</p>
                  <p>Local Account</p>
                </div>
              </div>
              <input
                type="text"
                className="search"
                placeholder="Find a setting "
                name="search"
              />
            </div>
            <div className="nav_bottom win11Scroll">
              {Object.keys(data).map((e) => {
                return (
                  <div
                    key={e}
                    className={`navLink ${e === page ? "selected" : ""}`}
                    onClick={() => {
                      // avoid inline functions
                      setPage(e);
                    }}
                  >
                    <img
                      src={`img/settings/${e}.webp`}
                      alt=""
                      height={16}
                      width={16}
                    />
                    {e}
                  </div>
                );
              })}
              <div className="marker"></div>
            </div>
          </nav>

          {Object.keys(data).map((e) => {
            return (
              page === e && (
                <main key={e}>
                  <h1>{e}</h1>
                  <div className="tilesCont win11Scroll">
                    {data[e].map((e, i) => {
                      switch (e.type) {
                        case "sysTop":
                          return (
                            <div key={i} className={e.type}>
                              <div className="left">
                                <img
                                  src={`img/wallpaper/${wall.src}`}
                                  alt=""
                                  className="device_img"
                                />
                                <div className="column_device">
                                  <p className="device_name">Liber-V</p>
                                  <p className="device_model">NS14A8</p>
                                  <p className="device_rename">Rename</p>
                                </div>
                              </div>
                              <div className="right">
                                <div className="column">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg"
                                    height={20}
                                    alt=""
                                  />
                                  <p>
                                    Microsoft 365
                                    <br />
                                    <span className="column_lower">
                                      View benefits
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className="column"
                                  onClick={() => setPage("Windows Update")}
                                >
                                  <img
                                    src="img/settings/Windows Update.webp"
                                    alt=""
                                    height={20}
                                  />
                                  <p>
                                    Windows Update
                                    <br />
                                    <span className="column_lower">
                                      You're up to date
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        case "netTop":
                          return (
                            <div key={i} className="netTop">
                              <div>
                                <img
                                  src="img/settings/wifi.png"
                                  alt=""
                                  height={100}
                                />
                                <div>
                                  <h2 className="font-medium text-lg">WiFi</h2>
                                  <p>Connected, secured</p>
                                </div>
                              </div>
                              <div className="box">
                                <span className="settingsIcon"></span>
                                <div>
                                  <h3>Properties</h3>
                                  <p>Public network 5 Ghz</p>
                                </div>
                              </div>
                              <div className="box">
                                <span className="settingsIcon"></span>
                                <div>
                                  <h3>Data Usage</h3>
                                  <p>
                                    {Math.round(Math.random() * 100)}GB, last 30
                                    days
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        case "personaliseTop":
                          return (
                            <div key={i} className="personaliseTop">
                              <img
                                className="mainImg"
                                src={`img/wallpaper/${wall.src}`}
                                alt=""
                              />
                              <div>
                                <h3>Select a theme to apply</h3>
                                <div className="bgBox">
                                  {wall.themes.map((e, i) => {
                                    return (
                                      <Image
                                        key={i}
                                        className={
                                          wall.src.includes(e) ? "selected" : ""
                                        }
                                        src={`img/wallpaper/${e}/img0.jpg`}
                                        ext
                                        onClick={handleWallAndTheme}
                                        click="WALLSET"
                                        payload={`${e}/img0.jpg`}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        case "accountsTop":
                          return (
                            <div key={i} className="accountsTop ">
                              <img
                                src={profilePicture || "img/settings/defAccount.webp"}
                                alt=""
                                width={90}
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                              />
                              <div>
                                {editingUsername ? (
                                  <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                    <input
                                      type="text"
                                      value={tempUsername}
                                      onChange={(e) => setTempUsername(e.target.value)}
                                      style={{
                                        padding: "6px 10px",
                                        border: "1px solid var(--gray1, #bbb)",
                                        borderRadius: "4px",
                                        background: "var(--bg1, white)",
                                        color: "var(--txt-col, #222)",
                                        fontSize: "13px",
                                        flex: 1,
                                      }}
                                      autoFocus
                                    />
                                    <button
                                      onClick={handleSaveUsername}
                                      style={{
                                        padding: "6px 12px",
                                        background: "var(--clrPrm, #0067c0)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelUsername}
                                      style={{
                                        padding: "6px 12px",
                                        background: "var(--bg2, #f5f5f5)",
                                        color: "var(--txt-col, #222)",
                                        border: "1px solid var(--gray1, #bbb)",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <p style={{ cursor: "pointer", color: "var(--clrPrm, #0067c0)" }} onClick={handleEditUsername}>
                                      {userName.toUpperCase()} (Click to edit)
                                    </p>
                                  </>
                                )}
                                <p>Local Account</p>
                                <p>Administrator</p>
                                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--gray1, #ddd)" }}>
                                  <p style={{ marginBottom: "8px", fontSize: "13px", fontWeight: "500" }}>Password</p>
                                  {editingPassword ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                      <input
                                        type="password"
                                        placeholder="New password"
                                        value={tempPassword}
                                        onChange={(e) => setTempPassword(e.target.value)}
                                        style={{
                                          padding: "8px 10px",
                                          border: "1px solid var(--gray1, #bbb)",
                                          borderRadius: "4px",
                                          background: "var(--bg1, white)",
                                          color: "var(--txt-col, #222)",
                                          fontSize: "13px",
                                        }}
                                        autoFocus
                                      />
                                      <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={tempConfirmPassword}
                                        onChange={(e) => setTempConfirmPassword(e.target.value)}
                                        style={{
                                          padding: "8px 10px",
                                          border: "1px solid var(--gray1, #bbb)",
                                          borderRadius: "4px",
                                          background: "var(--bg1, white)",
                                          color: "var(--txt-col, #222)",
                                          fontSize: "13px",
                                        }}
                                      />
                                      <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                          onClick={handleSavePassword}
                                          style={{
                                            padding: "6px 12px",
                                            background: "var(--clrPrm, #0067c0)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            flex: 1,
                                          }}
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={handleCancelPassword}
                                          style={{
                                            padding: "6px 12px",
                                            background: "var(--bg2, #f5f5f5)",
                                            color: "var(--txt-col, #222)",
                                            border: "1px solid var(--gray1, #bbb)",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            flex: 1,
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={handleEditPassword}
                                      style={{
                                        padding: "6px 12px",
                                        background: "var(--clrPrm, #0067c0)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Set/Change Password
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        case "timeTop":
                          return (
                            <div className="timeTop">
                              <h1>
                                {new Date().toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </h1>
                            </div>
                          );
                        case "langSwitcher":
                          return (
                            <div key={i} className="tile langSwitcherTile">
                              <span className="settingsIcon"></span>
                              <div className="tile_content">
                                <p>Windows display language</p>
                                <p className="tile_desc">
                                  Windows features like Settings and File
                                  Explorer will appear in this language
                                </p>
                              </div>
                              <LangSwitch />
                            </div>
                          );
                        case "updateTop":
                          return (
                            <div key={i} className="updateTop">
                              <div className="left">
                                <img
                                  src="img/settings/update.png"
                                  width={90}
                                  alt=""
                                />
                                <div>
                                  <h2>You're up to date</h2>
                                  <p>Last checked: Today</p>
                                </div>
                              </div>
                              <div className="right">
                                <div
                                  className="btn"
                                  onClick={() => {
                                    setUpdating(true);
                                    setTimeout(() => {
                                      setUpdating(false);
                                      setUpmodalOpen(true);
                                    }, Math.random() * 2000);
                                  }}
                                >
                                  {updating
                                    ? "Checking for updates..."
                                    : "Check for updates"}
                                </div>
                              </div>
                            </div>
                          );

                        case "subHeading":
                        case "spacer":
                          return (
                            <div key={i} className={e.type}>
                              {e.name}
                            </div>
                          );
                        case "tile":
                        case "tile square":
                        case "tile thin-blue":
                          return (
                            <div key={e.name} className={e.type} onClick={() => {
                              if (e.name === "Upload Profile Picture") {
                                uploadProfilePicture(dispatch);
                              }
                            }}>
                              <span className="settingsIcon">{e.icon}</span>
                              <div>
                                <p>{e.name}</p>
                                <p className="tile_desc">{e.desc}</p>
                              </div>
                            </div>
                          );
                        default:
                          return console.log(
                            `error - type ${e.type} not found`,
                          );
                      }
                    })}
                  </div>
                </main>
              )
            );
          })}

          {upmodalOpen && (
            <>
              <div className="absolute z-30 bg-black bg-opacity-60 h-full w-full top-0 left-0"></div>

              <div
                className="absolute top-[50%] left-[50%] z-50 rounded"
                style={{
                  transform: `translateX(-50%) translateY(-50%)`,
                  background: `var(--wintheme)`,
                  padding: `1.5rem`,
                }}
              >
                <h1
                  style={{
                    marginBottom: `10px`,
                  }}
                  className="text-2xl font-semibold"
                >
                  Restart required
                </h1>
                <p>
                  Some changes will not take effect until you restart your
                  device.
                </p>

                <div
                  className="flex"
                  style={{
                    marginTop: `14px`,
                  }}
                >
                  <button
                    style={{
                      padding: "10px",
                      backgroundColor: "var(--clrPrm)",
                      color: "var(--alt-txt)",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      // Clear the cache and reload the page
                      window.location =
                        window.location.href + `?clearCache=${Math.random()}`;
                    }}
                    className="flex-1 rounded border-none hover:opacity-95"
                  >
                    Restart now
                  </button>
                  <button
                    style={{
                      padding: "10px",
                      color: "var(--sat-txt)",
                    }}
                    className="flex-1 rounded border"
                    onClick={() => {
                      setUpmodalOpen(false);
                    }}
                  >
                    Restart later
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="navMenuBtn" onClick={() => setNav(nav ? "" : "open")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
              width={24}
              height={24}
            >
              <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
