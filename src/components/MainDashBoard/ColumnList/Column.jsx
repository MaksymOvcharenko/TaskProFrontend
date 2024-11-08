import { Droppable } from "react-beautiful-dnd";

import s from "./Column.module.css";
import EditCardForm from "../../EditCard/EditCard.jsx";
import SvgIcon from "../../SvgIcon/SvgIcon.jsx";
import Card from "../Board/Card.jsx";
import AddCardForm from "../../AddCard/AddCard.jsx";

const Column = ({
  column,
  boardId,
  openModal,
  openModalEdit,
  openModalIndex,
  openModalEditIndex,
  labelOptions,
  closeModal,
  closeModalEdit,
}) => (
  <Droppable droppableId={column.id}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={s.columnWrapper}
      >
        <div className={s.columnNameBox}>
          <h2 className={s.columnName}>
            {column.columnTitle} {boardId}
          </h2>
          <div className={s.iconsBox}>
            <SvgIcon id="icon-pencil" className={s.columnIcons} />
            <SvgIcon id="icon-trash" className={s.columnIcons} />
          </div>
        </div>
        <div className={s.cardList}>
          {column.cards.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              card={card}
              index={cardIndex}
              labelOptions={labelOptions}
              openModalEdit={() => openModalEdit(cardIndex)}
            />
          ))}
          {provided.placeholder}
        </div>
        <button className={s.addCardBtn} onClick={() => openModal(column.id)}>
          <span className={s.btnWrapper}>
            <span className={s.btnIconWrapper}>
              <SvgIcon id="icon-plus" className={s.columnIcons} />
            </span>
            <span>Add another card</span>
          </span>
        </button>
        {openModalIndex === column.id && (
          <AddCardForm closeModal={closeModal} />
        )}
        {openModalEditIndex === column.id && (
          <EditCardForm closeModal={closeModalEdit} />
        )}
      </div>
    )}
  </Droppable>
);

export default Column;
