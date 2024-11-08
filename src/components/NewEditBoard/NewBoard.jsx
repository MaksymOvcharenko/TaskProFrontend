import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./NewBoard.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

import noBack from "../../images/images-bg/images-bg-default.png";
import { addBoard } from "../../redux/boards/operations.js";
import icons from "../../images/icons/icons.js";
import backgrounds from "../../images/background/background.js";
// import backgrounds from "../../images/icons/background.js";

export const NewBoard = ({ closeModal }) => {
  const [iconsSelected, setIconsSelected] = useState("icon-Project");
  const [backgroundSelected, setBackgroundSelected] = useState({});
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleIconChange = (event) =>
    setIconsSelected(event.currentTarget.dataset.source);
  console.log();

  const handleBackgroundChange = (event) =>
    setBackgroundSelected(event.currentTarget.dataset.source);

  const newBoardObject = {
    title,
    icon: iconsSelected,
    background: backgroundSelected,
  };

  const createNewBoard = () => {
    console.log(backgroundSelected);

    dispatch(addBoard(newBoardObject));
    closeModal();
    // navigate(`/${title}`);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className={styles.divCard}>
        <h2 className={styles.textNew}>New board</h2>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={closeModal}>
          <SvgIcon id="icon-close" className={styles.iconclose} />
        </button>
        <h3 className={styles.textIcons}>Icons</h3>
        <ul className={styles.listDarkIcons}>
          {icons.map((icon) => (
            <li key={icon.id}>
              <input
                type="radio"
                data-source={icon.name}
                name="icons"
                className={styles.inputRad}
                checked={iconsSelected === icon.name}
                onChange={handleIconChange}
              ></input>
              <SvgIcon
                id={icon.id}
                className={
                  iconsSelected === icon.name
                    ? styles.darkIcons
                    : styles.serIcons
                }
              />
            </li>
          ))}
        </ul>
        <h3 className={styles.textBackground}>Background</h3>
        <ul className={styles.listColorIcons}>
          <li
            className={
              backgroundSelected === "no-background"
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backgrounds"
              data-source="no-background"
              className={styles.inputBack}
              checked={backgroundSelected === "no-background"}
              onChange={handleBackgroundChange}
            />
            <img src={noBack} alt="no-background" className={styles.img_back} />
          </li>
          {backgrounds.map((bg) => (
            <li
              key={bg.key}
              className={
                backgroundSelected === bg.key
                  ? styles.listItemActive
                  : styles.listItem
              }
            >
              <input
                type="radio"
                name="backgrounds"
                data-source={bg}
                className={styles.inputBack}
                checked={backgroundSelected === bg}
                onChange={handleBackgroundChange}
              />
              <img src={bg.min} alt={bg.alt} className={styles.img_back} />
            </li>
          ))}
        </ul>
        <button className={styles.mainButton} onClick={createNewBoard}>
          <div className={styles.plusBtnZaglushka}>
            <SvgIcon id="icon-plus" className={styles.plusIcon} />
          </div>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewBoard;
