import { NavLink } from "react-router-dom";
import s from "./SideBar.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import cactusImg from "../../images/Sidebar/cactus.png";

const SideBar = () => {
  const boards = [
    { id: 1, name: "Board 1" },
    { id: 2, name: "Board 2" },
    { id: 3, name: "Board 3" },
  ];
  return (
    <>
      <div className={s.cont}>
        <h1 className={s.sidebarTitle}>My boards</h1>
        <div className={s.createBoard}>
          <p className={s.createBoardTitle}>Create new board</p>
          <button type="submit" className={s.addBtn}>
            <SvgIcon id="icon-plus" className={s.addBtnIcon} />
          </button>
        </div>
        <ul className={s.boardsList}>
          {boards.map((board) => (
            <li key={board.id} className={s.boardItem}>
              <NavLink to={`/home/${board.id}`} className={s.link}>
                <div className={s.linkContent}>
                  <SvgIcon id="icon-Project" className={s.projectIcon} />
                  {board.name}
                </div>
                <div className={s.btnGroup}>
                  <button type="button">
                    <SvgIcon id="icon-pencil" className={s.iconPencil} />
                  </button>
                  <button>
                    <SvgIcon id="icon-trash" className={s.iconTrash} />
                  </button>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={s.needHelpContainer}>
          <img src={cactusImg} className={s.cactus} />
          <p className={s.needHelpText}>
            If you need help with <span className={s.accent}>TaskPro</span>,
            check out our support resources or reach out to our customer support
            team.
          </p>
          <button type="button" className={s.needHelpBtn}>
            <SvgIcon id="icon-help-circle" className={s.needHelpIcon} />
            Need Help?
          </button>
        </div>
        <button type="button" className={s.logoutBtn}>
          <SvgIcon id="icon-login" className={s.logoutIcon} />
          Log out
        </button>
      </div>
    </>
  );
};

export default SideBar;
