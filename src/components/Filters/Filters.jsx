import { Formik, Form } from "formik";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { filterCardsByPriority } from "../../redux/сolumns/operations.js";

const labelOptions = [
  { color: "#656565", priority: "Without priority" },
  { color: "#8fa1d0", priority: "Low" },
  { color: "#e09cb5", priority: "Medium" },
  { color: "#bedbb0", priority: "High" },
];

const Filter = ({ closeModal }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        labelColor: "",
        priority: "",
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.container}>
          <div className={s.content}>
            <div className={s.titleContainer}>
              <h1 className={s.filtersTitle}>Filters</h1>
              <button onClick={closeModal}>
                <SvgIcon id="icon-close" className={s.closeIcon} />
              </button>
            </div>
            <div className={s.subtitleWrapper}>
              <h2 className={s.subtitle}>Label color</h2>
              <button
                type="button"
                className={s.showAllBtn}
                onClick={() => {
                  dispatch(filterCardsByPriority({ priority: "all" }));
                }}
              >
                Show all
              </button>
            </div>
            <ul className={s.labelColors}>
              {labelOptions.map(({ color, priority }) => (
                <li key={color} className={s.colorRow}>
                  <button
                    type="button"
                    className={`${s.colorButton} ${
                      values.labelColor === color ? s.selectedColor : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setFieldValue("labelColor", color);
                      setFieldValue("priority", priority);
                      dispatch(filterCardsByPriority({ priority }));
                    }}
                  >
                    <span className={s.priorityLabel}>{priority}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
