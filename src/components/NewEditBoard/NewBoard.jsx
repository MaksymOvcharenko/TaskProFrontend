import { Icon } from '../SvgIcon/SvgIcon';
import styles from './NewBoard.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addBoard } from 'redux/boards/boardsOperations';
import { useShownBoard } from 'hooks/useShownBoard';


import noBack from '../../images/images-bg/images-bg-default.png';
import cappodocia from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vlk8bztf90uy6itveqjl.png';
import baloon from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/v0wt4bwax3bhdlag1ziv.png';
import clouds from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/c08fbwcqicwfqwksxsyx.png';
import fullMoon from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sey0nharzdv7uzxpt98w.png';
import halfMoon from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220069/backgrounds/mini/lfrtnx9rqh3koliovr7h.png';
import magnolia from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/oyfwjk41qpxsud8g8ri9.png';
import mountains from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjuxoyg5cjxzpk30oeoe.png';
import nightTrailer from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjyionahp9lthpybw5sg.png';
import palmLeaves from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sce6oy35czbj7yb9osoe.png';
import rockyBeach from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/whne8ssdvejvamukn7sc.png';
import sakura from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/womdt7hq0ngnofzbuhgu.png';
import sea from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/tqbovopj2qyuln6ing9o.png';
import starrySky from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/csxhywowypy9arxzig17.png';
import violetCircle from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vaxhftlahpyrpje3itvb.png';
import yacht from 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/pgjqswykxm1qukwfyic0.png';


const NewBoard = ({ openModal }) => {
    const [icons, setIcons] = useState('icon-Project');
    const [background, setBackground] = useState('no-background');
    const [title, setTitle] = useState(null);
  
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
    const getTitle = event => {
      setTitle(event.target.value);
    };
  
    const closeModal = event => {
      openModal();
    };
  
    const getIcon = event => {
      setIcons(event.currentTarget.dataset.source);
      console.log(icons);
    };
  
    const getBack = event => {
      console.log(event.currentTarget.dataset.source);
      setBackground(event.currentTarget.dataset.source);
    };
  
    const newBoardObject = {
      title: title,
      icon: icons,
      background: background,
    };
  
    const newBoardFunc = () => {
      dispatch(addBoard(newBoardObject));
      closeModal();
      navigate(`${title}`);
    };
  
    return (
      <div className={styles.divCard}>
        <h2 className={styles.textNew}>New board</h2>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Title"
          onChange={getTitle}
        />
        <h3 className={styles.textIcons}>Icons</h3>
        <ul className={styles.listDarkIcons}>
          <li>
            {/* <button
              data-source="project"
              className={styles.buttonIcons}
              onClick={getIcon}
            > */}
            <input
              type="radio"
              data-source="icon-Project"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-Project'}
              className={icons === 'icon-Project' ? styles.darkIcons : styles.serIcons}
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-star"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-star'}
              className={icons === 'icon-star' ? styles.darkIcons : styles.serIcons}
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-loading"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-loading'}
              className={icons === 'icon-loading' ? styles.darkIcons : styles.serIcons}
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-puzzle"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-puzzle'}
              className={
                icons === 'icon-puzzle' ? styles.darkIcons : styles.serIcons
              }
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-cube"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-cube'}
              className={
                icons === 'icon-cube' ? styles.darkIcons : styles.serIcons
              }
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-lightning"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-lightning'}
              className={
                icons === 'icon-lightning' ? styles.darkIcons : styles.serIcons
              }
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-colors"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-colors'}
              className={icons === 'icon-colors' ? styles.darkIcons : styles.serIcons}
            ></Icon>
          </li>
          <li>
            <input
              type="radio"
              data-source="icon-hexagon"
              name="buttons"
              className={styles.inputRad}
              onClick={getIcon}
            />
            <Icon
              id={'icon-hexagon'}
              className={icons === 'icon-hexagon' ? styles.darkIcons : styles.serIcons}
            ></Icon>
          </li>
        </ul>
        <h3 className={styles.textBackground}>Background</h3>
        <ul className={styles.listColorIcons}>
          <li
            className={
              background === 'no-background'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              data-source="no-background"
              className={styles.inputBack}
              onClick={getBack}
            />
            <img src={noBack} alt="noback" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'magnolia' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="magnolia"
              onClick={getBack}
            />
            <img src={magnolia} alt="magnolia" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'starry-sky'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="starry-sky"
              onClick={getBack}
            />
            <img src={starrySky} alt="starrySky" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'sakura' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="sakura"
              onClick={getBack}
            />
            <img src={sakura} alt="sakura" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'half-moon' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="half-moon"
              onClick={getBack}
            />
            <img src={halfMoon} alt="half-moon" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'palm-leaves'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="palm-leaves"
              onClick={getBack}
            />
            <img src={palmLeaves} alt="palm-leaves" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'clouds' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="clouds"
              onClick={getBack}
            />
            <img src={clouds} alt="clouds" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'rocky-beach'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="rocky-beach"
              onClick={getBack}
            />
            <img src={rockyBeach} alt="rocky-beach" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'violet-circle'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="violet-circle"
              onClick={getBack}
            />
            <img
              src={violetCircle}
              alt="violet-circle"
              className={styles.img_back}
            />
          </li>
          <li
            className={
              background === 'full-moon' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="full-moon"
              onClick={getBack}
            />
            <img src={fullMoon} alt="full-moon" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'yacht' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="yacht"
              onClick={getBack}
            />
            <img src={yacht} alt="yacht" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'baloon' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="baloon"
              onClick={getBack}
            />
            <img src={baloon} alt="baloon" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'mountains' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="mountains"
              onClick={getBack}
            />
            <img src={mountains} alt="mountains" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'sea' ? styles.listItemActive : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="sea"
              onClick={getBack}
            />
            <img src={sea} alt="sea" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'cappodocia'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="cappodocia"
              onClick={getBack}
            />
            <img src={cappodocia} alt="cappodocia" className={styles.img_back} />
          </li>
          <li
            className={
              background === 'night-trailer'
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <input
              type="radio"
              name="backs"
              className={styles.inputBack}
              data-source="night-trailer"
              onClick={getBack}
            />
            <img
              src={nightTrailer}
              alt="night-trailer"
              className={styles.img_back}
            />
          </li>
        </ul>
        <button className={styles.mainButton} onClick={newBoardFunc}>
          <div className={styles.plusBtnZaglushka}>
            <Icon id={'plus'} className={styles.plusIcon}></Icon>
          </div>
          Create
        </button>
      </div>
    );
  };
  
  export default NewBoard;