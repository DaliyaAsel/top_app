import React, { useEffect, useState } from "react";
import axios from "axios";

import { GetStaticProps } from "next";
import { Htag, Button, Paragraph, Tag, Raiting } from "../components";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";

function Home( { menu, firstCategory }: HomeProps ): JSX.Element {
  const [raiting, setRaiting] = useState<number>(4);

  return (
    <>
      <Htag tag="h1"> Главная страница</Htag>
      <Button appearance="primary" className="lala" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <Paragraph size="md">Средний размер параграфа</Paragraph>
      <Paragraph size="sm">Маленький размер параграфа</Paragraph>
      <Paragraph size="lg">Большой размер параграфа</Paragraph>
      <Tag size="s" color="primary">
        Small
      </Tag>
      <Tag size="m" color="red">
        {" "}
        Red
      </Tag>
      <Tag size="s" color="green">
        Green
      </Tag>
      <Raiting raiting={raiting} isEditable setRaiting={setRaiting} />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    },
  };
};


interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}