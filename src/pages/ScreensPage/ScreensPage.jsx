import { useParams } from "react-router-dom";
import s from "./ScreensPage.module.css";
import MainDashBoard from "../../components/MainDashBoard/MainDashBoard.jsx";
import SvgIcon from "../../components/SvgIcon/SvgIcon.jsx";
import { loadingColumns } from "../../redux/сolumns/selectors.js";
import { useSelector } from "react-redux";
import { BallTriangle } from "react-loader-spinner";

const ScreensPage = () => {
  const { boardId } = useParams();
  const loadCollumn = useSelector(loadingColumns);
  console.log(loadCollumn + "load");

  return (
    <div className={s.cont}>
      <div className={s.boardTitleBox}>
        <h2 className={s.boardTitle}>Board name </h2>
        <div className={s.filterBox}>
          <SvgIcon id="icon-filter" className={s.filterIcon} />
          <h3 className={s.filter}>Filters</h3>
        </div>
      </div>

      {/* <p>Нижче створюйте вже колонки {boardId}</p>
      <p>Десь тут ще хедер борда{boardId}</p> */}
      {!loadCollumn ? (
        <MainDashBoard boardId={boardId} />
      ) : (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      )}
      {/* <MainDashBoard boardId={boardId} /> */}
      {/* <div>Відмалюємо дошку з id : {boardId} з даних запиту</div> */}
    </div>
  );
};

export default ScreensPage;
