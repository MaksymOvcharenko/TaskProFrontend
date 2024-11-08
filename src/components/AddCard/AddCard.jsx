import s from "./AddCard.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import { addCard } from "../../redux/cards/operations.js";

const AddCardForm = ({ closeModal, columnId }) => {
  const initialValues = {
    title: "",
    description: "",
    labelColor: "",
    deadline: null,
  };

  const startDate = Date.now();
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    labelColor: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { title, description, deadline, priority } = values;
    const data = { title, description, deadline, priority };
    dispatch(addCard({ columnId, data })); // Передаем columnId и data в виде объекта
    closeModal();
  };

  const labelOptions = [
    { color: "#8fa1d0", priority: "Low" },
    { color: "#e09cb5", priority: "Medium" },
    { color: "#bedbb0", priority: "High" },
    { color: "#656565", priority: "Without priority" },
  ];

  return (
    <div
      className={s.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className={s.modal}>
        <div className={s.modalcontent}>
          <h2 className={s.title}>Add Card</h2>
          <button className={s.closebtn} onClick={closeModal}>
            <SvgIcon id="icon-close" className={s.iconclose} />
          </button>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} // columnId доступен через замыкание
          >
            {({ setFieldValue, values }) => (
              <Form className={s.form}>
                <div className={s.input}>
                  <Field name="title" placeholder="Title" className={s.field} />
                </div>

                <div className={s.input}>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className={s.fielddescr}
                  />
                </div>

                <div className={s.input}>
                  <div className={s.input}>
                    <label>Label color</label>
                    <div className={s.labelColors}>
                      {labelOptions.map(({ color, priority }) => (
                        <button
                          key={color}
                          type="button"
                          className={`${s.colorButton} ${
                            values.labelColor === color ? s.selectedColor : ""
                          }`}
                          style={{ color: color, backgroundColor: color }}
                          onClick={() => {
                            setFieldValue("labelColor", color);
                            setFieldValue("priority", priority);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={s.input}>
                  <label htmlFor="deadline">Deadline</label>
                  <DatePicker
                    selected={values.deadline}
                    onChange={(date) => setFieldValue("deadline", date)}
                    placeholderText="Select Date"
                    dateFormat="EEEE, MMMM dd"
                    minDate={startDate}
                    showPopperArrow={false}
                    onFocus={(e) => e.target.blur()}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>

                <button type="submit" className={s.btn}>
                  <div className={s.btnplus}>
                    <SvgIcon id="icon-plus" className={s.btnicon} />
                  </div>{" "}
                  <p className={s.btntext}>Add</p>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;
