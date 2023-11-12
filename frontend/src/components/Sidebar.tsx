import React from "react";
import icon from "../assets/icon.png";
import user from "../assets/user.png";

interface props {
  openPanel: () => void;
  setMenuState: (open: boolean) => void;
  menuState: boolean;
}

const Sidebar: React.FC<props> = ({ openPanel, setMenuState, menuState }) => {
  const switchMenuState = (): void => {
    if (menuState) {
      setMenuState(false);
    } else {
      setMenuState(true);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="upper_sidebar">
          <div className="upper_sidebar_inner_first">
            <img src={icon} className="sidebar_logo" />
          </div>

          <div className="upper_sidebar_inner_second">
            <li onClick={openPanel}>
              <span className="material-symbols-rounded">add</span>
            </li>
          </div>
        </div>

        <div className="under_sidebar">
          <div className="under_sidebar_content">
            <li>
              <span
                className="material-symbols-rounded"
                onClick={() => switchMenuState()}
              >
                menu
              </span>
            </li>
            <li>
              <span
                className="material-symbols-rounded"
                onClick={() =>
                  window.open("https://github.com/CuzImLel/TypeBoard")
                }
              >
                help
              </span>
            </li>

            <img src={user} className="sidebar_profile" width="40px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
