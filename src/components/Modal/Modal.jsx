import SvgClose from "../../images/SvgClose";
import { Form } from "../Form/Form";
import s from "./Modal.module.css";

export const Modal = ({
  close,
  formTitle,
  buttonName,
  getBooksList,
  isbn,
  title,
  author,
  formType,
}) => {
  function handleClick(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }

  document.addEventListener("keydown", onWindowEscape);
  function onWindowEscape(e) {
    if (e.code === "Escape") {
      close();
      document.removeEventListener("keydown", onWindowEscape);
    }
  }

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.modal}>
        <button className={s.closeButton} onClick={close} aria-label="close">
          <SvgClose />
        </button>
        <Form
          formTitle={formTitle}
          buttonName={buttonName}
          close={close}
          getBooksList={getBooksList}
          isbn={isbn}
          title={title}
          author={author}
          formType={formType}
        />
      </div>
    </div>
  );
};
