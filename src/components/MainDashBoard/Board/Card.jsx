import { Draggable } from "react-beautiful-dnd";

import EllipsisText from "react-ellipsis-text";
import s from "./Card.module.css";
import SvgIcon from "../../SvgIcon/SvgIcon.jsx";

const Card = ({ card, index, labelOptions, openModalEdit }) => {
  const cardPriority = labelOptions.find(
    (option) => option.priority === card.priority
  );
  const cardBackgroundColor = cardPriority ? cardPriority.color : "#fff";

  return (
    <Draggable draggableId={`${card.columnId}-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={s.card}
        >
          <div
            className={s.cardStatusSpanWrapper}
            style={{ backgroundColor: cardBackgroundColor }}
          ></div>
          <h3 className={s.cardTitle}>{card.cardTitle}</h3>
          <EllipsisText
            className={s.cardDescr}
            text={card.cardDescr}
            length={110}
          />
          <div className={s.cardDivider}></div>
          <div className={s.cardEditsInfo}>
            <div className={s.cardInfo}>
              <div className={s.priority}>
                <p className={s.priorityTitle}>Priority</p>
                <div className={s.priorityValueWrapper}>
                  <div
                    className={s.priorityCircle}
                    style={{ backgroundColor: cardBackgroundColor }}
                  ></div>
                  <p className={s.priorityValue}>{card.priority}</p>
                </div>
              </div>
              <div className={s.cardDeadline}>
                <p className={s.deadline}>Deadline</p>
                <p className={s.deadlineDate}>31/10/2024</p>
              </div>
            </div>
            <div className={s.cardIcons}>
              <SvgIcon
                id="icon-arrow-circle-broken-right"
                className={s.columnIcons}
              />
              <button onClick={openModalEdit}>
                <SvgIcon id="icon-pencil" className={s.columnIcons} />
              </button>
              <SvgIcon id="icon-trash" className={s.columnIcons} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
