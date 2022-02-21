import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstlevelMenuitem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstlevelMenu } from "../../helpers/helpers";



export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

// обработчик, для открытия меню второго уровня
  const openSecondLevel = (secondCategory: string) => { // передаем id/название второй категории
   //  обновляем меню через ф-ю setMenu, которая из контекста взята. Вот такая запись  setMenu && setMenu, так как setMenu может и не быть, он не обязательный параметр в контексте
   setMenu && setMenu (menu.map(m => {
    if(m._id.secondCategory === secondCategory ) {
      m.isOpened = !m.isOpened;
    }
    return m;
   }));
  };

  // ф-ия для первого уровня меню
  const buildFirstLevel = () => {
    return (
      <>
        {firstlevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id == firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {/* открываем второй уровень меню если первый уровень открыт */}
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  // ф-ия для вторго уровня меню
  const buildSecondLevel = (menuItem: FirstlevelMenuitem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)} >{m._id.secondCategory}</div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpen]: m.isOpened,
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ф-ия для третьего уровня меню
  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
       pages.map( p => (
        <Link href={`/${route}/${p.alias}`}>
        <a
          className={cn(styles.thirdLevel, {
            // для подсветки активности
            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
          })}
        >
          {p.category}
        </a>
        </Link>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      {/* вызов ф-ии, для построения меню первого уровня */}
      {buildFirstLevel()}
    </div>
  );
};
