import clsx from 'clsx';
import beforeImg from '../../assets/img/top-desktop.png';
import styles from './example.module.scss';
import { useEffect, useRef, useState } from 'react';
import afterImg from '../../assets/img/after-desktop.png';
import SliderContainer from '../slider/slider-container';
import Slider from '../slider/slider/slider';
import useResponsive from '../../hooks/use-responsive';
import { initComparisonSlider } from '../../utils/DOM';

function Example() {
  const { atMinMobile, atMaxMobile } = useResponsive();
  const [isToggleActive, setToggle] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!atMinMobile) {
      return;
    }

    const removeAll = initComparisonSlider(sliderContainerRef, sliderRef);

    return () => {
      removeAll?.();
    };
  }, [atMinMobile]);

  return (
    <section className={styles.example}>
      <div className={styles.container}>
        <h2 className={styles.title}>Живой пример</h2>
        <div className={styles.contentBody}>
          <p className={styles.text}>
            Борис сбросил 5 кг за 2 месяца, просто заменив свой обычный корм на
            Cat Energy Slim. Отличный результат без изнуряющих тренировок! При
            этом он не менял своих привычек и по-прежнему спит по 16 часов в
            день.
          </p>
          <dl className={styles.statements}>
            <div className={styles.group}>
              <dl>снижение веса</dl>
              <dd>5 кг</dd>
            </div>
            <div className={styles.group}>
              <dl>затрачено времени</dl>
              <dd>60 дней</dd>
            </div>
          </dl>
          <p className={styles.costs}>Затраты на питание: 15 000 руб.</p>
        </div>
        {atMinMobile && <SliderContainer ref={sliderContainerRef}/>}
        <div className={clsx(styles.ibg)}>
          {isToggleActive ? (
            <img src={afterImg} style={{ objectFit: 'contain' }} alt="cat"/>
          ) : (
            <img src={beforeImg} alt="cat"/>
          )}
        </div>
        <div
          className={clsx(
            styles.toggler,
            isToggleActive && styles.toggler_active
          )}
        >
          Было
          {atMaxMobile && <button onClick={() => setToggle(!isToggleActive)} title="toggler"/>}
          {atMinMobile && <Slider ref={sliderRef}/>}
          Стало
        </div>
      </div>
    </section>
  );
}

export default Example;
