import CoursesIcon from "./icons/courses.svg";
import ServisesIcon from "./icons/serveces.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "../interfaces/page.interface";
import { FirstlevelMenuitem } from "../interfaces/menu.interface";

export const firstlevelMenu: FirstlevelMenuitem[] = [
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