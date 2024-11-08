import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./MainDashBoard.module.css";
import EllipsisText from "react-ellipsis-text";
import AddCardForm from "../AddCard/AddCard.jsx";
import EditCardForm from "../EditCard/EditCard.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddColumnForm from "../AddColumnForm/AddColumnForm.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { allColumnsByBoard } from "../../redux/сolumns/selectors.js";

const MainDashBoard = () => {
  const { boardId } = useParams();
  // 1. Параметри для пріоритетів карток
  const labelOptions = [
    { color: "#8fa1d0", priority: "Low" },
    { color: "#e09cb5", priority: "Medium" },
    { color: "#bedbb0", priority: "High" },
    { color: "#656565", priority: "Without priority" },
  ];

  // 2. Стан для колонок з початковими даними
  // const [columns, setColumns] = useState([
  //   {
  //     columnTitle: "Column title 1",
  //     id: "1",
  //     bordId: "1",
  //     cards: [
  //       {
  //         cardTitle: "Card 1",
  //         columnId: "1",
  //         cardDescr: "Description 1",
  //         priority: "Medium",
  //       },
  //       {
  //         cardTitle: "Card 2",
  //         columnId: "1",
  //         cardDescr: "Description 2",
  //         priority: "High",
  //       },
  //     ],
  //   },
  //   {
  //     columnTitle: "Column title 2",
  //     id: "2",
  //     bordId: "1",
  //     cards: [
  //       {
  //         cardTitle: "Card 3",
  //         columnId: "2",
  //         cardDescr: "Description 3",
  //         priority: "High",
  //       },
  //     ],
  //   },
  //   {
  //     columnTitle: "Column title 3",
  //     id: "3",
  //     bordId: "1",
  //     cards: [
  //       {
  //         cardTitle: "Card 4",
  //         columnId: "3",
  //         cardDescr: "Description 4",
  //         priority: "Without",
  //       },
  //     ],
  //   },
  // ]);
  const columns = useSelector(allColumnsByBoard);

  // 3. Стан для контролю відкриття/закриття модальних вікон
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [openModalEditIndex, setOpenModalEditIndex] = useState(null);
  const [openModalAddIndex, setOpenModalAddColumn] = useState(null);

  // 4. Функції для керування модальними вікнами
  const openModalEdit = (index) => setOpenModalEditIndex(index);
  const closeModalEdit = () => setOpenModalEditIndex(null);
  const openModalAddColumn = () => setOpenModalAddColumn(true);
  const closeModalAddColumn = () => setOpenModalAddColumn(null);
  const openModal = (index) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);
  // const board = useSelector(selectBoards);
  // const boardIds = board._id;

  // 5. Логіка Drag and Drop для переміщення карток між колонками
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (sourceColumn === destColumn) {
      // Переміщення картки всередині тієї ж колонки
      const updatedCards = Array.from(sourceColumn.cards);
      const [movedCard] = updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, movedCard);
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === sourceColumn.id ? { ...col, cards: updatedCards } : col
        )
      );
    } else {
      // Переміщення картки в іншу колонку
      const sourceCards = Array.from(sourceColumn.cards);
      const destCards = Array.from(destColumn.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, movedCard);

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === sourceColumn.id) return { ...col, cards: sourceCards };
          if (col.id === destColumn.id) return { ...col, cards: destCards };
          return col;
        })
      );
    }
  };

  // 6. Відображення компонентів
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.boardContainer}>
        <span className={s.scrollBottomContainer}>
          {columns && columns.length > 0 ? (
            columns.map((column, index) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={s.columnWrapper}
                  >
                    {/* Заголовок колонки с иконками редактирования и удаления */}
                    <div className={s.columnNameBox}>
                      <h2 className={s.columnName}>{column.title}</h2>
                      <div className={s.iconsBox}>
                        <SvgIcon id="icon-pencil" className={s.columnIcons} />
                        <SvgIcon id="icon-trash" className={s.columnIcons} />
                      </div>
                    </div>

                    {/* Список карточек в колонке */}
                    <div className={s.cardList}>
                      {column.cards && column.cards.length > 0 ? (
                        column.cards.map((card, cardIndex) => {
                          const cardPriority = labelOptions.find(
                            (option) => option.priority === card.priority
                          );
                          const cardBackgroundColor = cardPriority
                            ? cardPriority.color
                            : "#fff";

                          return (
                            <Draggable
                              key={cardIndex}
                              draggableId={`${card.columnId}-${cardIndex}`}
                              index={cardIndex}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={s.card}
                                >
                                  <div
                                    className={s.cardStatusSpanWrapper}
                                    style={{
                                      backgroundColor: cardBackgroundColor,
                                    }}
                                  ></div>
                                  <h3 className={s.cardTitle}>{card.title}</h3>
                                  <EllipsisText
                                    className={s.cardDescr}
                                    text={card.description}
                                    length={110}
                                  />
                                  <div className={s.cardDivider}></div>
                                  <div className={s.cardEditsInfo}>
                                    {/* Отображение информации о приоритете и крайнем сроке */}
                                    <div className={s.cardInfo}>
                                      <div className={s.priority}>
                                        <p className={s.priorityTitle}>
                                          Priority
                                        </p>
                                        <div className={s.priorityValueWrapper}>
                                          <div
                                            className={s.priorityCircle}
                                            style={{
                                              backgroundColor:
                                                cardBackgroundColor,
                                            }}
                                          ></div>
                                          <p className={s.priorityValue}>
                                            {card.priority}
                                          </p>
                                        </div>
                                      </div>
                                      <div className={s.cardDeadline}>
                                        <p className={s.deadline}>Deadline</p>
                                        <p className={s.deadlineDate}>
                                          31/10/2024
                                        </p>
                                      </div>
                                    </div>

                                    {/* Иконки для редактирования, перемещения и удаления карточек */}
                                    <div className={s.cardIcons}>
                                      <SvgIcon
                                        id="icon-arrow-circle-broken-right"
                                        className={s.columnIcons}
                                      />
                                      <button
                                        onClick={() => openModalEdit(index)}
                                      >
                                        <SvgIcon
                                          id="icon-pencil"
                                          className={s.columnIcons}
                                        />
                                      </button>
                                      <SvgIcon
                                        id="icon-trash"
                                        className={s.columnIcons}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <p>Нет карточек в этой колонке</p> // Если нет карточек, показываем сообщение
                      )}
                      {provided.placeholder}
                    </div>

                    {/* Кнопка для добавления карточки */}
                    <button
                      className={s.addCardBtn}
                      onClick={() => openModal(index)}
                    >
                      <span className={s.btnWrapper}>
                        <span className={s.btnIconWrapper}>
                          <SvgIcon id="icon-plus" className={s.columnIcons} />
                        </span>
                        <span>Add another card</span>
                      </span>
                    </button>

                    {/* Модальные окна для добавления и редактирования карточек */}
                    {openModalIndex === index && (
                      <AddCardForm
                        closeModal={closeModal}
                        columnId={column._id}
                      />
                    )}
                    {openModalEditIndex === index && (
                      <EditCardForm closeModal={closeModalEdit} />
                    )}
                  </div>
                )}
              </Droppable>
            ))
          ) : (
            <p>Колонки не загружены или пусты</p> // Если нет колонок, показываем сообщение
          )}

          {/* Кнопка для додавання нової колонки */}
          <button className={s.addColumnBtn} onClick={openModalAddColumn}>
            <span className={s.btnColumnWrapper}>
              <span className={s.btnIconWrapper}>
                <SvgIcon id="icon-plus" className={s.columnIcons} />
              </span>
              <span>Add another column</span>
            </span>
          </button>
          {openModalAddIndex && (
            <AddColumnForm closeModal={closeModalAddColumn} boardId={boardId} />
          )}
        </span>
      </div>
    </DragDropContext>
  );
};

export default MainDashBoard;
