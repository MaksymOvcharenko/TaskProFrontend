import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./AddColumnForm.module.css";
import { addColumn } from "../../redux/сolumns/operations";

const AddColumnForm = ({ closeModal, boardId }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  const initialValues = {
    title: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const { title } = values;

    dispatch(addColumn({ id: boardId, title: title }));

    resetForm();
    closeModal();
  };

  return (
    <div>
      <div
        className={s.modalOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className={s.modalContent}>
          <div className={s.modalTitleContainer}>
            <h2 className={s.modalTitle}>Add column</h2>
            <button className={s.closeModalBtn} onClick={closeModal}>
              <SvgIcon id="icon-x-close" className={s.closeBtnIcon} />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.addColumnForm}>
              <Field
                name="title"
                type="text"
                placeholder="Title"
                className={s.titleInput}
              />
              <ErrorMessage name="title" component="p" className={s.error} />
              <button type="submit" className={s.addBtn}>
                <span className={s.addIconWrap}>
                  <SvgIcon id="icon-plus" className={s.addBtnIcon} />
                </span>
                Add
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddColumnForm;
