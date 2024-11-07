import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./EditBoard.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import noBack from "../../images/images-bg/images-bg-default.png";
import { updateBoard } from "../../redux/boards/operations.js"; //

const icons = [
  { id: "icon-Project", name: "Project" },
  { id: "icon-star", name: "Star" },
  { id: "icon-loading", name: "Loading" },
  { id: "icon-puzzle", name: "Puzzle" },
  { id: "icon-cube", name: "Cube" },
  { id: "icon-lightning", name: "Lightning" },
  { id: "icon-colors", name: "Colors" },
  { id: "icon-hexagon", name: "Hexagon" },
];

const backgrounds = [
  {
    source:
      "https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vlk8bztf90uy6itveqjl.png",
    alt: "cappodocia",
    key: "cappodocia",
  },
  {
    source:
      "https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/v0wt4bwax3bhdlag1ziv.png",
    alt: "baloon",
    key: "baloon",
  },
  // Other backgrounds ...
];

export const EditBoard = ({ closeModal, board }) => {
  const [iconsSelected, setIconsSelected] = useState(board?.icon || "icon-Project");
  const [backgroundSelected, setBackgroundSelected] = useState(board?.background || "no-background");
  const [title, setTitle] = useState(board?.title || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleIconChange = (event) =>
    setIconsSelected(event.currentTarget.dataset.source);
  const handleBackgroundChange = (event) =>
    setBackgroundSelected(event.currentTarget.dataset.source);

  const updatedBoardObject = {
    ...board, // Spread existing board details to retain other properties
    title,
    icon: iconsSelected,
    background: backgroundSelected,
  };

  const saveBoardChanges = () => {
    dispatch(updateBoard(updatedBoardObject));
    closeModal();
    navigate(`/${title}`);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className={styles.divCard}>
        <h2 className={styles.textNew}>Edit Board</h2>
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
                data-source={icon.id}
                name="icons"
                className={styles.inputRad}
                checked={iconsSelected === icon.id}
                onChange={handleIconChange}
              />
              <SvgIcon
                id={icon.id}
                className={
                  iconsSelected === icon.id ? styles.darkIcons : styles.serIcons
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
                data-source={bg.key}
                className={styles.inputBack}
                checked={backgroundSelected === bg.key}
                onChange={handleBackgroundChange}
              />
              <img src={bg.source} alt={bg.alt} className={styles.img_back} />
            </li>
          ))}
        </ul>
        <button className={styles.mainButton} onClick={saveBoardChanges}>
          <div className={styles.plusBtnZaglushka}>
            <SvgIcon id="icon-plus" className={styles.plusIcon} />
          </div>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBoard;
