import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Battery from "../../components/shared/Battery";
import { Icon, Image } from "../../utils/general";
import "./back.scss";

export const Background = () => {
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(img/wallpaper/${wall.src})`,
      }}
    ></div>
  );
};

export const BootScreen = (props) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act == "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className="bootscreen">
      <div className={blackout ? "hidden" : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          <svg
            className="progressRing"
            height={48}
            width={48}
            viewBox="0 0 16 16"
          >
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const LockScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  const [password, setPass] = useState("");
  const [passType, setType] = useState(1);
  const [forgot, setForget] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.setting.person.name);
  const accounts = useSelector((state) => state.setting.accounts);
  const currentAccountId = useSelector((state) => state.setting.currentAccountId);
  const profilePicture = useSelector((state) => state.setting.person.picture);
  const adminPassword = useSelector((state) => state.setting.person.password);

  const action = (e) => {
    var act = e.target.dataset.action,
      payload = e.target.dataset.payload;

    if (act == "splash") setLock(true);
    else if (act == "inpass") {
      var val = e.target.value;
      if (!passType) {
        val = val.substring(0, 4);
        val = !Number(val) ? "" : val;
      }

      setPass(val);
    } else if (act == "forgot") setForget(true);
    else if (act == "pinlock") setType(0);
    else if (act == "passkey") setType(1);

    if (act == "pinlock" || act == "passkey") setPass("");
  };

  const proceed = () => {
    // If admin password is set, validate it
    if (adminPassword && adminPassword.length > 0) {
      if (!password) {
        setPasswordError("Password required");
        return;
      }
      if (password !== adminPassword) {
        setPasswordError("Incorrect password");
        setPass("");
        return;
      }
    }
    
    setUnLock(true);
    setTimeout(() => {
      dispatch({ type: "WALLUNLOCK" });
    }, 1000);
  };

  const action2 = (e) => {
    if (e.key == "Enter") proceed();
  };

  return (
    <div
      className={"lockscreen " + (props.dir == -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={userName}
            width={200}
            height={200}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid rgba(255, 255, 255, 0.3)"
            }}
          />
        ) : (
          <Image
            className="rounded-full overflow-hidden"
            src="img/asset/prof.jpg"
            w={200}
            ext
          />
        )}
        <div className="mt-2 text-2xl font-medium text-gray-200">
          {userName}
        </div>
        
        {adminPassword && adminPassword.length > 0 ? (
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "300px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPass(e.target.value);
                setPasswordError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") proceed();
              }}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                color: "white",
                fontSize: "14px",
                marginBottom: "8px",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            />
            {passwordError && (
              <div style={{
                color: "#ff6b6b",
                fontSize: "12px",
                marginBottom: "8px",
                textAlign: "center"
              }}>
                {passwordError}
              </div>
            )}
            <button
              onClick={proceed}
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "rgba(0, 120, 212, 0.9)",
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 120, 212, 1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0, 120, 212, 0.9)";
              }}
            >
              Unlock
            </button>
          </div>
        ) : (
          <div className="flex items-center mt-6 signInBtn" onClick={proceed}>
            Sign in
          </div>
        )}
        {accounts && accounts.length > 1 && (
          <div 
            className="text-xs text-gray-400 mt-4 handcr"
            onClick={() => setShowAccounts(!showAccounts)}
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              display: "inline-block"
            }}
          >
            {showAccounts ? "Hide other accounts" : "Change account"}
          </div>
        )}
        
        {showAccounts && (
          <div style={{
            marginTop: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "12px",
            borderRadius: "8px",
            maxHeight: "250px",
            overflowY: "auto"
          }}>
            {accounts && accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => {
                  dispatch({ type: "SWITCHACCOUNT", payload: account.id });
                  setShowAccounts(false);
                }}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  backgroundColor: currentAccountId === account.id ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "13px",
                  border: currentAccountId === account.id ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid transparent",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = currentAccountId === account.id ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div style={{ fontWeight: "500" }}>{account.username}</div>
                <div style={{ fontSize: "11px", opacity: "0.7" }}>{account.type}</div>
              </div>
            ))}
          </div>
        )}
        {/*   <input type={passType?"text":"password"} value={password} onChange={action}
              data-action="inpass" onKeyDown={action2} placeholder={passType?"Password":"PIN"}/>
          <Icon className="-ml-6 handcr" fafa="faArrowRight" width={14}
            color="rgba(170, 170, 170, 0.6)" onClick={proceed}/>
        </div>
        <div className="text-xs text-gray-400 mt-4 handcr"
          onClick={proceed}>
          {!forgot?`I forgot my ${passType?"password":"pin"}`:"Not my problem"}
        </div>
        <div className="text-xs text-gray-400 mt-6">
          Sign-in options
        </div>
        <div className="lockOpt flex">
          <Icon src="pinlock" onClick={action} ui width={36}
            click="pinlock" payload={passType==0}/>
          <Icon src="passkey" onClick={action} ui width={36}
            click="passkey" payload={passType==1}/>
        </div> */}
      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={16} invert />
        <Battery invert />
      </div>
    </div>
  );
};
