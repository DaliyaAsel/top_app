import React from "react";
import { ParagraphProps } from "./Paragraph.props";

import cn from 'classnames';
import styles from './Paragraph.module.css';


export const Paragraph = ({size = 'md', children, className, ...props }: ParagraphProps) : JSX.Element => {

    return(
        <>
          <p className={cn(styles.p, className, {
              [styles.sm] : size == 'sm',
              [styles.md] : size == 'md',
              [styles.lg] : size == 'lg',
          })}
          {...props}
          >
              {children}
          </p>
        </>
    )
}

