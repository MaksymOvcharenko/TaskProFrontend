import { NavLink } from "react-router-dom";
import s from "./SideBar.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import cactusImg from "../../images/Sidebar/cactus.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard} from "../../redux/boards/operations";
import { useState } from "react";
import NeedHelpForm from "../NeedHelpForm/NeedHelpForm";
import { logOut } from "../../redux/auth/operations.js";
import NewBoard from "../NewEditBoard/NewBoard.jsx";
import { selectSideBarVisibility } from "../../redux/sideBar/selectors.js";
import { toggleSideBar } from "../../redux/sideBar/slice.js";
import { selectBoards } from "../../redux/boards/selectors.js";
import { selectUser } from "../../redux/auth/selectors.js";
import { getBoardById } from "../../redux/сolumns/operations.js";

const SideBar = () => {
  const isSideBarVisible = useSelector(selectSideBarVisibility);

  const handleClose = () => {
    dispatch(toggleSideBar());
  };
  const reduxBoards = useSelector(selectBoards);
  const boards = reduxBoards.slice().reverse();
  const userId = useSelector(selectUser);

  const dispatch = useDispatch();
  const getBoardInfo = (id) => {
    dispatch(getBoardById(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteBoard(id));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const openAddBoard = () => setIsAddBoardOpen(true);
  const closeAddBoard = () => setIsAddBoardOpen(false);
  return (
    <>
      {isSideBarVisible && (
        <div className={s.overlay} onClick={handleClose}></div>
      )}
      <div className={`${s.cont} ${isSideBarVisible ? s.visible : s.hidden}`}>
        <div>
          <NavLink to="/home" className={s.logoContainer}>
            <span className={s.logoIconWrapper}>
              <SvgIcon id="icon-lightning" className={s.logoIcon} />
            </span>
            <h1 className={s.logoTitle}>TaskPro</h1>
          </NavLink>
          <h2 className={s.sidebarTitle}>My boards</h2>
          <div className={s.createBoard}>
            <p className={s.createBoardTitle}>Create new board</p>
            <button type="submit" className={s.addBtn} onClick={openAddBoard}>
              <SvgIcon id="icon-plus" className={s.addBtnIcon} />
            </button>
          </div>
          <ul className={s.boardsList}>
            {boards.map((board) => (
              <li
                key={board._id}
                className={s.boardItem}
                onClick={() => getBoardInfo(board._id)}
              >
                <NavLink to={`/home/${board._id}`} className={s.link}>
                  <div className={s.linkContent}>
                    <SvgIcon
                      id={`icon-${board.icon}`}
                      className={s.projectIcon}
                    />
                    {board.title}
                  </div>
                  <div className={s.btnGroup}>
                    <button type="button">
                      <SvgIcon id="icon-pencil" className={s.iconPencil} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(board.id)}
                    >
                      <SvgIcon id="icon-trash" className={s.iconTrash} />
                    </button>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={s.needHelpContainer}>
            <img src={cactusImg} className={s.cactus} />
            <p className={s.needHelpText}>
              If you need help with <span className={s.accent}>TaskPro</span>,
              check out our support resources or reach out to our customer
              support team.
            </p>
            <button type="button" className={s.needHelpBtn} onClick={openModal}>
              <SvgIcon id="icon-help-circle" className={s.needHelpIcon} />
              Need Help?
            </button>
            {isModalOpen && (
              <div>
                <NeedHelpForm closeModal={closeModal} />
              </div>
            )}
          </div>
          <button type="button" className={s.logoutBtn} onClick={handleLogOut}>
            <SvgIcon id="icon-login" className={s.logoutIcon} />
            Log out
          </button>
        </div>
        {isAddBoardOpen && (
          <div>
            <NewBoard closeModal={closeAddBoard} userId={userId._id} />
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
