import { useState, useRef } from 'react';
import { Link as Scrolllink } from 'react-scroll';
import Image from 'next/image';
import styles from './styles.module.scss';
import { createImageUrl } from '../../utils';

const Landing = (props) => {
  const [section, setSection] = useState('1');
  const wrapper = useRef(null);
  const firstElement = useRef(null);
  const secondElement = useRef(null);
  const thirdElement = useRef(null);
  // let lasttop = 0;
  // const scroll = useRef(true);
  const scrollFunction = () => {
    // /* detect scroll up or down */
    // let scrollEvent = '';
    // const currTop = wrapper.current?.scrollTop;
    // if (currTop > lasttop)
    // { console.log('scroll up'); lasttop = currTop; scrollEvent = 'scrollUp'; }
    // if (currTop < lasttop)
    // { console.log('scroll down'); lasttop = currTop; scrollEvent = 'scrollDown'; }
    /* select side radio on moving to its location */
    const firstPos = firstElement.current
      ? firstElement.current.getBoundingClientRect()
      : '';
    const secondPos = secondElement.current
      ? secondElement.current.getBoundingClientRect()
      : '';
    const thirdPos = thirdElement.current
      ? thirdElement.current.getBoundingClientRect()
      : '';
    if (firstPos !== '' && firstPos.top < 300 && firstPos.top > 0) {
      setSection('1');
    }
    if (secondPos !== '' && secondPos.top < 300 && secondPos.top > 0) {
      setSection('2');
    }
    if (thirdPos !== '' && thirdPos.top < 300 && thirdPos.top > 0) {
      setSection('3');
    }
    /* move page for scroll event */
    // if (scrollEvent === 'scrollUp') {
    //   switch (section) {
    //     case '1':
    //       console.log(999);
    //       for (let i = 0; i < 600; i += 10) {
    //         setTimeout(() => { window.scroller.scrollTo(0, i); console.log('yp'); }, 100);
    //       }
    //       // setTimeou1t(()=> window.scroller.scrollTo({ top: 600, behaviour: 'smooth' }), 3000);
    //       setSection('2');
    //       break;
    //     case '2':
    //       if (secondPos.top < -50) {
    //         window.scroller.scrollTo(0, 1600);
    //         setSection('3');
    //       }
    //       // window.scroller.scrollTo(0, 1200);
    //       break;
    //     default:
    //       console.log('no change');
    //   }
    // } else if (scrollEvent === 'scrollDown') {
    //   switch (section) {
    //     case '2':
    //       if (secondPos.top > 600) {
    //         window.scroller.scrollTo(0, 0);
    //         setSection('1');
    //       }
    //       break;
    //     case '3':
    //       window.scroller.scrollTo(0, 600);
    //       setSection('2');
    //       break;
    //     default:
    //       console.log('no change');
    //   }
    // }
  };
  const { imageUrl, intro, name, skills, coursework } = props;
  const imgUrl = createImageUrl(imageUrl);
  return (
    <div
      id="scroller"
      className={styles.overLay}
      onScroll={(e) => scrollFunction(e)}
      ref={wrapper}
    >
      <div id="1" className={styles.landing} ref={firstElement}>
        <div className={styles.leftSide}>
          <div className={styles.topBar} />
          <h1>
            Hello, I m <br />
            {name}
          </h1>
          <p>{intro}</p>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightStatusBar}>
            <Scrolllink
              containerId="scroller"
              activeClass="active"
              to="1"
              smooth
              spy
              offset={-300}
              duration={600}
              className={styles.navLink}
            >
              <div
                className={`${styles.statusCircle} ${
                  section === '1' ? styles.selected : ''
                }`}
              />
            </Scrolllink>
            {!!skills.length && (
              <Scrolllink
                containerId="scroller"
                activeClass="active"
                to="2"
                smooth
                spy
                offset={-220}
                duration={600}
                className={styles.navLink}
              >
                <div
                  className={`${styles.statusCircle} ${
                    section === '2' ? styles.selected : ''
                  }`}
                />
              </Scrolllink>
            )}
            {!!coursework.length && (
              <Scrolllink
                containerId="scroller"
                activeClass="active"
                to="3"
                smooth
                spy
                offset={-220}
                duration={600}
                className={styles.navLink}
              >
                <div
                  className={`${styles.statusCircle} ${
                    section === '3' ? styles.selected : ''
                  }`}
                />
              </Scrolllink>
            )}
            {/* <div className={styles.statusCircle} /> */}
          </div>
          <div className={styles.image}>
            <Image quality="100" layout="fill" src={imgUrl} alt="userImage" />
            <Image
              className={styles.cover}
              src="/images/cover.svg"
              alt="cover"
              layout="fill"
            />
          </div>
        </div>
      </div>
      <div className={styles.mainContainer}>
        {!!skills.length && (
          <div className={styles.containerLeft} id="2" ref={secondElement}>
            <div className={styles.topBar} />
            <h2>Skills</h2>
            <ul>
              {skills.map((item) => (
                <li key={item.id}>{item.content}</li>
              ))}
            </ul>
          </div>
        )}
        {!!coursework.length && (
          <div id="3" className={styles.containerRight} ref={thirdElement}>
            <div className={styles.topBar} />
            <h2>Coursework</h2>
            <ul>
              {coursework.map((item) => (
                <li key={item.id}>{item.course_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
