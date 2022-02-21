import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstlevelMenuitem, PageItem } from "../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import ServisesIcon from "./icons/serveces.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "../../interfaces/page.interface";

const firstlevelMenu: FirstlevelMenuitem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "serveces",
    name: "Сервисы",
    icon: <ServisesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "products",
    name: "Товары",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  // ф-ия для первого уровня меню
  const buildFirstLevel = () => {
    return (
      <>
        {firstlevelMenu.map((m) => (
                <div key={m.route}>
                    <a href={`/${m.route}`}>
                        <div className={cn(styles.firstLevel, {
                            [styles.firstLevelActive]: m.id == firstCategory
                        })}>
                            {m.icon}
                            <span>{m.name}</span>
                        </div>
                    </a>
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
            {
                menu.map(m => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpen]: m.isOpened
                        })}>
                            {
                              buildThirdLevel( m.pages, menuItem.route)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
  };

  // ф-ия для третьего уровня меню
  const buildThirdLevel = (pages: PageItem[], route: string) => {
      return (
        pages.map( p => (
            <a href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: false
            })}>
                {p.category}
            </a>
        ))
      )
  };

  return (
    <div className={styles.menu}>
      {/* вызов ф-ии, для построения меню первого уровня */}
      {buildFirstLevel()}
    </div>
  );
};
